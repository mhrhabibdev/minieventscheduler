import AppError from "./AppError";


export class BadRequestError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden access') {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(404, `${resource} not found`);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict occurred') {
    super(409, message);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(422, message);
  }
}