import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "../../infrastructure/database/lesson.entity";
import { Repository } from "typeorm";
import { UpdateLessonDto } from "../dtos/ีupdate-lesson.dto";
import { Role } from "src/core/constants/role.constant";

@Injectable()
export class UpdateLessonUseCase {
    constructor(
        @InjectRepository(LessonEntity)
        private readonly lessonRepository: Repository<LessonEntity>,
    ) { }

    async execute(lessonId: string, updateLessonDto: UpdateLessonDto, user: any) {
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId },
            relations: ['course'],
        });
        if (!lesson) {
            throw new NotFoundException('ບໍ່ພົບບົດຮຽນທີ່ຕ້ອງການແກ້ໄຂ');
        }
        if (user.role !== Role.ADMIN && lesson.course.instructorId !== user.id) {
            throw new ForbiddenException('ທ່ານບໍ່ມີສິດແກ້ໄຂບົດຮຽນນີ້');
        }

        Object.assign(lesson, updateLessonDto);
        return await this.lessonRepository.save(lesson);
    }
}