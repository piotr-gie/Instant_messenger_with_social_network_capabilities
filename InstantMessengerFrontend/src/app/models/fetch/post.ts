import { BaseModel } from "./baseModel"


export interface Post extends BaseModel{
    content: string;
    senderId?: number;
    date?: Date;
    comments?: Post[];
}
