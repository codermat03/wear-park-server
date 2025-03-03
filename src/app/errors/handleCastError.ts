// handleCastError.ts
import mongoose from 'mongoose';
import { TErrorCastSources, TGenericErrorResponse } from '../globalInterface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorCastSources = [
    {
      path: err.path,
      message: err.message,
      errorMessage: err.value
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
    errorMessage: errorSources[0].errorMessage
  };
};

export default handleCastError;
