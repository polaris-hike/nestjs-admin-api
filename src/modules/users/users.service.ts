import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { QueryHook } from '../database/types';

import { CreateUserDto } from './dtos/user.dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    buildBaseQuery() {
        return this.usersRepository.createQueryBuilder('users').orderBy(`users.createdAt`, 'DESC');
    }

    async findOneByCredential(credential: string, callback?: QueryHook<UserEntity>) {
        let query = this.buildBaseQuery();
        if (callback) {
            query = await callback(query);
        }
        return query
            .where('users.username = :credential', { credential })
            .orWhere('users.email = :credential', { credential })
            .orWhere('users.phone = :credential', { credential })
            .getOne();
    }

    async findOne(username: string): Promise<any> {
        return this.usersRepository.findOneBy({ username });
    }

    async create(data: CreateUserDto) {
        const user = await this.usersRepository.save(data, { reload: true });
        return user;
    }
}
