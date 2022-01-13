import { MiddlewareObject } from "../types/MiddlerwareObject";

export class MiddlewareHandler {
  public _handler: Array<any>;
  constructor(handler: any) {
    this._handler = [handler];
  }

  public use(middleware: MiddlewareObject): MiddlewareHandler {
    if (middleware.before)
      this._handler = [middleware.before, ...this._handler];
    if (middleware.after) this._handler = [...this._handler, middleware.after];

    return this;
  }
}
