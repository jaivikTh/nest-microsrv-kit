import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpError } from '../utils/enums/errors.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let info: any =
      exception instanceof HttpException ? exception.getResponse() : {};

    // Log the error for debugging
    this.logger.error(
      `Exception caught: ${exception instanceof Error ? exception.message : 'Unknown error'}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    // Use consistent error response format
    response.status(status).json({
      error: true,
      statusCode: info.statusCode || status,
      errorType: info.errorType || HttpError.GENERIC_ERROR,
      message: info.message || (exception instanceof Error ? exception.message : HttpError.INTERNAL_SERVER_ERROR),
      data: info.data || null,
    });
  }
}

export class errorHandler {
  public sendError(error, msg?: string) {
    throw new HttpException({ message: msg, details: error }, HttpStatus.OK);
  }
}