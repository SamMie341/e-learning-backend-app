import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LessonEntity } from "./database/lesson.entity";
import { CourseEntity } from "src/modules/course/infrastructure/database/entities/course.entity";
import { LessonController } from "../presentation/lesson.controller";
import { CreateLessonUseCase } from "../application/use-cases/create-lesson.use-case";
import { UpdateLessonUseCase } from "../application/use-cases/update-lesson.use-case";
import { DeleteLessonUseCase } from "../application/use-cases/delete-lesson.use-case";
import { GetLessonsByCourseUseCase } from "../application/use-cases/get-lesson-by-course.use-case";
import { GetLessonByIdUseCase } from "../application/use-cases/get-lesson-by-id.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([LessonEntity, CourseEntity])],
    controllers: [LessonController],
    providers: [
        CreateLessonUseCase,
        UpdateLessonUseCase,
        DeleteLessonUseCase,
        GetLessonsByCourseUseCase,
        GetLessonByIdUseCase,
    ],
})
export class LessonModule { }