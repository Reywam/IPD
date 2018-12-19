import { ICommentItem } from "./ICommentItem";
import { Subject } from "rxjs/internal/Subject";

export interface ICommentItemProps {
    comment: ICommentItem;
    obUpdate$: Subject<void>;
}
