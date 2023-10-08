import { IRequest } from "@lib/interfaces/baseDef.interfaces";
import { BaseRepository } from "@lib/models/BaseRepository.models";
import { Builder } from "@lib/utils/queryBuilder.util";
import { ConnectionPool } from "mssql";

export class RequestsRepository extends BaseRepository<IRequest> {

    constructor(private queryBuilder: Builder<IRequest>) {
        super();
    }

    get pool(): ConnectionPool {
        return this.queryBuilder.getPool();
    }

    findOneBy(params: Partial<IRequest>): Promise<IRequest | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<IRequest[] | undefined> {
        try {
            const { recordset } = await this.queryBuilder
                .select({
                    from: 'requests',
                    fields: ['request_id', 'user_id', 'product_id', 'status', 'created_at']
                }).execute();

            this.pool.close();
            return recordset as IRequest[];

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    create(data: IRequest): Promise<void | undefined> {
        throw new Error("Method not implemented.");
    }

    delete(param: string | number): Promise<void | undefined> {
        throw new Error("Method not implemented.");
    }

    async update(data: Partial<IRequest>): Promise<void | undefined> {
        try {
            const { request_id, status } = data;
            await this.queryBuilder
                .update({ from: 'requests', columns: { status } })
                .where({ fields: { request_id } })
                .execute();

        } catch (error) {
            this.throwRepoError(error);
        }
    }

}