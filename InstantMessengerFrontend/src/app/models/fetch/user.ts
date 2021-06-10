import { BaseModel } from "./baseModel";

export interface User extends BaseModel {
    firstName: string;
    lastName: string;
    country?: string;
    city?: string;
    birthday?: Date;
    gender?: string;
    phone?: string;
    mail?: string,
    presentation?: string;
    avatar?: string;
}
