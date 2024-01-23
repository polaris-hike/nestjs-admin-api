import { Entity, Tree, Column, TreeChildren, TreeParent, PrimaryColumn, BaseEntity } from 'typeorm';

@Tree('materialized-path')
@Entity('test_tree')
export class OrgCategoryEntity extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
    id: string;

    @Column({ comment: '分类排序', default: 0 })
    customOrder: number;

    depth = 0;

    @Column()
    name: string;

    @TreeChildren()
    children: OrgCategoryEntity[];

    @TreeParent({ onDelete: 'CASCADE' })
    parent: OrgCategoryEntity | null;
}
