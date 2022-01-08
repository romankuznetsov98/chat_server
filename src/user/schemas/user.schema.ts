import * as mongoose from "mongoose";
import { GenderEnum } from "../enums/gender.enum";
import { RolesEnum } from "../enums/role.enum";

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    avatar: { type: String, default: null },
    avatarId: { type: String, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(GenderEnum) },
    role: { type: [String], required: true, enum: Object.values(RolesEnum) },
    password: { type: String, required: true }
})

UserSchema.index({email: 1}, {unique: true})