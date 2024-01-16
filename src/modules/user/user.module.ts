import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConstants } from './constants';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { UserSubscriber } from './subscribers';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.access_secret,
            signOptions: { expiresIn: '30m' },
        }),
        TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService, TokenService, UserSubscriber],
    exports: [UserService, AuthService, TokenService],
})
export class UsersModule {}
