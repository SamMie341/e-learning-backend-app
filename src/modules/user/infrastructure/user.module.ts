import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./database/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "../presentation/auth.controller";
import { RegisterUseCase } from "../application/use-cases/register.use-case";
import { GooGleAuthUseCase } from "../application/use-cases/google-auth.use-case";
import { GoogleStrategy } from "./strategies/google.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { LoginUseCase } from "../application/use-cases/login.use-case";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserController } from "../presentation/user.controller";
import { GetProfileUseCase } from "../application/use-cases/get-profile.use-case";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOption: {
                    expiresIn: configService.get<string>('JWT_EXPIRATION') || '1d'
                }
            }),
        }),
    ],
    controllers: [AuthController, UserController,],
    providers: [
        RegisterUseCase,
        GooGleAuthUseCase,
        LoginUseCase,
        GoogleStrategy,
        JwtStrategy,
        GetProfileUseCase,
    ],
    exports: [TypeOrmModule, JwtModule],
})
export class UserModule { }