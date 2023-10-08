import { BaseController } from "@lib/models/BaseController.model";
import { Product } from "@lib/interfaces/baseDef.interfaces";
import { ProductService } from "@shared/services/product.service";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const product: Product = req.body;
            const productRepository = await ProductService.useRepository();
            await productRepository.create(product);

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