import { config } from "mssql";

export const databaseConf: config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.SERVER!,
    database: process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};