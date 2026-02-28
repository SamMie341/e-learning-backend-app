import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseEntity } from "../../infrastructure/database/entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetCourseUseCase {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>
    ) { }

    async execute() {
        return await this.courseRepository.find({
            relations: ['instructor'],
            select: {
                instructor: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            }
        })
    }
}