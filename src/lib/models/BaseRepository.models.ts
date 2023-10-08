import { processError } from "@lib/helpers/processError.helper";
import { ConnectionPool } from "mssql";

export abstract class BaseRepository<T> {
    abstract findOneBy(params: Partial<T>): Promise<T | null | undefined>;

    abstract get pool(): ConnectionPool;
    abstract getAll(): Promise<T[] | undefined>;
    abstract create(data: T): Promise<void | undefined>;
    abstract delete(param: string | number): Promise<void | undefined>;
    abstract update(data: Partial<T>): Promise<void | undefined>;

    throwRepoError(error: unknown) {
        const { message } = processError(error);
        console.log('[REPOSITORY ERROR] ', message);
        console.log(error);
    }
}