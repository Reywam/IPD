import { Subject } from "rxjs/internal/Subject";

export interface IChangeLoginProps {
    currentLogin: string;
    onUpdate$: Subject<void>;
}
