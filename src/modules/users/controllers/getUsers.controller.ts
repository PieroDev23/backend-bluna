import { BaseController } from "@lib/models/BaseController.model";
import { UserService } from "@shared/services/user.service";
import { Request, Response } from "express";

class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const userRepository = await UserService.useRepository();
            const users = await userRepository.getAll();

            this.ok(res, {
                ok: true,
                users
            });

        } catch (error) {
            this.serverError(res, {
                ok: false,
                msg: error
            })
        }
    }
}

export const getUsersController = async (req: Request, res: Response) => {
    const getUsersController = new Controller();
    getUsersController.execute(req, res);
}


