import { IServerError } from "./IServerError";

export class ServerErrorParser {
    private readonly error: IServerError;

    constructor(error: IServerError) {
        this.error = error;
    }

    getErrorMessage(): string {
        return this.error.message;
    }

    getErrorCode(): number {
        return this.error.code;
    }
}
