import { Subject } from "rxjs/internal/Subject";

export interface IChangeEmailProps {
    currentEmail: string;
    onUpdate$: Subject<void>;
}
