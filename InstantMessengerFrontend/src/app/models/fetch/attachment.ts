import { BaseModel } from "./baseModel";

export interface Attachment extends BaseModel{
    files?: File[];
}
