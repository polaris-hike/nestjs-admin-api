import { unset } from 'lodash';
import { FindOptionsUtils, FindTreeOptions, TreeRepository } from 'typeorm';

import { CustomRepository } from '@/modules/database/decorators';

import { OrgCategoryEntity } from '../entities/org.entity';

@CustomRepository(OrgCategoryEntity)
export class CategoryRepository extends TreeRepository<OrgCategoryEntity> {
    /**
     * 构建基础查询器
     */
    buildBaseQB() {
        return this.createQueryBuilder('test_tree').leftJoinAndSelect('test_tree.parent', 'parent');
    }

    /**
     * 查询顶级分类
     * @param options
     */
    findRoots(options?: FindTreeOptions) {
        const escapeAlias = (alias: string) => this.manager.connection.driver.escape(alias);
        const escapeColumn = (column: string) => this.manager.connection.driver.escape(column);

        const joinColumn = this.metadata.treeParentRelation!.joinColumns[0];
        const parentPropertyName = joinColumn.givenDatabaseName || joinColumn.databaseName;
        const qb = this.buildBaseQB().orderBy('test_tree.customOrder', 'ASC');
        FindOptionsUtils.applyOptionsToTreeQueryBuilder(qb, options);

        return qb
            .where(`${escapeAlias('test_tree')}.${escapeColumn(parentPropertyName)} IS NULL`)
            .getMany();
    }

    /**
     * 查询后代分类
     * @param entity
     * @param options
     */
    findDescendants(entity: OrgCategoryEntity, options?: FindTreeOptions) {
        const qb = this.createDescendantsQueryBuilder('test_tree', 'treeClosure', entity);
        FindOptionsUtils.applyOptionsToTreeQueryBuilder(qb, options);
        qb.orderBy('test_tree.customOrder', 'ASC');
        return qb.getMany();
    }

    /**
     * 查询祖先分类
     * @param entity
     * @param options
     */
    findAncestors(entity: OrgCategoryEntity, options?: FindTreeOptions) {
        const qb = this.createAncestorsQueryBuilder('test_tree', 'treeClosure', entity);
        FindOptionsUtils.applyOptionsToTreeQueryBuilder(qb, options);
        qb.orderBy('test_tree.customOrder', 'ASC');
        return qb.getMany();
    }

    /**
     * 打平并展开树
     * @param trees
     * @param depth
     * @param parent
     */
    async toFlatTrees(
        trees: OrgCategoryEntity[],
        depth = 0,
        parent: OrgCategoryEntity | null = null,
    ) {
        const data: Omit<OrgCategoryEntity, 'children'>[] = [];
        for (const item of trees) {
            item.depth = depth;
            item.parent = parent;
            const { children } = item;
            unset(item, 'children');
            data.push(item);
            data.push(...(await this.toFlatTrees(children, depth + 1, item)));
        }
        return data as OrgCategoryEntity[];
    }
}
