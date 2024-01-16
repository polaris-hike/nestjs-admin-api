import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { decrypt } from '@/modules/user/helpers';

import { RegisterDto } from '../dtos/auth.dto';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByCredential(username, async (query) =>
            query.addSelect('users.password'),
        );
        if (!decrypt(pass, user?.password)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
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
