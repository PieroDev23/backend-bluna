import { BaseController } from "@lib/http/BaseController.http";
import { ProductRepository } from "@shared/repositories/product.repository";
import { Request, Response } from "express";


class Controller extends BaseController {

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const product = req.body;
            const productUpdated = await ProductRepository.update(product);
            this.ok(res, productUpdated);
        } catch (error) {
            this.serverError(res, error);
        }
    }

}


export const updateProductController = async (req: Request, res: Response) => {

    const updateProductController = new Controller();
    updateProductController.execute(req, res);
}