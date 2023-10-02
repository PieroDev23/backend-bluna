import sql, { ConnectionPool } from 'mssql';
import { databaseConf } from './__config';

export class Database {

    static pool(): Promise<ConnectionPool> {
        return sql.connect(databaseConf);
    }

}