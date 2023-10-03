import { BaseController } from "@lib/http/BaseController.http";
import { ProductRepository } from "@shared/repositories/product.repository";
import { Request, Response } from "express";


class Controller extends BaseController {

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const products = await ProductRepository.getAll();
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

