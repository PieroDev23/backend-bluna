import { BaseController } from "@lib/http/BaseController.http";
import { ProductRepository } from "@shared/repositories/product.repository";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            await ProductRepository.delete(Number(id));

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