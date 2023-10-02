import { processError } from "@lib/helpers/processError.helper";
import { User } from "@lib/interfaces/baseDef.interfaces";
import { Builder } from "@lib/utils/queryBuilder.util";
import { Database } from "src/database";



export class UserRepository {

    static async findOneBy(data: Partial<User>) {
        const pool = await Database.pool();
        const builder = new Builder<User>().setPool(pool);
        try {

            const { recordset } = await builder
                .select({
                    from: 'users',
                    fields: ['user_id', 'first_name', 'last_name', 'role', 'email']
                })
                .where({ fields: { ...data }, op: 'OR' })
                .execute();


            const [user] = recordset;
            pool.close();

            return !user ? null : user as User;

        } catch (error) {
            const { message } = processError(error);
            console.log(message);
            pool.close();
        }
    }

    static async getAll() {

    }

    static async create(data: User): Promise<User | undefined> {
        const pool = await Database.pool();
        const builder = new Builder<User>().setPool(pool);
        try {
            const { recordset } = await builder
                .insert({ into: 'users', data })
                .execute();

            const [user] = recordset;
            pool.close();

            return user;

        } catch (error) {
            const { message } = processError(error);
            console.log(message);
            pool.close();
        }

    }

    static async drop(id: number) {

    }
}