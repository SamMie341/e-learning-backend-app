import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnrollmentEntity } from "./database/entities/enrollment.entity";
import { CourseEntity } from "src/modules/course/infrastructure/database/entities/course.entity";
import { EnrollmentController } from "../presentation/enrollment.controller";
import { EnrollCourseUseCase } from "../application/use-cases/enroll-course.use-case";
import { GetMyEnrollmentUseCase } from "../application/use-cases/get-my-enrollments.use-case";

@Module({
    imports: [TypeOrmModule.forFeature([EnrollmentEntity, CourseEntity])],
    controllers: [EnrollmentController],
    providers: [EnrollCourseUseCase, GetMyEnrollmentUseCase],
})
export class EnrollmentModule { }