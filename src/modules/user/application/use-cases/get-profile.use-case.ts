import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../../infrastructure/database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetProfileUseCase {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async execute(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException('ບໍ່ພົບຜູ້ໃຊ້ງານ');
        }

        const { password, ...result } = user;
        return result;
    }
}