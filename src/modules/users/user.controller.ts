import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get('profile')
    async getProfile() {
        return {
            success: true,
        };
    }
}
