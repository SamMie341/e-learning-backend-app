import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { EnrollCourseUseCase } from "../application/use-cases/enroll-course.use-case";
import { GetMyEnrollmentUseCase } from "../application/use-cases/get-my-enrollments.use-case";
import { EnrollCourseDto } from "../application/dtos/enroll-course.dto";
import { CurrentUser } from "src/core/decorators/current-user.decorator";

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
    constructor(
        private readonly enrollCourseUseCase: EnrollCourseUseCase,
        private readonly getMyEnrollmentUseCase: GetMyEnrollmentUseCase,
    ) { }

    @Post()
    async enrollCourse(
        @Body() enrollCourseDto: EnrollCourseDto,
        @CurrentUser() user: any,
    ) {
        return await this.enrollCourseUseCase.execute(enrollCourseDto, user.id);
    }

    @Get('my-courses')
    async getMyCourses(@CurrentUser() user: any) {
        return await this.getMyEnrollmentUseCase.execute(user.id);
    }
}