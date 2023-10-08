import { BaseController } from "@lib/models/BaseController.model";
import { RequestsService } from "@shared/services/requests.service";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const request = req.body;
            const requestRepository = await RequestsService.useRepository();
            await requestRepository.create(request);

            this.ok(res, { ok: true, msg: 'request created succesfully' });

        } catch (error) {
            this.serverError(res, error);
        }
    }
}

export const createRequestContoller = async (req: Request, res: Response) => {
    const createRequestContoller = new Controller();
    createRequestContoller.execute(req, res);
}