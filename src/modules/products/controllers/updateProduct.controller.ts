import { IHistory } from "@lib/interfaces/baseDef.interfaces";
import { BaseController } from "@lib/models/BaseController.model";
import { HistoryService } from "@shared/services/history.service";
import { ProductService } from "@shared/services/product.service";
import { Request, Response } from "express";


class Controller extends BaseController {

    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const { product, user } = req.body;

            const productRepository = await ProductService.useRepository();
            const historyRepository = await HistoryService.useRepository();

            const history: IHistory = {
                user_id: user.user_id,
                product_id: product.product_id,
                metada: JSON.stringify({
                    product,
                    user
                })
            }

            await productRepository.update(product);
            await historyRepository.create(history);

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