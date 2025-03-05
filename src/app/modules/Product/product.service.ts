// product.service.ts
import { Request } from "express";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import { JwtPayload } from "jsonwebtoken";

const createProductsIntoDb = async (product: IProduct, req: Request) => {
    const createdBy = (req.user as JwtPayload)?._id;
    const newDataRequest = {
        ...product,
        createdBy
    }
    const result = await ProductModel.create(newDataRequest)
    return result;
}

const getProductByName = async (name: string) => {
    const result = await ProductModel.findOne({ name }).exec();
    return result;
}

const deleteProductFromDb = async (productId: string) => {
    const result = await ProductModel.findByIdAndDelete(productId);
    return result;
};

const getAllProductsFromDb = async () => {
    const products = await ProductModel.find();

    return { products };
};
const updateProductInDb = async (productId: string, updatedData: Partial<IProduct>) => {
    const result = await ProductModel.findByIdAndUpdate(productId, updatedData, { new: true, runValidators: true });
    return result;
};

export const ProductServices = {
    createProductsIntoDb,
    getProductByName,
    deleteProductFromDb,
    getAllProductsFromDb,
    updateProductInDb
}