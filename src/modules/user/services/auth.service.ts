import { ForbiddenException, NotFoundException, Injectable } from '@nestjs/common';

import { decrypt } from '@/modules/user/helpers';

import { RegisterDto } from '../dtos/auth.dto';

import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByCredential(username, async (query) =>
            query.addSelect('user.password'),
        );
        if (!user) {
            throw new NotFoundException('用户不存在');
        }
        if (!decrypt(pass, user.password)) {
            throw new ForbiddenException('密码错误');
        }

        const { accessToken } = await this.tokenService.generateAccessToken(user);
        return accessToken;
    }

    async register(data: RegisterDto) {
        const { username, nickname, password } = data;
        const user = await this.userService.create({
            username,
            nickname,
            password,
            actived: true,
        } as any);
        return {
            username: user.username,
        };
    }
}
