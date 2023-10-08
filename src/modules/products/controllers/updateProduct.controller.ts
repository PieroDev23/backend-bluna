import { BaseController } from "@lib/http/BaseController.http";
import { ProductService } from "@shared/services/product.service";
import { Request, Response } from "express";


class Controller extends BaseController {

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const product = req.body;
            const productRepository = await ProductService.useRepository();

            await productRepository.update(product);

            this.ok(res, {
                ok: true,
                product,
                msg: 'product succesfully updated'
            });

        } catch (error) {
            this.serverError(res, error);
        }
    }

}


export const updateProductController = async (req: Request, res: Response) => {
    const updateProductController = new Controller();
    updateProductController.execute(req, res);
}