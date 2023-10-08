import { processError } from "@lib/helpers/processError.helper";
import { BaseValidator } from "@lib/models/BaseValidator.models";
import { Request, Response, NextFunction } from "express";


class Validator extends BaseValidator {
    protected async process(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            this.check(req.body).hasEmptyFields();

            if (this.errors.length > 0) {
                return res.status(400).json({
                    ok: false,
                    errors: this.errors
                });
            }

            next();

        } catch (error) {
            const { message } = processError(error);
            console.log('[VALIDATOR ERROR] REQUEST VALIDATOR', message);
        }

    }
}

export const requestValidator = async (req: Request, res: Response, next: NextFunction) => {
    const requestValidator = new Validator();
    requestValidator.validate(req, res, next);
}