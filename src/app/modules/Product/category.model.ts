// category.model.ts
import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const CategoryModel = model<ICategory>('Category', categorySchema)