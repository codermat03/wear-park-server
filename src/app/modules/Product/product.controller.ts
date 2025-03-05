// product.controller.ts
import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { ProductServices } from "./product.service";

const createProducts = catchAsync(async (req, res) => {
    const createdProduct = await ProductServices.createProductsIntoDb(req.body, req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Products added successfully',
        data: createdProduct,
    });
})

const getAllProducts = catchAsync(async (req, res) => {
    const products = await ProductServices.getAllProductsFromDb();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Products retrieved successfully',
        data: products,
    });
})

const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await ProductServices.deleteProductFromDb(id);

    if (!deletedProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product deleted successfully',
        data: deletedProduct,
    });
});

const updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await ProductServices.updateProductInDb(id, updatedData);

    if (!updatedProduct) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
    });
});


export const ProductConstroller = {
    createProducts,
    getAllProducts,
    deleteProduct,
    updateProduct
}