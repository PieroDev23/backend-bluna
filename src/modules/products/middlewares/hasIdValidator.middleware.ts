import { processError } from "@lib/helpers/processError.helper";
import { BaseValidator } from "@lib/http/BaseValidator.http";
import { NextFunction, Request, Response } from "express";



class Validator extends BaseValidator {
    protected async process(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {

            if (!req.query['id']) {
                this.errors.push({ field: '', msg: 'id required' });
            }

            if (this.errors.length > 0) {
                res.status(400).json({
                    ok: false,
                    errors: this.errors
                });
            }

            next();

        } catch (error) {
            const { message } = processError(error);
            console.log(message);
        }
    }
}


export const hasIdValidator = async (req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator();
    validator.validate(req, res, next);
}