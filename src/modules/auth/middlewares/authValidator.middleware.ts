import { processError } from "@lib/helpers/processError.helper";
import { BaseValidator } from "@lib/models/BaseValidator.models";
import { NextFunction, Request, Response } from "express";

class Validator extends BaseValidator {
    protected async process(req: Request, res: Response, next: NextFunction) {
        try {

            this.check(req.body)
                .hasEmptyFields()
                .hasValidEmail();

            if (this.errors.length > 0) {
                return res.status(400).json({
                    ok: false,
                    errors: this.errors,
                });
            }

            next();

        } catch (error) {
            const { message } = processError(error);
            console.log(message);
        }
    }
}

export const authValidator = (req: Request, res: Response, next: NextFunction) => {
    const authValidator = new Validator();
    authValidator.validate(req, res, next);
}