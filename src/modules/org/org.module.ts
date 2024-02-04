import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import { OrgController } from './controllers/org.controller';
import { OrgStationController } from './controllers/orgStation.controller';
import { OrgCategoryEntity } from './entities/org.entity';
import { OrgStationEntity } from './entities/orgStation.entity';
import { CategoryRepository } from './repositories/org.repository';
import { OrgService } from './services/org.service';
import { OrgStationService } from './services/orgStation.service ';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrgCategoryEntity, OrgStationEntity]),
        DatabaseModule.forRepository([CategoryRepository]),
    ],
    controllers: [OrgController, OrgStationController],
    providers: [OrgService, OrgStationService],
})
export class OrgModule {}
