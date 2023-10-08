import { BaseController } from "@lib/models/BaseController.model";
import { ProductService } from "@shared/services/product.service";
import { Request, Response } from "express";


class Controller extends BaseController {

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const productRepository = await ProductService.useRepository();
            const products = await productRepository.getAll();

            this.ok(res, { ok: true, products });
        } catch (error) {
            this.serverError(res, error);
        }
    }
}


export const getProductsController = async (req: Request, res: Response) => {
    const getProductsController = new Controller();
    getProductsController.execute(req, res);
}

