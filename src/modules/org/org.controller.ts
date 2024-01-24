import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCategoryDto } from './dtos/orgCategoty.dto';
import { OrgService } from './org.service';

@Controller('org')
export class OrgController {
    constructor(private readonly orgService: OrgService) {}

    @Get('/tree')
    findAll() {
        return this.orgService.findTrees();
    }

    @Post()
    async store(
        @Body()
        data: CreateCategoryDto,
    ) {
        return this.orgService.create(data);
    }
}
