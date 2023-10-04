import { BaseController } from "@lib/http/BaseController.http";
import { Product } from "@lib/interfaces/baseDef.interfaces";
import { ProductRepository } from "@shared/repositories/product.repository";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const product: Product = req.body;
            await ProductRepository.create(product);

            this.ok(res, {
                ok: true,
                msg: 'product created succesfully'
            });

        } catch (error) {
            this.serverError(res, error);
        }

    }
}


export const createProductController = async (req: Request, res: Response) => {
    const createProductController = new Controller();

    createProductController.execute(req, res);
}