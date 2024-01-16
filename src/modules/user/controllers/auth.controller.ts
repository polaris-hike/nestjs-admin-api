import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';

import { Guest } from '../decorators';
import { CredentialDto, RegisterDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * 使用用户名密码注册用户
     * @param data
     */
    @Post('register')
    @Guest()
    async register(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['create'],
            }),
        )
        data: RegisterDto,
    ) {
        return this.authService.register(data);
    }

    @HttpCode(HttpStatus.OK)
    @Guest()
    @Post('login')
    async signIn(
        @Body(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                validationError: { target: false },
                groups: ['create'],
            }),
        )
        data: CredentialDto,
    ) {
        return { token: await this.authService.signIn(data.credential, data.password) };
    }
}
