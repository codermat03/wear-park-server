// product.interface.ts
import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IProduct {
    _id: Types.ObjectId;
    name: string;
    base: string;
    price: string;
    rating: number;
    image: string;
    isOnSale: boolean;
    category: string;
    description: string;
    createdBy?: Types.ObjectId | IUser;
    createdAt: Date;
    updatedAt: Date;
}
