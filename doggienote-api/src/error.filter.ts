import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  UnauthorizedException,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorDoggienote } from './error-doggienote';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  logger = new Logger(ErrorFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status;
    let message;
    let error;

    switch (true) {
      case exception instanceof UnauthorizedException:
        status = 401;
        message = 'Unauthorized';
        error = 'UnauthorizedError';
        break;
      case exception instanceof ErrorDoggienote:
        status = exception.statusCode;
        message = exception.message;
        error = exception.error;
        break;
      case exception instanceof NotFoundException:
        status = 404;
        message = 'Not found';
        error = 'NotFoundError';
        break;
      case exception instanceof BadRequestException:
        status = 400;
        message = 'Bad Request';
        error = 'BadRequestError';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
        error = 'InternalError';
        const exc = exception as BadRequestException
        this.logger.error(exc.stack);
        break;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      error: error,
    });
  }
}
