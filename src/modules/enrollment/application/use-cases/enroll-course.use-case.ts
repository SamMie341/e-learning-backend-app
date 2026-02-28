import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EnrollmentEntity } from "../../infrastructure/database/entities/enrollment.entity";
import { Repository } from "typeorm";
import { CourseEntity } from "src/modules/course/infrastructure/database/entities/course.entity";
import { EnrollCourseDto } from "../dtos/enroll-course.dto";

@Injectable()
export class EnrollCourseUseCase {
    constructor(
        @InjectRepository(EnrollmentEntity)
        private readonly enrollmentRepository: Repository<EnrollmentEntity>,
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>
    ) { }

    async execute(enrollCourseDto: EnrollCourseDto, studentId: string) {
        const course = await this.courseRepository.findOne({
            where: { id: enrollCourseDto.courseId },
        });

        if (!course) {
            throw new NotFoundException('ບໍ່ພົບຫຼັກສູດທີ່ລະບຸ');
        }

        const existingEntollment = await this.enrollmentRepository.findOne({
            where: { courseId: enrollCourseDto.courseId, studentId: studentId }
        });

        if (existingEntollment) {
            throw new ConflictException('ທ່ານໄດ້ລົງທະບຽນຫຼັກສູດນີ້ແລ້ວ');
        }
        const newEnrollment = this.enrollmentRepository.create({
            courseId: enrollCourseDto.courseId,
            studentId: studentId,
        });
        await this.enrollmentRepository.save(newEnrollment);

        return {
            message: 'ລົງທະບຽນຮຽນສຳເລັດ',
            courseId: course.id,
            courseTitle: course.title,
        }
    }
}