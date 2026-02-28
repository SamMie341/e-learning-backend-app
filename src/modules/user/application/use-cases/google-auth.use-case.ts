import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthProvider, UserEntity } from "../../infrastructure/database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class GooGleAuthUseCase {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async execute(googleUser: any): Promise<UserEntity> {
        let user = await this.userRepository.findOne({
            where: { email: googleUser.email }
        });

        if (user) {
            if (!user.googleId) {
                user.googleId = googleUser.googleId;
                user.provider = AuthProvider.GOOLE;
                await this.userRepository.save(user);
            }
            return user;
        }
        const newUser = this.userRepository.create({
            email: googleUser.email,
            firstName: googleUser.firstName,
            lastName: googleUser.lastName,
            googleId: googleUser.googleId,
            provider: AuthProvider.GOOLE,
        });
        return await this.userRepository.save(newUser);
    }
}