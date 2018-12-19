import { Subject } from "rxjs/internal/Subject";

export interface IAddCommentProps {
    onUpdate$: Subject<void>;
    articleId: string;
}
