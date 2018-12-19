import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Transport } from "@services/transport";
import { get } from "lodash";

@autobind
export class AboutMeStore {
    private readonly transport = new Transport();

    @observable private _text = "";

    get text(): string {
        return this._text;
    }

    getInfo(): void {
        this.transport.getAboutMe().then((response) => {
            const success = get(response.data, "success");
            if (success) {
                const data = get(response.data, "data");
                const text = get(data, "text");
                this._text = text;
            }
        });
    }
}
