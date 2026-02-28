import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "../../infrastructure/database/lesson.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetLessonByIdUseCase {
    constructor(
        @InjectRepository(LessonEntity)
        private readonly lessonRepository: Repository<LessonEntity>,
    ) { }

    async execute(lessonId: string) {
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId }
        });
        if (!lesson) {
            throw new NotFoundException('ບໍ່ພົບບົດຮຽນທີ່ລະບຸ');
        }
        return lesson;
    }
}