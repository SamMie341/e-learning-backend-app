import { CourseEntity } from "src/modules/course/infrastructure/database/entities/course.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('lessons')
export class LessonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ name: 'video_url', nullable: true })
    videoUrl: string;

    @Column({ name: 'document_url', nullable: true })
    documentUrl: string;

    @Column({ type: 'int', default: 1 })
    order: number;

    @ManyToOne(() => CourseEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @Column({ name: 'course_id' })
    courseId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}