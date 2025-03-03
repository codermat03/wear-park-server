// user.interface.ts
import { Types } from "mongoose";

export type TRole = 'user' | 'admin'
export interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    role: TRole;
    createdAt: Date;
    updatedAt: Date;
    passwordChangeHistory?: Array<{ password: string; timestamp: Date }>;
}