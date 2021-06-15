import { BaseModel } from "./baseModel"
import { Board } from "./board";


export interface Post extends BaseModel{
    content: string;
    senderId?: number;
    board?: Board;
    date?: Date;
    files?: any;
    comments?: Post[];
}
