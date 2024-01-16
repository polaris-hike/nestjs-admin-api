import { Exclude, Expose, Type } from 'class-transformer';

import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * 用户模型
 */
@Exclude()
@Entity('user')
export class UserEntity {
    @Expose()
    @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
    id: string;

    @Expose()
    @Column({
        comment: '姓名',
        nullable: true,
    })
    nickname?: string;

    @Expose()
    @Column({ comment: '用户名', unique: true })
    username: string;

    @Column({ comment: '密码', length: 500, select: false })
    password: string;

    @Expose()
    @Column({ comment: '手机号', nullable: true, unique: true })
    phone?: string;

    @Expose()
    @Column({ comment: '邮箱', nullable: true, unique: true })
    email?: string;

    @Expose()
    @Type(() => Date)
    @CreateDateColumn({
        comment: '用户创建时间',
    })
    createdAt: Date;

    @Expose()
    @Type(() => Date)
    @UpdateDateColumn({
        comment: '用户更新时间',
    })
    updatedAt: Date;

    @Expose()
    @Type(() => Date)
    @DeleteDateColumn({
        comment: '删除时间',
    })
    deletedAt: Date;
}
