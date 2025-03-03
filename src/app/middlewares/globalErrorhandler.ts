// globalErrorHandler.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../globalInterface/error';
import { AppError, UnauthorizedError } from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    //setting default values for error response
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessage = 'Something went wrong!';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        errorMessage = `${simplifiedError?.errorMessage} is not a valid ID!`;
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        errorMessage = simplifiedError.errorSources[0].message;
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        return res.status(statusCode).json({
            success: false,
            statusCode: err?.statusCode,
            message: err.message,
            data: null
        });
    } else if (err instanceof UnauthorizedError) {
        return res.status(statusCode).json({
            success: false,
            message: err.message,
            errorMessage: "You do not have the necessary permissions to access this resource.",
            errorDetails: null,
            stack: null
        });
    }

    if (err instanceof ZodError) {
        const errorMessages = errorSources?.map(
            (errorSource) => `${errorSource.path} is ${errorSource.message}`
        );
        errorMessage = errorMessages.join(". ");
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;