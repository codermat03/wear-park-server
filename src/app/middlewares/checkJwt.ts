// checkJwt.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, config.jwt_access_secret as string);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
};

export default checkJwt;
