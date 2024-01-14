import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities';
import { UserSubscriber } from './subscribers';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UsersService, UserSubscriber],
    exports: [UsersService],
})
export class UsersModule {}
