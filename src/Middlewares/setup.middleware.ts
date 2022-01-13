import { NextFunction, Request, Response } from "express";
import { MiddlewareObject } from "../types/MiddlerwareObject";
import {
  create,
  GraphPlugin,
  SnapshotPlugin,
  StackTracePlugin,
  StatsPlugin,
} from "rxjs-spy";
import { Spy } from "rxjs-spy/cjs/spy-interface";

let gSpy: Spy;

function lazySpyLoader(): void {
  // tslint:disable-next-line:strict-type-predicates
  if (gSpy !== undefined) return;

  gSpy = create({
    defaultPlugins: true,
  });
  gSpy.plug(
    new GraphPlugin(),
    new SnapshotPlugin(gSpy),
    new StackTracePlugin({ sourceMaps: true }),
    new StatsPlugin(gSpy)
  );
  gSpy.log();
}

const SetupMiddleware: MiddlewareObject = {
  after: (req: Request, res: Response, next: NextFunction) => {
    console.log("MIDDLEWARE | SETUP | AFTER");
    next();
  },
  before: (req: Request, res: Response, next: NextFunction) => {
    console.log("MIDDLEWARE | SETUP | BEFORE");
    lazySpyLoader();
    next();
  },
};

export default SetupMiddleware;
