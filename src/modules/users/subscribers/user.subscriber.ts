import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { UserEntity } from '../entities';
import { encrypt } from '../helpers';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }

    listenTo() {
        return UserEntity;
    }

    async beforeInsert(event: InsertEvent<UserEntity>) {
        // 自动加密密码
        event.entity.password = await encrypt(event.entity.password);
    }
}
