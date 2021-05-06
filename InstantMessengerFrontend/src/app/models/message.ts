import { Attachment } from "./attachment";
import { BaseModel } from "./baseModel";

export interface Message extends BaseModel {
    content: string,
    senderId: number,
    attachment: Attachment;
    date: Date;
}