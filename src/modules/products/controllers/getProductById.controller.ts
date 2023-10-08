import { BaseController } from "@lib/http/BaseController.http";
import { ProductService } from "@shared/services/product.service";
import { Request, Response } from "express";

class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const id = Number(req.query['id']);
            const productRepository = await ProductService.useRepository();
            const product = await productRepository.findOneBy({ product_id: id });

            if (!product) {
                return this.json(res, 404,
                    {
                        ok: false, msg: 'product not founded'
                    });
            }

            this.ok(res, {
                ok: true,
                product
            });

        } catch (error) {
            this.serverError(res, error);
        }
    }
}



export const getProductByIdController = async (req: Request, res: Response) => {
    const getProductByIdController = new Controller();
    getProductByIdController.execute(req, res);
}
