import { NextFunction, Request, Response } from "express";
import { MiddlewareObject } from "../types/MiddlerwareObject";

const InputOutputMiddleware: MiddlewareObject = {
  after: (req: Request, res: Response, next: NextFunction) => {
    console.log("MIDDLEWARE | INPUTOUTPUT | AFTER", res.locals.output);

    next();
  },
  before: (req: Request, res: Response, next: NextFunction) => {
    console.log("MIDDLEWARE | INPUTOUTPUT | BEFORE", req.body);

    next();
  },
};

export default InputOutputMiddleware;
