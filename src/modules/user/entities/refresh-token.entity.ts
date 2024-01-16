import { Exclude } from 'class-transformer';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryColumn,
    Relation,
} from 'typeorm';

import { UserEntity } from './user.entity';

/**
 * 刷新Token的Token模型
 */
@Entity('user_refresh_tokens')
@Exclude()
export class RefreshTokenEntity extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
    id: string;

    /**
     * @description 令牌字符串
     * @type {string}
     */
    @Column({ length: 500 })
    value: string;

    @Column({
        comment: '登陆令牌',
    })
    accessToken: string;

    /**
     * @description 所属用户
     * @type {UserEntity}
     */
    @OneToOne((type) => UserEntity, (user) => user.refreshToken)
    user: Relation<UserEntity>;

    @Column({
        comment: '令牌过期时间',
    })
    expired_at: Date;

    @CreateDateColumn({
        comment: '令牌创建时间',
    })
    createdAt: Date;
}
