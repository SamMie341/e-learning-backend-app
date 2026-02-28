import { LessonEntity } from "src/modules/lesson/infrastructure/database/lesson.entity";
import { UserEntity } from "src/modules/user/infrastructure/database/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('courses')
export class CourseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    price: number;

    @Column({ name: 'is_published', default: false })
    isPublished: boolean;

    @ManyToOne(() => UserEntity, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'instructor_id' })
    instructor: UserEntity;

    @Column({ name: 'instructor_id' })
    instructorId: string;

    @OneToMany(() => LessonEntity, (lesson) => lesson.course)
    lessons: LessonEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}