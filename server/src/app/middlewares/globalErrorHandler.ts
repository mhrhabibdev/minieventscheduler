import { ErrorRequestHandler } from 'express';
import config from '../config';
import AppError from '../errors/AppError';
import mongoose from 'mongoose';
import { ZodError } from 'zod';


// Define error source type
type TErrorSource = {
  path: string | number;
  message: string;
}[];

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default error response structure
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSource = [{
    path: '',
    message: 'An unexpected error occurred'
  }];

  // Log the error for development
  if (config.NODE_ENV === 'development') {
    console.error('🔥 Error Stack:', err.stack);
    console.error('🔥 Full Error:', err);
  }

  // Handle different error types
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{
      path: '',
      message: err.message
    }];
  }
  else if (err instanceof ZodError) {
    // Handle Zod validation errors
    statusCode = 400;
    message = 'Validation error';
    errorSources = err.issues.map(error => ({
      path: error.path.join('.'),
      message: error.message
    }));
  }
  else if (err instanceof mongoose.Error.ValidationError) {
    // Handle Mongoose validation errors
    statusCode = 400;
    message = 'Validation error';
    errorSources = Object.values(err.errors).map(error => ({
      path: error.path,
      message: error.message
    }));
  }
  else if (err instanceof mongoose.Error.CastError) {
    // Handle Mongoose cast errors (invalid ID format)
    statusCode = 400;
    message = 'Invalid ID format';
    errorSources = [{
      path: err.path,
      message: `Invalid ${err.path}: ${err.value}`
    }];
  }
  else if (err instanceof Error) {
    // Handle generic errors
    message = err.message;
    errorSources = [{
      path: '',
      message: err.message
    }];
  }

  // Final error response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
    error: config.NODE_ENV === 'development' ? err : undefined
  });
};

export default globalErrorHandler;