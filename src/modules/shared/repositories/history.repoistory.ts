import { IHistory } from "@lib/interfaces/baseDef.interfaces";
import { BaseRepository } from "@lib/models/BaseRepository.models";
import { Builder } from "@lib/utils/queryBuilder.util";
import { ConnectionPool } from "mssql";
import { Database } from "src/database";

export class HistoryRepository extends BaseRepository<IHistory> {

    constructor(private queryBuilder: Builder<IHistory>) {
        super();
    }

    findOneBy(params: Partial<IHistory>): Promise<IHistory | null | undefined> {
        throw new Error("Method not implemented.");
    }

    get pool(): ConnectionPool {
        return this.queryBuilder.pool;
    }

    async openConnection(): Promise<void> {
        this.queryBuilder.setPool(await Database.pool());
    }

    getAll(): Promise<IHistory[] | undefined> {
        throw new Error("Method not implemented.");
    }

    async create(data: IHistory): Promise<void | undefined> {
        try {
            await this.openConnection();
            await this.queryBuilder
                .insert({ into: 'history', data })
                .execute();

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    delete(param: string | number): Promise<void | undefined> {
        throw new Error("Method not implemented.");
    }

    update(data: Partial<IHistory>): Promise<void | undefined> {
        throw new Error("Method not implemented.");
    }

}