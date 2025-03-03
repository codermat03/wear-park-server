// category.service.ts
import { Request } from "express";
import { ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../user/user.model";

const createCategoryIntoDb = async (category: ICategory, req: Request) => {
    const { name } = category
    const createdBy = (req.user as JwtPayload)?._id;
    const newDataRequest = {
        name,
        createdBy
    }
    const result = await CategoryModel.create(newDataRequest)
    return result;
}

const getCategoryByName = async (name: string) => {
    const result = await CategoryModel.findOne({ name }).exec();
    return result;
}
const getAllCategoriesFromDb = async () => {
    const categories = await CategoryModel.find();
    const categoriesWithUserDetails = await Promise.all(
        categories.map(async (category) => {
            const createdByUser = await UserModel.findById(category.createdBy);
            const categoryWithUserDetails = {
                _id: category._id,
                name: category.name,
                createdBy: {
                    _id: createdByUser?._id,
                    username: createdByUser?.username,
                    email: createdByUser?.email,
                    role: createdByUser?.role,
                },
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            };
            return categoryWithUserDetails;
        })
    );

    return { categories: categoriesWithUserDetails };
};
export const CategoryServices = {
    createCategoryIntoDb,
    getCategoryByName,
    getAllCategoriesFromDb
}