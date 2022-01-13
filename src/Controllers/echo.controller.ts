import { Request } from "express";
import wrapController from "./wrap.controller";
import ErrorMiddleware from "../Middlewares/error.middleware";
import InputOutputMiddleware from "../Middlewares/input.middleware";
import { tag } from "rxjs-spy/operators";
import SetupMiddleware from "../Middlewares/setup.middleware";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MiddlewareHandler } from "../classes/MiddlewareHandler";

function echo(req: Request): Observable<object> {
  return of(1).pipe(
    switchMap(() => of(req.params)),
    tag("echo")
  );
}

const MiddyHandler = new MiddlewareHandler(wrapController(echo))
  .use(SetupMiddleware)
  .use(InputOutputMiddleware)
  .use(ErrorMiddleware);

const Handler = MiddyHandler._handler;

export default Handler;
