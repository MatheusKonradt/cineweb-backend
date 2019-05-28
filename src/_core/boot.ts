import { INestApplication, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';
import { GlobalFilter } from './common/global.filter';

export async function boot(app: INestApplication): Promise<void> {
  const config = app.get(ConfigService);
  const logger = app.get(LoggerService);
  app.useLogger(logger);
  app.useGlobalFilters(app.get(GlobalFilter));
  app.useGlobalInterceptors(app.get(LoggerInterceptor));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  if (config.get<boolean>('app.cors')) {
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
  }
  if (config.get<boolean>('app.docs')) {
    const options = new DocumentBuilder()
      .setTitle(config.get<string>('app.name'))
      .setVersion(process.env.npm_package_version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }
  const listening = await app.listen(config.get<number>('app.port'), '0.0.0.0');
}
