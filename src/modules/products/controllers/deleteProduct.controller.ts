import { BaseController } from "@lib/http/BaseController.http";
import { ProductService } from "@shared/services/product.service";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const productRepository = await ProductService.useRepository();
            await productRepository.delete(Number(id));

            res.status(200).json({
                ok: true,
                msg: 'product removed'
            });

        } catch (error) {
            this.serverError(res, error);
        }
    }
}


export const deleteProductController = async (req: Request, res: Response) => {
    const controller = new Controller();

    controller.execute(req, res);
}