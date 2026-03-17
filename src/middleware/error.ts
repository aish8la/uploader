import type { ErrorRequestHandler } from "express";

export class UnauthenticatedError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "Authentication is required.");
    this.statusCode = 401;
    this.isOperational = true;
    this.name = "Unauthenticated";
  }
}

export class ForbiddenError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "You do not have permission to access this resource.");
    this.statusCode = 403;
    this.isOperational = true;
    this.name = "Forbidden";
  }
}

export class BadRequestError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "Your request is malformed or invalid.");
    this.statusCode = 400;
    this.isOperational = true;
    this.name = "BadRequest";
  }
}

export class NotFoundError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(message?: string) {
    super(message || "The resource you are trying to access does not exist.");
    this.statusCode = 404;
    this.isOperational = true;
    this.name = "NotFound";
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err);
    return res.status(err.statusCode).render("error", { error: err });
  }

  if (err?.isOperational) {
    return res.status(err.statusCode).render("error", { error: err });
  }

  console.error(err);
  err.message = "Something went wrong";
  return res.status(err.statusCode).render("error", { error: err });
};
