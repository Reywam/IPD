import { Subject } from "rxjs/internal/Subject";

export interface IAvatarPanelProps {
    src: string;
    onUpdate$: Subject<void>;
}
