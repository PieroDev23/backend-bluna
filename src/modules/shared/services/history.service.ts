import { IHistory } from "@lib/interfaces/baseDef.interfaces";
import { Builder } from "@lib/utils/queryBuilder.util";
import { HistoryRepository } from "@shared/repositories/history.repoistory";

export class HistoryService {
    static async useRepository() {
        const builder = new Builder<IHistory>();
        const historyRespository = new HistoryRepository(builder);

        return historyRespository;
    }
}