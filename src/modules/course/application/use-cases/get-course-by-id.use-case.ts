import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "../../infrastructure/database/entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetCourseByIdUseCase {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) { }

    async execute(courseId: string) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['instructor', 'lessons'],
            order: {
                lessons: {
                    order: 'ASC',
                },
            },

            select: {
                instructor: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            }
        });
        if (!course) {
            throw new NotFoundException('ບໍ່ພົບຫຼັກສູດຮຽນທີ່ລະບຸ');
        }
        return course;
    }
}