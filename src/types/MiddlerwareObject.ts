import HttpException from "classes/HttpException";
import { NextFunction, Request, Response } from "express";

type Handler = (req: Request, res: Response, next: NextFunction) => void;

type ErrorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

interface MiddlewareObject {
  before?: Handler;
  after?: Handler | ErrorHandler;
}

export type { MiddlewareObject };
