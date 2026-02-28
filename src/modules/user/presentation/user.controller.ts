import { Controller, Get, UseGuards } from "@nestjs/common";
import { GetProfileUseCase } from "../application/use-cases/get-profile.use-case";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";
import { CurrentUser } from "src/core/decorators/current-user.decorator";

@Controller('users')
export class UserController {
    constructor(private readonly getProfileUseCase: GetProfileUseCase) { }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: any) {
        return await this.getProfileUseCase.execute(user.id);
    }
}