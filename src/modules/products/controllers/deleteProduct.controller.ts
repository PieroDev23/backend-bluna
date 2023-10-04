import { BaseController } from "@lib/http/BaseController.http";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {

        } catch (error) {
            this.serverError(res, error);
        }
    }
}


export const deleteProductController = async (req: Request, res: Response) => {
    const controller = new Controller();

    controller.execute(req, res);
}