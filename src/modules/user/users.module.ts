import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConstants } from './constants';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
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
    providers: [UsersService, AuthService, UserSubscriber],
    exports: [UsersService, AuthService],
})
export class UsersModule {}
