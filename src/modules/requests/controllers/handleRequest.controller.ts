import { BaseController } from "@lib/models/BaseController.model";
import { RequestsService } from "@shared/services/requests.service";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const { status, request_id } = req.body;
            const requestsRepository = await RequestsService.useRepository();
            await requestsRepository.update({ status, request_id });

            this.ok(res, { ok: true, msg: 'satatus updated' });
        } catch (error) {
            this.serverError(res, error);
        }
    }
}





export const handleRequestController = async (req: Request, res: Response) => {
    const handleRequestController = new Controller();
    handleRequestController.execute(req, res);
}