import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const msg = exception.getResponse()["message"]
      ? exception.getResponse()["message"]
      : exception.message;

    this.logger.error(msg);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      success: false,
      errors: {
        message: msg,
        code: `${status}`,
      },
      data: {},
    });
  }
}

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    this.logger.error(exception.stack);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: {
        message: exception.message,
        code: `${HttpStatus.INTERNAL_SERVER_ERROR}`,
      },
      data: {},
    });
  }
}
