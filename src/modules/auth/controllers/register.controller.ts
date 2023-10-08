import { Request, Response } from "express";
import { BaseController } from "@lib/models/BaseController.model";
import { User } from "@lib/interfaces/baseDef.interfaces";
import bcrypt from 'bcryptjs';
import { genJWT } from "src/helpers/genJWT.helper";
import { UserService } from "@shared/services/user.service";

class Controller extends BaseController {

    protected async response(req: Request, res: Response): Promise<any> {
        const { email, password, ...rest } = req.body satisfies User;

        try {
            const userRepository = await UserService.useRepository();
            const dbUser = await userRepository.findOneBy({ email });

            if (dbUser) {
                this.badRequest(res, {
                    ok: false,
                    msg: 'this account already exist.'
                });

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

            await userRepository.create(newUser);
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