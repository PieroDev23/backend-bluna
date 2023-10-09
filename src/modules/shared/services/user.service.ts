import { User } from "@lib/interfaces/baseDef.interfaces";
import { Builder } from "@lib/utils/queryBuilder.util";
import { UserRepository } from "@shared/repositories/user.repository";
import { Database } from "src/database";


export class UserService {

    static async useRepository() {
        const builder = new Builder<User>();
        const userRepository = new UserRepository(builder);

        return userRepository;
    }
}