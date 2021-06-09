import { BaseModel } from "./baseModel";

export interface Message extends BaseModel {
    content: string,
    senderId: number,
    attachments: any [],
    date: Date;
}