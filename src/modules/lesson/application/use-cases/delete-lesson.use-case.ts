import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "../../infrastructure/database/lesson.entity";
import { Repository } from "typeorm";
import { Role } from "src/core/constants/role.constant";

@Injectable()
export class DeleteLessonUseCase {
    constructor(
        @InjectRepository(LessonEntity)
        private readonly lessonRepository: Repository<LessonEntity>,
    ) { }

    async execute(lessonId: string, user: any) {
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonId },
            relations: ['course'],
        });

        if (!lesson) {
            throw new NotFoundException('ບໍ່ພົບບົດຮຽນທີ່ຕ້ອງການລົບ');
        }

        if (user.role !== Role.ADMIN && lesson.course.instructorId !== user.id) {
            throw new ForbiddenException('ທ່ານບໍ່ມີສິດລົບບົດຮຽນນີ້');
        }

        await this.lessonRepository.remove(lesson);
        return { message: 'ລົບບົດຮຽນສຳເລັດ' };
    }
}