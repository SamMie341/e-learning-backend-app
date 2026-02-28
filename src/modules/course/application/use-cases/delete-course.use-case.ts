import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "../../infrastructure/database/entities/course.entity";
import { Repository } from "typeorm";
import { Role } from "src/core/constants/role.constant";

@Injectable()
export class DeleteCourseUseCase {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>
    ) { }

    async execute(courseId: string, user: any) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
        });

        if (!course) {
            throw new NotFoundException('ບໍ່ພົບຫຼັກສູດທີ່ຕ້ອງການລົບ');
        }

        if (course.instructorId !== user.id && user.role !== Role.ADMIN) {
            throw new ForbiddenException('ທ່ານບໍ່ມີສິດລົບຫຼັກສູດນີ້ ເນື່ອງຈາກທ່ານບໍ່ແມ່ນເຈົ້າຂອງຫຼັກສູດ');
        }

        await this.courseRepository.remove(course);

        return { message: 'ລົບຫຼັກສູດສຳເລັດ' };
    }
}