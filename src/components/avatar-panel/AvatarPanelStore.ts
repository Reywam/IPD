import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Transport } from "@services/transport";
import { head, last, get } from "lodash";
import { IAvatarPanelProps } from "./IAvatarPanelProps";
import { AppContext } from "@context";

@autobind
export class AvatarPanelStore {
    @observable private _src = "";
    @observable private _error = "";
    @observable private _isValid = false;
    @observable private _image: File;
    @observable private _isPopupShown = false;
    @observable private _buttonText = "Загрузить аватар";
    @observable private _isNotificationShown = false;
    @observable private _notificationText = "";

    private readonly transport = new Transport();
    private readonly props: IAvatarPanelProps;

    constructor(props: IAvatarPanelProps) {
        this.props = props;
    }

    get src(): string {
        return this._src;
    }

    set src(src: string) {
        this._src = src;
    }

    get error(): string {
        return this._error;
    }

    set error(src: string) {
        this._error = src;
    }

    get isValid(): boolean {
        return this._isValid;
    }

    set isValid(src: boolean) {
        this._isValid = src;
    }

    get isPopupShown(): boolean {
        return this._isPopupShown;
    }

    set isPopupShown(value: boolean) {
        this._isPopupShown = value;
    }

    get image(): File {
        return this._image;
    }

    set image(image: File) {
        this._image = image;
    }

    get buttonText(): string {
        return this._buttonText;
    }

    set buttonText(value: string) {
        this._buttonText = value;
    }

    get isNotificationShown(): boolean {
        return this._isNotificationShown;
    }

    set isNotificationShown(value: boolean) {
        this._isNotificationShown = value;
    }

    get notificationText(): string {
        return this._notificationText;
    }

    set notificationText(value: string) {
        this._notificationText = value;
    }

    switchPopup(): void {
        this.isPopupShown = !this.isPopupShown;
    }

    uploadAvatar(): void {
        if (this.isValid) {
            const formData = new FormData();
            formData.append("src", this.src);
            formData.append("token", AppContext.getUserStore().getToken());
            this.isValid = false;
            this._buttonText = "Идет загрузка...";
            this.transport.uplodaAvatar(formData).then((respnse) => {
                const success = get(respnse.data, "success");
                if (success) {
                    this.props.onUpdate$.next();
                    this._buttonText = "Загрузить аватар";
                    this.showNotification();
                    this._notificationText = "Аватар загружен!";
                }
            });
        }
    }

    deleteAvatar(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.deleteAvatar(token).then(() => {
            this.switchPopup();
            this._src = "";
            this.props.onUpdate$.next();
            this.showNotification();
            this._notificationText = "Аватар удален!";
        });
    }

    dataURLtoFile(dataurl: string, filename: string): File {
        const type = head(dataurl.split(","));
        const src = last(dataurl.split(","));

        const mime = last(type!.match(/:(.*?);/));
        const byteString = atob(src!);
        let n = byteString.length;
        const u8arr = new Uint8Array(n);
        while (n) {
            u8arr[n - 1] = byteString.charCodeAt(n - 1);
            n -= 1; // to make eslint happy
        }
        const blob = new Blob([u8arr], { type: mime });
        const file = new File([blob], filename, { type: mime });
        return file;
    }

    hideNotification(): void {
        this._isNotificationShown = !this._isNotificationShown;
    }

    showNotification(): void {
        this._isNotificationShown = true;
        window.setTimeout(() => {
            this._isNotificationShown = false;
        }, 5000);
    }

}
