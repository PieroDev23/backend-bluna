import { BaseRepository } from "@lib/models/BaseRepository.models";
import { Product } from "@lib/interfaces/baseDef.interfaces";
import { Builder } from "@lib/utils/queryBuilder.util";
import { ConnectionPool } from "mssql";
import { Database } from "src/database";

export class ProductRepository extends BaseRepository<Product>{

    constructor(private queryBuilder: Builder<Product>) {
        super();
    }

    get pool(): ConnectionPool {
        return this.queryBuilder.getPool();
    }

    async openConnection(): Promise<void> {
        this.queryBuilder.setPool(await Database.pool());
    }

    async findOneBy(params: Partial<Product>): Promise<Product | null | undefined> {
        try {
            await this.openConnection();
            const { recordset } = await this.queryBuilder
                .select({ from: 'products' })
                .where({ fields: { ...params }, op: 'OR' })
                .execute();

            const [product] = recordset;

            this.pool.close();
            return product as Product || null;

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    async getAll(): Promise<Product[] | undefined> {
        try {
            await this.openConnection();
            const { recordset, ...rest } = await this.queryBuilder
                .select({
                    from: 'products',
                    fields: ['product_id', 'product_name', 'price', 'stock', 'shelf_id']
                })
                .execute();

            this.pool.close();
            return recordset as Product[];

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    async create(data: Product): Promise<void | undefined> {
        try {
            await this.openConnection();
            await this.queryBuilder
                .insert({ into: 'products', data })
                .execute();

            this.pool.close();
        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    async delete(product_id: string | number): Promise<void | undefined> {
        try {
            await this.openConnection();
            await this.queryBuilder.delete({ from: 'products' })
                .where({ fields: { product_id } })
                .execute();

            this.pool.close();

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    async update(data: Partial<Product>): Promise<void | undefined> {
        try {
            await this.openConnection();
            const { product_id, ...restProduct } = data;

            await this.queryBuilder
                .update({ from: 'products', columns: restProduct })
                .where({ fields: { product_id } })
                .execute();

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }
}
