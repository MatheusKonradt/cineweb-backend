import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { I18N_ERROR_GENERIC } from './exceptions';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class GlobalFilter implements ExceptionFilter {

  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost): void {
    this.logger.error(exception, this);

    let httpException: HttpException;
    if (exception instanceof HttpException) {
      httpException = exception;
    } else {
      httpException = new HttpException(I18N_ERROR_GENERIC, (exception as any).status || 500);
    }

    host
      .switchToHttp()
      .getResponse()
      .status(httpException.getStatus())
      .send(httpException.getResponse());
  }
}
