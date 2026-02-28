import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from './core/config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './core/config/typeorm.config';
import { UserModule } from './modules/user/infrastructure/user.module';
import { CourseModule } from './modules/course/infrastructure/course.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './modules/upload/infrastructure/upload.module';
import { LessonModule } from './modules/lesson/infrastructure/lesson.module';
import { EnrollmentModule } from './modules/enrollment/infrastructure/enrollment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/static',
    }),

    //Module
    UserModule,
    CourseModule,
    UploadModule,
    LessonModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
