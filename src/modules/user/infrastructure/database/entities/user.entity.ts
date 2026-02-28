import { Role } from "src/core/constants/role.constant";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum AuthProvider {
    LOCAL = 'LOCAL',
    GOOLE = 'GOOGLE',
}

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL })
    provider: AuthProvider;

    @Column({ name: 'google_id', nullable: true, unique: true })
    googleId?: string;

    @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
    role: Role;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updateAt: Date;
}