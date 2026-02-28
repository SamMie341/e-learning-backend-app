import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "./database/entities/course.entity";
import { CourseController } from "../presentation/course.controller";
import { CreateCourseUseCase } from "../application/use-cases/create-course.use-case";
import { GetCourseUseCase } from "../application/use-cases/get-courses.use-case";
import { UpdateCourseUseCase } from "../application/use-cases/update-course.use-case";
import { DeleteCourseUseCase } from "../application/use-cases/delete-course.use-case";
import { GetCourseByIdUseCase } from "../application/use-cases/get-course-by-id.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity])],
    controllers: [CourseController],
    providers: [
        CreateCourseUseCase,
        GetCourseUseCase,
        UpdateCourseUseCase,
        DeleteCourseUseCase,
        GetCourseByIdUseCase,
    ]
})
export class CourseModule { }