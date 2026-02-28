import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "../../infrastructure/database/lesson.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetLessonsByCourseUseCase {
    constructor(
        @InjectRepository(LessonEntity)
        private readonly lessonRepository: Repository<LessonEntity>
    ) { }

    async execute(courseId: string) {
        const lessons = await this.lessonRepository.find({
            where: { courseId: courseId },
            order: {
                order: 'ASC',
            }
        });
        return lessons;
    }
}