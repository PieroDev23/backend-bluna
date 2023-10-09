import { BaseRepository } from "@lib/models/BaseRepository.models";
import { User } from "@lib/interfaces/baseDef.interfaces";
import { Builder } from "@lib/utils/queryBuilder.util";
import { Database } from "src/database";


export class UserRepository extends BaseRepository<User>{

    constructor(private queryBuilder: Builder<User>) {
        super();
    }

    get pool() {
        return this.queryBuilder.getPool();
    }

    async openConnection() {
        this.queryBuilder.setPool(await Database.pool());
    }

    async findOneBy(params: Partial<User>): Promise<User | null | undefined> {
        try {
            await this.openConnection();

            const { recordset } = await this.queryBuilder
                .select({
                    from: 'users',
                    fields: ['user_id', 'first_name', 'last_name', 'role', 'email', 'password']
                })
                .where({ fields: params, op: 'OR' })
                .execute();

            const [user] = recordset;

            this.pool.close();
            return !user ? null : user as User;

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    async getAll(): Promise<User[] | undefined> {
        try {
            await this.openConnection();
            const { recordset } = await this.queryBuilder
                .select({
                    from: 'users',
                    fields: ['user_id', 'first_name', 'last_name', 'email', 'role']
                })
                .execute();


            this.pool.close();
            return recordset as User[];

        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    async create(data: User): Promise<void | undefined> {
        try {
            await this.openConnection();
            await this.queryBuilder
                .insert({ into: 'users', data })
                .execute();

            this.pool.close();
        } catch (error) {
            this.pool.close();
            this.throwRepoError(error);
        }
    }

    delete(param: string | number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(data: Partial<User>): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
