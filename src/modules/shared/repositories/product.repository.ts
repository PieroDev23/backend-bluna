import { processError } from "@lib/helpers/processError.helper";
import { Product } from "@lib/interfaces/baseDef.interfaces";
import { Builder } from "@lib/utils/queryBuilder.util";
import { Database } from "src/database";

export class ProductRepository {

    static async findOneBy(data: Partial<Product>) {

    }

    static async getAll() {
        const pool = await Database.pool();
        const builder = new Builder<Product>().setPool(pool);

        try {
            const { recordset } = await builder
                .select({
                    from: 'products',
                    fields: ['product_id', 'product_name', 'price', 'stock', 'shelf_id']
                })
                .execute();

            pool.close();
            return recordset as Product[];

        } catch (error) {
            const { message } = processError(error);
            console.log(message);
            pool.close();
        }
    }

    static async create(data: Product) {
        const pool = await Database.pool();
        const builder = new Builder<Product>().setPool(pool);

        try {
            await builder
                .insert({ into: 'products', data })
                .execute();

        } catch (error) {
            const { message } = processError(error);
            console.log(message);
            pool.close();
        }

    }

    static async drop(id: number) {

    }
}