import { IRequest } from '@lib/interfaces/baseDef.interfaces';
import { Builder } from '@lib/utils/queryBuilder.util';
import { RequestsRepository } from '@shared/repositories/requests.repostitory';
import { Database } from "src/database";

export class RequestsService {

    static async useRepository() {
        const builder = new Builder<IRequest>();
        const requestsRepository = new RequestsRepository(builder);

        return requestsRepository;
    }
}