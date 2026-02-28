import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "../../infrastructure/database/lesson.entity";
import { Repository } from "typeorm";
import { CourseEntity } from "src/modules/course/infrastructure/database/entities/course.entity";
import { CreateLessonDto } from "../dtos/create-lesson.dto";

@Injectable()
export class CreateLessonUseCase {
    constructor(
        @InjectRepository(LessonEntity)
        private readonly lessonRepository: Repository<LessonEntity>,
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) { }

    async execute(createLessonDto: CreateLessonDto) {
        const course = this.courseRepository.findOne({
            where: { id: createLessonDto.courseId }
        });

        if (!course) {
            throw new NotFoundException('ບໍ່ພົບຫຼັກສູດທີ່ລະບຸ');
        }

        const newLesson = this.lessonRepository.create(createLessonDto);
        return await this.lessonRepository.save(newLesson);
    }
}