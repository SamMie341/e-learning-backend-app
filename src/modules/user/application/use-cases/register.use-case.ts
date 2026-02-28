import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthProvider, UserEntity } from "../../infrastructure/database/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "../dtos/register.dto";
import { ERROR_MESSAGES } from "src/core/constants/message.constant";
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async execute(registerDto: RegisterDto): Promise<UserEntity> {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

        const newUser = this.userRepository.create({
            email: registerDto.email,
            password: hashedPassword,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            provider: AuthProvider.LOCAL,
        });

        return await this.userRepository.save(newUser);
    }
}