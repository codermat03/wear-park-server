// product.model.ts
import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true, unique: true },
    base: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    image: { type: String, required: true },
    isOnSale: { type: Boolean, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const ProductModel = model<IProduct>('Product', productSchema);
