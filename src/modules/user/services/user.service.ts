import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { QueryHook } from '../../database/types';

import { CreateUserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    buildBaseQuery() {
        return this.usersRepository.createQueryBuilder('user').orderBy(`user.createdAt`, 'DESC');
    }

    async findOneByCredential(credential: string, callback?: QueryHook<UserEntity>) {
        let query = this.buildBaseQuery();
        if (callback) {
            query = await callback(query);
        }
        return query
            .where('user.username = :credential', { credential })
            .orWhere('user.email = :credential', { credential })
            .orWhere('user.phone = :credential', { credential })
            .getOne();
    }

    async findOne(username: string): Promise<any> {
        return this.usersRepository.findOneBy({ username });
    }

    async create(data: CreateUserDto) {
        const user = await this.usersRepository.save(data, { reload: true });
        return user;
    }

    /**
     * 获取数据详情
     * @param id
     * @param trashed 查询时是否包含已软删除的数据
     * @param callback 回调查询
     */
    async detail(id: string, callback?: QueryHook<UserEntity>): Promise<UserEntity> {
        let query = this.buildBaseQuery();
        if (callback) {
            query = await callback(query);
        }
        return query.where('user.id = :id', { id }).getOne();
    }
}
