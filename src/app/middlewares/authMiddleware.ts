import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../modules/user/user.interface';
import config from '../config';
import { UnauthorizedError } from '../errors/AppError';
import httpStatus from 'http-status';

const JWT_SECRET = config.jwt_access_secret as string;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Get the token from the request headers
    const token = req.header('Authorization');

    if (!token) {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET) as IUser;
        req.user = decoded;
        next();
    } catch (error) {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
};


// check if the user is an admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.user as IUser;


    if (user && user.role === 'admin') {
        next();
    } else {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
};
// check if the user is an user
export const isUser = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = req.user as IUser;


    if (user && user.role === 'user') {
        next();
    } else {
        throw new UnauthorizedError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
    }
};


