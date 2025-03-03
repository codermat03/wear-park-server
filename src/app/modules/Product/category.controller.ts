// category.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
    const createdCategory = await CategoryServices.createCategoryIntoDb(req.body, req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Category created successfully',
        data: createdCategory,
    });
})

const getAllCategories = catchAsync(async (req, res) => {
    const categories = await CategoryServices.getAllCategoriesFromDb();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories retrieved successfully',
        data: categories,
    });
})

export const CategoryConstroller = {
    createCategory,
    getAllCategories
}