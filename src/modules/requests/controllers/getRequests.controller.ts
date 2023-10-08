import { BaseController } from "@lib/models/BaseController.model";
import { RequestsService } from "@shared/services/requests.service";
import { Request, Response } from "express";

class Controller extends BaseController {
    async response(req: Request, res: Response): Promise<any> {
        try {
            const requestRepository = await RequestsService.useRepository();
            const requests = requestRepository.getAll();

            this.ok(res, { ok: true, requests });
        } catch (error) {
            this.serverError(res, error);
        }
    }
}

export const getRequestsController = async (req: Request, res: Response) => {
    const getRequestController = new Controller();
    getRequestController.execute(req, res);
}


