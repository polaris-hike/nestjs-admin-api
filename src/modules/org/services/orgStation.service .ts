import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateStationDto } from '../dtos/orgStation.dto';
import { OrgStationEntity } from '../entities/orgStation.entity';

@Injectable()
export class OrgStationService {
    constructor(
        @InjectRepository(OrgStationEntity)
        private stationRepository: Repository<OrgStationEntity>,
    ) {}

    buildBaseQuery() {
        return this.stationRepository
            .createQueryBuilder('test_org_station')
            .orderBy(`test_org_station.createdAt`, 'DESC');
    }

    async findAll() {
        return this.stationRepository.find();
    }

    async create(data: CreateStationDto) {
        const station = await this.stationRepository.save(data, { reload: true });
        return station;
    }
}
