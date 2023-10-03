import { Request, Response } from "express";
import { BaseController } from "@lib/http/BaseController.http";
import { UserRepository } from "@shared/repositories/user.repository";
import bcrypt from 'bcryptjs';
import { genJWT } from "src/helpers/genJWT.helper";

class Controller extends BaseController {
    protected async response(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;

        try {
            const dbUser = await UserRepository.findOneBy({ email });

            if (!dbUser) {
                this.badRequest(res, { ok: false, msg: 'account does not exist.' });
                return
            }

            const validPassword = bcrypt.compareSync(password, dbUser.password);

            if (!validPassword) {
                this.badRequest(res, { ok: false, msg: 'account does not exist.' });
                return
            }

            const token = genJWT(email);

            this.ok(res, {
                ok: true,
                ...dbUser,
                token
            });

        } catch (error) {
            this.serverError(res, error);
        }
    }
}

export const loginController = (req: Request, res: Response) => {
    const loginController = new Controller();
    loginController.execute(req, res);
}