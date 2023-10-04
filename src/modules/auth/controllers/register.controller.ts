import { Request, Response } from "express";
import { BaseController } from "@lib/http/BaseController.http";
import { User } from "@lib/interfaces/baseDef.interfaces";
import { UserRepository } from "@shared/repositories/user.repository";
import bcrypt from 'bcryptjs';
import { genJWT } from "src/helpers/genJWT.helper";

class Controller extends BaseController {

    protected async response(req: Request, res: Response): Promise<any> {
        const { email, password, ...rest } = req.body satisfies User;

        try {
            const dbUser = await UserRepository.findOneBy({ email });

            if (dbUser) {
                this.badRequest(res, { ok: false, msg: 'this account already exist.' });
                return
            }

            const salt = bcrypt.genSaltSync(11);
            const passwordHashed = bcrypt.hashSync(password, salt);

            const token = genJWT(email);

            const newUser = {
                email,
                password: passwordHashed,
                ...rest
            };

            await UserRepository.create(newUser);
            this.ok(res, { ...newUser, token });
        } catch (error) {
            this.serverError(res, error);
        }
    }
}

export const registerController = (req: Request, res: Response) => {
    const registerController = new Controller();

    registerController.execute(req, res);
}