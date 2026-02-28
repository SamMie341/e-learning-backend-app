import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "../../infrastructure/database/entities/course.entity";
import { Repository } from "typeorm";
import { CreateCourseDto } from "../dtos/create-course.dto";

@Injectable()
export class CreateCourseUseCase {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) { }

    async execute(createCourseDto: CreateCourseDto, instructorId: string) {
        const newCourse = this.courseRepository.create({
            ...createCourseDto,
            instructorId: instructorId,
        });
        return await this.courseRepository.save(newCourse);
    }
}