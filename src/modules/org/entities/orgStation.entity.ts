import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity('test_org_station')
export class OrgStationEntity extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', generated: 'uuid', length: 36 })
    id: string;

    @Column()
    name: string;

    @Column()
    orgId: string;

    @Column()
    description: string;
}
