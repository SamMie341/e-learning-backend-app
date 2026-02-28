import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateCourseUseCase } from "../application/use-cases/create-course.use-case";
import { GetCourseUseCase } from "../application/use-cases/get-courses.use-case";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { RolesGuard } from "src/core/guards/roles.guard";
import { Roles } from "src/core/guards/roles.decorator";
import { Role } from "src/core/constants/role.constant";
import { CreateCourseDto } from "../application/dtos/create-course.dto";
import { CurrentUser } from "src/core/decorators/current-user.decorator";
import { UpdateCourseUseCase } from "../application/use-cases/update-course.use-case";
import { DeleteCourseUseCase } from "../application/use-cases/delete-course.use-case";
import { UpdateCourseDto } from "../application/dtos/update-course.dto";
import { GetCourseByIdUseCase } from "../application/use-cases/get-course-by-id.use-case";

@Controller('courses')
export class CourseController {
    constructor(
        private readonly createCourseUseCase: CreateCourseUseCase,
        private readonly getCourseUseCase: GetCourseUseCase,
        private readonly updateCourseUseCase: UpdateCourseUseCase,
        private readonly deleteCourseUseCase: DeleteCourseUseCase,
        private readonly getCourseByIdUseCase: GetCourseByIdUseCase,
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.INSTRUCTOR, Role.ADMIN)
    async createCourse(
        @Body() createCourseDto: CreateCourseDto,
        @CurrentUser() user: any,
    ) {
        return await this.createCourseUseCase.execute(createCourseDto, user.id);
    }

    @Get()
    async getAllCourses() {
        return await this.getCourseUseCase.execute();
    }

    @Get(':id')
    async getCourseById(@Param('id') id: string) {
        return await this.getCourseByIdUseCase.execute(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.INSTRUCTOR, Role.ADMIN)
    async updateCourse(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto,
        @CurrentUser() user: any,
    ) {
        return await this.updateCourseUseCase.execute(id, updateCourseDto, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.INSTRUCTOR, Role.ADMIN)
    async deleteCourse(
        @Param('id') id: string,
        @CurrentUser() user: any,
    ) {
        return await this.deleteCourseUseCase.execute(id, user);
    }
}