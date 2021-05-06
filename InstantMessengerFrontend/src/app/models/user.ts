import { BaseModel } from "./baseModel";

export interface User extends BaseModel {
    firstName: string;
    lastName: string;
    country?: string;
    city?: string;
    birthday?: Date;
    gender?: string;
    mobile?: string;
    email?: string,
    presentation?: string;
    avatar?: File;

}
