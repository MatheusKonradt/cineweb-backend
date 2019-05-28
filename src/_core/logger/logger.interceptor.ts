import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { LoggerService } from "./logger.service";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggerInterceptor implements NestInterceptor<any, any> {
  constructor(private readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const raw = req.raw || req;
    const info = `${raw.method} ${raw.path || raw.url}`;
    const start = Date.now();
    this.logger.log(info, this);
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`${info} [${Date.now() - start}ms]`, this)));
  }
}
