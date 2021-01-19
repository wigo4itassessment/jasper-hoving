import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class ResponseError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super();
    this.status = status;
    if (message) this.message = message;
    else {
      switch (status) {
        case StatusCodes.NOT_FOUND: {
          this.message = ReasonPhrases.NOT_FOUND;
          break;
        }
        case StatusCodes.BAD_REQUEST: {
          this.message = ReasonPhrases.BAD_REQUEST;
          break;
        }
        default: {
          // default to 500
          this.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
          break;
        }
      }
    }
  }
}

export function errorHandler(
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }
  if (err.status) {
    res.status(err.status);
    res.send({ message: err.message });
  } else {
    const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
    res.status(500);
    res.send({ message });
  }
}
