import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateLessonUseCase } from "../application/use-cases/create-lesson.use-case";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { RolesGuard } from "src/core/guards/roles.guard";
import { Roles } from "src/core/guards/roles.decorator";
import { Role } from "src/core/constants/role.constant";
import { CreateLessonDto } from "../application/dtos/create-lesson.dto";
import { UpdateLessonUseCase } from "../application/use-cases/update-lesson.use-case";
import { DeleteLessonUseCase } from "../application/use-cases/delete-lesson.use-case";
import { UpdateCourseDto } from "src/modules/course/application/dtos/update-course.dto";
import { CurrentUser } from "src/core/decorators/current-user.decorator";
import { GetLessonsByCourseUseCase } from "../application/use-cases/get-lesson-by-course.use-case";
import { GetLessonByIdUseCase } from "../application/use-cases/get-lesson-by-id.use-case";
import { EnrollGuard } from "src/core/guards/enrolled.guard";

@Controller('lessons')
export class LessonController {
    constructor(
        private readonly createLessonUseCase: CreateLessonUseCase,
        private readonly updateLessonUseCase: UpdateLessonUseCase,
        private readonly deleteLessonUseCase: DeleteLessonUseCase,
        private readonly getLessonsByCourseUseCase: GetLessonsByCourseUseCase,
        private readonly getLessonByIdUseCase: GetLessonByIdUseCase,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.INSTRUCTOR, Role.ADMIN)
    async createLesson(@Body() createLessonDto: CreateLessonDto) {
        return await this.createLessonUseCase.execute(createLessonDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.INSTRUCTOR, Role.ADMIN)
    async updateLesson(
        @Param('id') id: string,
        @Body() updateLessonDto: UpdateCourseDto,
        @CurrentUser() user: any,
    ) {
        return await this.updateLessonUseCase.execute(id, updateLessonDto, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.INSTRUCTOR, Role.ADMIN)
    async deleteLesson(
        @Param('id') id: string,
        @CurrentUser() user: any,
    ) {
        return await this.deleteLessonUseCase.execute(id, user);
    }

    @Get('course/:courseId')
    async getLessonsByCourse(@Param('courseId') courseId: string) {
        return await this.getLessonsByCourseUseCase.execute(courseId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, EnrollGuard)
    async getLessonById(@Param('id') id: string) {
        return await this.getLessonByIdUseCase.execute(id);
    }
}