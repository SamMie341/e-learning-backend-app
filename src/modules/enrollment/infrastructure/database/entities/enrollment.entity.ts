import { CourseEntity } from "src/modules/course/infrastructure/database/entities/course.entity";
import { UserEntity } from "src/modules/user/infrastructure/database/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

export enum EnrollmentStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
}

@Entity('enrollments')
@Unique(['studentId', 'courseId'])
export class EnrollmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: EnrollmentStatus, default: EnrollmentStatus.ACTIVE })
    status: EnrollmentStatus;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student: UserEntity;

    @Column({ name: 'student_id' })
    studentId: string;

    @ManyToOne(() => CourseEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @Column({ name: 'course_id' })
    courseId: string;

    @CreateDateColumn({ name: 'enrolled_at' })
    enrolledAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}