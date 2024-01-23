import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyReply as Response } from 'fastify';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { getTime } from '@/modules/core/helpers';

import { jwtConstants } from '../constants';
import { UserEntity } from '../entities';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

@Injectable()
export class TokenService {
    constructor(protected jwtService: JwtService) {}

    /**
     * 根据accessToken刷新AccessToken与RefreshToken
     * @param accessToken
     * @param response
     */
    async refreshToken(accessToken: string, response: Response) {
        // TODO
        // const { user, refreshToken } = accessToken;
        // if (refreshToken) {
        //     const now = await getTime();
        //     // 判断refreshToken是否过期
        //     if (now.isAfter(refreshToken.expired_at)) return null;
        //     // 如果没过期则生成新的access_token和refresh_token
        //     const token = await this.generateAccessToken(user);
        //     response.header('token', token.accessToken);
        //     return token;
        // }
        // return null;
    }

    async generateAccessToken(user: UserEntity) {
        const accessTokenPayload = {
            sub: user.id,
            username: user.username,
        };

        const signed = this.jwtService.sign(accessTokenPayload);
        if (!user.refreshToken) {
            await this.generateRefreshToken(user, signed);
        }
        return { accessToken: signed };
    }

    /**
     * 生成新的RefreshToken并存入数据库
     * @param accessToken
     */
    async generateRefreshToken(user: UserEntity, accessToken: string): Promise<RefreshTokenEntity> {
        const now = await getTime();
        const refreshTokenPayload = {
            uuid: uuid(),
        };
        const refreshToken = new RefreshTokenEntity();
        refreshToken.value = jwt.sign(refreshTokenPayload, jwtConstants.refresh_secret);
        refreshToken.expired_at = now.add(3600 * 30, 'second').toDate();
        refreshToken.accessToken = accessToken;
        refreshToken.user = user;
        await refreshToken.save();
        return refreshToken;
    }
}
