import { BaseModel } from "./baseModel"
import { Attachment } from "./attachment";

export interface Post extends BaseModel{
    content: string;
    posterId: number;
    attachment?: Attachment;
    likes?: number;
    date?: Date;
    comments?: Post[];
}
