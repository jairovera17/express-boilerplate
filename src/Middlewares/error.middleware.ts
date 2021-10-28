import HttpException from "classes/HttpException";
import { NextFunction, Request, Response } from "express";
import { MiddlewareObject } from "../types/MiddlerwareObject";

const ErrorMiddleware: MiddlewareObject = {
  after: (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (res.headersSent) next();

    console.error("ERROR:", error.toString());

    res.status(error.status);
    res.send(error.getMetadata());
  },
};

export default ErrorMiddleware;
