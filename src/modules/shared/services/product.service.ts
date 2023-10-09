import { Product } from "@lib/interfaces/baseDef.interfaces"
import { Builder } from "@lib/utils/queryBuilder.util"
import { ProductRepository } from "@shared/repositories/product.repository";
import { Database } from "src/database"


export class ProductService {

    static async useRepository() {
        const builder = new Builder<Product>();
        const productRepository = new ProductRepository(builder);

        return productRepository;
    }

}