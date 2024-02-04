import { Body, Controller, Delete, Get, Post, ValidationPipe } from '@nestjs/common';

import { CreateStationDto } from '../dtos/orgStation.dto';
import { OrgStationService } from '../services/orgStation.service ';

@Controller('org/station')
export class OrgStationController {
    constructor(private readonly orgStationService: OrgStationService) {}

    @Get()
    findAll() {
        return this.orgStationService.findAll();
    }

    @Post()
    create(
        @Body(
            new ValidationPipe({
                // transform: true,
                // forbidNonWhitelisted: true,
                // forbidUnknownValues: true,
                validationError: { target: false },
            }),
        )
        data: CreateStationDto,
    ) {
        console.log('data:', data);
        return this.orgStationService.create(data);
    }

    @Delete()
    delelte() {
        this.orgStationService;
    }
}
