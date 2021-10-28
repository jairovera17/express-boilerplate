class HttpException extends Error {
  public readonly status: number;
  public readonly message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }

  public toString(): string {
    return JSON.stringify(this.getMetadata());
  }

  public getMetadata(): object {
    return {
      message: this.message,
      status: this.status,
    };
  }
}

export default HttpException;
