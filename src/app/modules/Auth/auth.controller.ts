// auth.controller.ts
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
    const user = req.body;
    const createdUser = await AuthService.registerUserToDb(user);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: {
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            role: createdUser.role,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        },
    });
})
const loginUser = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const { user, token } = await AuthService.loginUser(username, password);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User login successful',
        data: {
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        },
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    let userId: string;
    if (typeof req.user === 'string') {
        userId = req.user;
    } else {
        userId = req.user?._id;
    }
    const updatedUser = await AuthService.changeUserPassword(userId, currentPassword, newPassword);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully',
        data: {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        },
    });
});

export const AuthController = {
    registerUser,
    loginUser,
    changePassword
}