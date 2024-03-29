import { Injectable } from '@nestjs/common';

import { isNil, omit } from 'lodash';

import { EntityNotFoundError } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/orgCategoty.dto';
import { OrgCategoryEntity } from '../entities/org.entity';
import { CategoryRepository } from '../repositories/org.repository';

@Injectable()
export class OrgService {
    constructor(protected repository: CategoryRepository) {}

    /**
     * 查询分类树
     */
    async findTrees() {
        return this.repository.findTrees();
    }

    /**
     * 获取数据详情
     * @param id
     */
    async detail(id: string) {
        return this.repository.findOneOrFail({
            where: { id },
            relations: ['parent'],
        });
    }

    /**
     * 新增分类
     * @param data
     */
    async create(data: CreateCategoryDto) {
        const item = await this.repository.save({
            ...data,
            parent: await this.getParent(undefined, data.parent),
        });
        return this.detail(item.id);
    }

    /**
    //  * 更新分类
    //  * @param data
    //  */
    async update(data: UpdateCategoryDto) {
        await this.repository.update(data.id, omit(data, ['id', 'parent']));
        const item = await this.detail(data.id);
        const parent = await this.getParent(item.parent?.id, data.parent);
        const shouldUpdateParent =
            (!isNil(item.parent) && !isNil(parent) && item.parent.id !== parent.id) ||
            (isNil(item.parent) && !isNil(parent)) ||
            (!isNil(item.parent) && isNil(parent));
        // 父分类单独更新
        if (parent !== undefined && shouldUpdateParent) {
            item.parent = parent;
            await this.repository.save(item, { reload: true });
        }
        return item;
    }

    /**
     * 删除分类
     * @param id
     */
    async delete(id: string) {
        const item = await this.repository.findOneOrFail({
            where: { id },
            relations: ['parent', 'children'],
        });
        // 把子分类提升一级
        if (!isNil(item.children) && item.children.length > 0) {
            const nchildren = [...item.children].map((c) => {
                c.parent = item.parent;
                return item;
            });

            await this.repository.save(nchildren, { reload: true });
        }
        return this.repository.remove(item);
    }

    /**
     * 获取请求传入的父分类
     * @param current 当前分类的ID
     * @param id
     */
    protected async getParent(current?: string, parentId?: string) {
        if (current === parentId) return undefined;
        let parent: OrgCategoryEntity | undefined;
        if (parentId !== undefined) {
            if (parentId === null) return null;
            parent = await this.repository.findOne({ where: { id: parentId } });
            if (!parent)
                throw new EntityNotFoundError(
                    OrgCategoryEntity,
                    `Parent category ${parentId} not exists!`,
                );
        }
        return parent;
    }
}
