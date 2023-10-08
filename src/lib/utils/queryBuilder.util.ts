import { ConnectionPool, Request } from "mssql";
import { createInputsFromEntries } from "./getInput.util";

export class Builder<T> {
    public pool: ConnectionPool;
    private query: string;
    private whiteSpace = "\u00A0";
    private request: Request | null = null;

    setPool(pool: ConnectionPool) {
        this.pool = pool;
        return this;
    }

    getPool() {
        return this.pool
    }

    select(data: { from: string; fields?: Array<keyof T> }) {
        let properties: string = "*";

        if (data.fields) {
            properties = data.fields.join(", ");
        }

        this.query = `SELECT ${properties} FROM ${data.from}`;

        return this;
    }

    where({ fields, op }: { fields: Partial<T>; op?: "OR" | "AND" }) {

        if (this.request === null) {
            this.request = this.pool.request();
        }

        this.query += ' WHERE ';
        const entries = Object.entries(fields);
        const inputs = createInputsFromEntries(entries, this.request).join(` ${op} `);

        this.query += `${inputs}`;

        return this;
    }

    insert({ into, data }: { into: string, data: T }) {
        this.query = `INSERT INTO ${into}`;
        this.request = this.pool.request();

        const keys = Object.keys(data as Record<string, any>);
        const params = [...keys].map(k => `@${k}`);

        for (const key of keys) {
            this.request.input(key, data[key as keyof T]);
        }

        this.query += `(${keys.join(", ")}) VALUES (${params.join(", ")})`
        return this;
    }

    update({ from, columns }: { from: string, columns: Partial<T> }) {
        const entries = Object.entries(columns);

        if (this.request === null) {
            this.request = this.pool.request();
        }

        const inputs = createInputsFromEntries(entries, this.request).join(', ');
        this.query = `UPDATE ${from} SET ${inputs}`;

        return this
    }

    delete({ from }: { from: string }) {
        this.query = `DELETE FROM ${from}`;
        return this
    }

    raw(command: string) {
        this.query = command;
    }

    async execute() {

        if (this.request === null) {
            this.request = this.pool.request();
        }

        console.log(this.query);
        const results = await this.request.query(this.query);
        return results;
    }
}
