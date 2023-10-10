import { User } from "@lib/interfaces/baseDef.interfaces";
import { BaseController } from "@lib/models/BaseController.model";
import { UserService } from "@shared/services/user.service";
import { Request, Response } from "express";

class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        try {
            const payload: Partial<User> = req.body
            const userRepository = await UserService.useRepository();

            await userRepository.update(payload);
            this.ok(res, { ok: true, msg: 'User succesfully updated' });

        } catch (error) {
            this.serverError(res, {
                ok: false,
                msg: error
            })
        }
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    const updateUserController = new Controller();
    updateUserController.execute(req, res);
}
