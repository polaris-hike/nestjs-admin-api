import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/orgCategoty.dto';
import { OrgService } from '../services/org.service';

@Controller('org')
export class OrgController {
    constructor(private readonly orgService: OrgService) {}

    @Get('/tree')
    findAll() {
        return this.orgService.findTrees();
    }

    @Get(':id')
    async detail(
        @Param('id', new ParseUUIDPipe())
        id: string,
    ) {
        return this.orgService.detail(id);
    }

    @Post()
    async store(
        @Body()
        data: CreateCategoryDto,
    ) {
        return this.orgService.create(data);
    }

    @Patch()
    async update(
        @Body()
        data: UpdateCategoryDto,
    ) {
        return this.orgService.update(data);
    }

    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.orgService.delete(id);
    }
}
