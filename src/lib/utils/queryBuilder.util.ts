import { ConnectionPool, Request } from "mssql";

export class Builder<T> {
    protected pool: ConnectionPool;
    protected query: string;
    protected whiteSpace = "\u00A0";
    protected request: Request;

    setPool(pool: ConnectionPool) {
        this.pool = pool;
        return this;
    }

    select(data: { from: string; fields?: Array<keyof T> }) {
        let properties: string = "*"
        if (data.fields) {
            properties = data.fields.join(", ");
        }

        this.query = `SELECT ${properties} FROM ${data.from}`;

        return this;
    }

    where({ fields, op }: { fields: Partial<T>; op?: "OR" | "AND" }) {
        this.query = this.query
            .concat(this.whiteSpace)
            .concat("WHERE")
            .concat(this.whiteSpace);

        const keys = Object.keys(fields as Record<string, any>);
        this.request = this.pool.request();

        keys.forEach((key, idx) => {
            this.query += `${key}=@param${idx}`;

            if (idx < keys.length - 1) {
                this.query = this.query
                    .concat(this.whiteSpace)
                    .concat(`${op}`)
                    .concat(this.whiteSpace);
            }

            this.request.input(`param${idx}`, fields[key as keyof T]);
        })

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

        this.query += `(${keys.join(", ")})`
            .concat(this.whiteSpace)
            .concat(`VALUES (${params.join(", ")})`);

        return this;
    }

    raw(command: string) {
        this.query = command;
    }

    async execute() {
        console.log(this.query);
        const results = await this.request.query(this.query);
        return results;
    }
}
