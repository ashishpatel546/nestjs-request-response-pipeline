import { Module, NestModule, MiddlewareConsumer, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGaurd } from './gaurds/auth-gaurd';
import { LoggingInterceptor } from './interceptors/logging-interceptors';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    { provide: APP_GUARD, useClass: AuthGaurd },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor, scope: Scope.REQUEST },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
