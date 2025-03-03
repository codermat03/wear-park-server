// user.moden.ts
import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    passwordChangeHistory: [{ password: String, timestamp: Date }],
},
    { timestamps: true }
);


export const UserModel = model<IUser>('User', userSchema);