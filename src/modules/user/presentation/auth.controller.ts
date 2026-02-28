import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { RegisterUseCase } from "../application/use-cases/register.use-case";
import { GooGleAuthUseCase } from "../application/use-cases/google-auth.use-case";
import { RegisterDto } from "../application/dtos/register.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoginUseCase } from "../application/use-cases/login.use-case";
import { LoginDto } from "../application/dtos/login.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly googleAuthUseCase: GooGleAuthUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.registerUseCase.execute(registerDto);

        const { password, ...result } = user;
        return result
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.loginUseCase.execute(loginDto);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res) {
        const user = await this.googleAuthUseCase.execute(req.user);
        const tokenData = this.loginUseCase.generateToken(user);

        return res.status(HttpStatus.OK).json({
            message: 'Google Login Successful',
            data: tokenData,
        });
    }
}