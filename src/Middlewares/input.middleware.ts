import { NextFunction, Request, Response } from "express";
import { MiddlewareObject } from "../types/MiddlerwareObject";

const InputOutputMiddleware: MiddlewareObject = {
  after: (req: Request, res: Response, next: NextFunction) => {
    console.log("AFTER:", res.locals.output);

    next();
  },
  before: (req: Request, res: Response, next: NextFunction) => {
    console.log("BEFORE", req.body);

    next();
  },
};

export default InputOutputMiddleware;
