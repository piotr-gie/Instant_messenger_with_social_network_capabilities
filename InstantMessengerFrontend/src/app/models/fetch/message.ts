import { BaseModel } from "./baseModel";

export interface Message extends BaseModel {
    content: string,
    senderId: number,
    attachments: File [],
    date: Date;
}