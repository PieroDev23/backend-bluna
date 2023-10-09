import { IRequest } from "@lib/interfaces/baseDef.interfaces";
import { BaseRepository } from "@lib/models/BaseRepository.models";
import { Builder } from "@lib/utils/queryBuilder.util";
import { ConnectionPool } from "mssql";
import { Database } from "src/database";

export class RequestsRepository extends BaseRepository<IRequest> {

    constructor(private queryBuilder: Builder<IRequest>) {
        super();
    }

    get pool(): ConnectionPool {
        return this.queryBuilder.getPool();
    }

    async openConnection(): Promise<void> {
        this.queryBuilder.setPool(await Database.pool());
    }

    findOneBy(params: Partial<IRequest>): Promise<IRequest | null | undefined> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<IRequest[] | undefined> {
        try {
            await this.openConnection();
            const { recordset } = await this.queryBuilder
                .selectJoin({
                    fields: ['Requests.request_id', 'Users.last_name', 'Users.first_name', 'Requests.quantity, Requests.status'],
                    joinType: 'INNER',
                    on: 'Users.user_id = Requests.user_id'
                })
                .execute();

            this.pool.close();
            return recordset;

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    async create(data: IRequest): Promise<void | undefined> {
        try {
            await this.openConnection();
            await this.queryBuilder
                .insert({ into: 'requests', data })
                .execute();

            this.pool.close();
        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    delete(param: string | number): Promise<void | undefined> {
        throw new Error("Method not implemented.");
    }

    async update(data: Partial<IRequest>): Promise<void | undefined> {
        try {
            await this.openConnection();
            const { request_id, status } = data;
            await this.queryBuilder
                .update({ from: 'requests', columns: { status } })
                .where({ fields: { request_id } })
                .execute();

            this.pool.close();

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

}