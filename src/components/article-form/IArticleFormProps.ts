import { Field } from "@components/field/Field";

export interface IArticleFormProps {
    title: string;
    placeholder: string;
    buttonText: string;
    notificationText: string;
    articleText: string;
    isNotificationShown: boolean;
    isFormValid: boolean;
    isClearField: boolean;
    value?:  string;

    onChangeInput(id: string, value: string): void;

    onChangeArticle(text: string): void;

    handler(): void;

    onHideNotification(): void;

    addField(field: Field): void;
}
