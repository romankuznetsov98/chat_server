import { Document } from "mongoose";

export interface IUser extends Document {
    readonly email: string;
    readonly avatar?: string;
    readonly avatarId?: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly role: string[];
    readonly password: string;
}