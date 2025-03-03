// category.interface.ts
import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface ICategory {
    _id: Types.ObjectId;
    name: string;
    createdBy?: Types.ObjectId | IUser;
    createdAt: Date;
    updatedAt: Date;
}