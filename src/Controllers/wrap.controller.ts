import { NextFunction, Request, Response } from "express";
import { Observable } from "rxjs";
import { reduce } from "rxjs/operators";

function wrapController<T>($handler: (req: Request) => Observable<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    $handler(req)
      .pipe(
        reduce((acc: T | T[], current: T) => {
          if (Array.isArray(acc)) return [...acc, current];

          return current;
        })
      )
      .subscribe({
        error: next,
        next: (output) => {
          res.status(200);
          res.send(output);
          res.locals.output = output;
          next();
        },
      });
  };
}

export default wrapController;
