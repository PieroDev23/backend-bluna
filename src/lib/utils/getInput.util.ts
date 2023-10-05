import { Request } from "mssql";

export const createInputsFromEntries = (entries: [string, any][], request: Request) => {
    return entries
        .map(([key, value]) => {
            request.input(key, value);
            return [key, `@${key}`].join("=");
        });
}