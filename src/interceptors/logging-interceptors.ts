import {
  Injectable,
  Logger,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestService } from 'src/request.service';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name, {timestamp: true});

  constructor(private readonly requestService: RequestService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const userAgent = req.get('user-agent');
    const { ip, method, path: url } = req;
    this.logger.log(
      `${method} ${url} ${ip} ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
    );
    this.logger.log(`user id: ${this.requestService.getUserId}`);
    const now = Date.now();
    this.logger.log(`Request recieved at: ${now}`)
    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const { statusCode } = res;
        const contentLenght = res.get('content-length');
        this.logger.log(`This will log after processing request`);
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLenght}- ${userAgent} ${ip}`,
        );
        const current = Date.now()
        this.logger.log(`Request processed at: ${current}`)
        this.logger.log(`Request processed in ${current - now} ms`);
        this.logger.log(`Response ${res}`);
      }),
    );
  }
}
