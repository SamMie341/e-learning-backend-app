import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EnrollmentEntity } from "../../infrastructure/database/entities/enrollment.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetMyEnrollmentUseCase {
    constructor(
        @InjectRepository(EnrollmentEntity)
        private readonly enrollmentRepository: Repository<EnrollmentEntity>,
    ) { }

    async execute(studentId: string) {
        const enrollments = await this.enrollmentRepository.find({
            where: { studentId: studentId },
            relations: ['course', 'course.instructor'],
            order: {
                enrolledAt: 'DESC',
            },
            select: {
                course: {
                    id: true,
                    title: true,
                    description: true,
                    instructor: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });

        return enrollments.map(enrollments => ({
            enrollmentId: enrollments.id,
            enrollmentAt: enrollments.enrolledAt,
            status: enrollments.status,
            course: enrollments.course,
        }));
    }
}