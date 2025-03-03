// AuthService.service.ts 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import config from '../../config';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

const registerUserToDb = async (user: IUser) => {
    const { username, email, password, role } = user;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = {
        username,
        email,
        password: hashedPassword,
        role: role || 'user',
    };
    // eslint-disable-next-line no-console
    console.log(newUser);
    const result = await UserModel.create(newUser);
    return result;
};

const loginUser = async (username: string, password: string) => {
    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid username or password');
    }

    const token = generateAuthToken(user);

    return { user, token };
};

const generateAuthToken = (user: IUser) => {
    const token = jwt.sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email,
        },
        config.jwt_access_secret as string,
        {
            expiresIn: '1h',
        }
    );
    return token;
};


const addToPasswordChangeHistory = async (userId: string, newPassword: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Add the new password to the history
    user.passwordChangeHistory = [
        { password: newPassword, timestamp: new Date() },
        ...(user.passwordChangeHistory || []).slice(0, 2),
    ];

    await user.save();
};

const changeUserPassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
    );
    if (!isCurrentPasswordValid) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Current password is incorrect'
        );
    }

    // Check if the new password is unique and different from the last 2 passwords
    const isPasswordUnique =
        user.passwordChangeHistory &&
        user.passwordChangeHistory.every(
            (change) => change.password !== newPassword
        );

    if (currentPassword === newPassword) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${user?.passwordChangeHistory?.[0]?.timestamp}).`
        );
    }


    if (!isPasswordUnique) {
        const lastUsedTimestamp =
            user.passwordChangeHistory && user.passwordChangeHistory.length > 0
                ? user.passwordChangeHistory[0].timestamp
                : 'N/A';
        throw new AppError(httpStatus.BAD_REQUEST,
            `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${lastUsedTimestamp}).`
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await addToPasswordChangeHistory(userId, newPassword);

    const updatedUser = await user.save();
    return updatedUser;
};


export const AuthService = {
    registerUserToDb,
    loginUser,
    changeUserPassword
}