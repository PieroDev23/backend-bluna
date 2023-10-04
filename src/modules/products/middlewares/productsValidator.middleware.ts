import { processError } from "@lib/helpers/processError.helper";
import { BaseValidator } from "@lib/http/BaseValidator.http";
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
            console.log('[VALIDATOR ERROR] PRODUCT VALIDATOR', message)
        }
    }
}


export const productsValidator = async (req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator();

    validator.validate(req, res, next);
}