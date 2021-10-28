import { Request } from "express";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import wrapController from "./wrap.controller";
import ErrorMiddleware from "../Middlewares/error.middleware";
import InputOutputMiddleware from "../Middlewares/input.middleware";
import axios, { AxiosError } from "axios";
import HttpException from "../classes/HttpException";

function echo(req: Request): Observable<object> {
  return of(1).pipe(
    map(() => Buffer.from(req.params.url, "base64").toString()),
    switchMap(async (url: string) => {
      console.log("TARGET URL:", url);
      const { data } = await axios.post(url, req.body);

      return data;
    }),
    catchError((error: Error | AxiosError) => {
      console.log(error.message);
      throw new HttpException(403, "Forward request error");
    })
  );
}

const Handler = [
  InputOutputMiddleware.before!,
  wrapController(echo),
  ErrorMiddleware.after!,
  InputOutputMiddleware.after!,
];

export default Handler;
