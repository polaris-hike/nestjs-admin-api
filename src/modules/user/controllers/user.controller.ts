import { Controller, Get } from '@nestjs/common';

import { ReqUser } from '../decorators/user-request.decorator';
import { UserEntity } from '../entities';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(protected userService: UserService) {}

    @Get('profile')
    async getProfile(@ReqUser() user: ClassToPlain<UserEntity>) {
        return this.userService.detail((user as any).sub);
    }
}
