import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities';
import { UserSubscriber } from './subscribers';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UsersService, UserSubscriber],
    exports: [UsersService],
})
export class UsersModule {}
