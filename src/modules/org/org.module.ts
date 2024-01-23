import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import { OrgCategoryEntity } from './entities/org.entity';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { CategoryRepository } from './repositories/org.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrgCategoryEntity]),
        DatabaseModule.forRepository([CategoryRepository]),
    ],
    controllers: [OrgController],
    providers: [OrgService],
})
export class OrgModule {}
