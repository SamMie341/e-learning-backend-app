import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
// import { TransformInterceptor } from './core/interceptors/transform.interceptor';
// import { GlobalExceptionFilter } from './core/exceptions/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.enableCors();
  app.use((req, res, next) => {
    console.log(`🚨 [INCOMING REQUEST] ดักจับคำสั่ง: ${req.method} ${req.originalUrl}`);
    next();
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // app.useGlobalInterceptors(new TransformInterceptor());

  // app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PORT || 4000;

  await app.listen(port, '0.0.0.0');
  logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
  logger.log(`🌍 Server is accepting connections on all interfaces (0.0.0.0) at port: ${port}`);
  console.log(`[Ready] 🚀 Server is listening tightly on 0.0.0.0:${port}`);
}
bootstrap();
