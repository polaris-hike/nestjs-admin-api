import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConstants } from './constants';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserSubscriber } from './subscribers';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' },
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService, UserSubscriber],
    exports: [UserService, AuthService],
})
export class UsersModule {}
