import { processError } from "@lib/helpers/processError.helper";
import { BaseValidator } from "@lib/http/BaseValidator.http";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "src/helpers/verifyJWT.helper";

class Validator extends BaseValidator {
    protected async process(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            this.check(req.headers)
                .hasProperty('x-bluna-token');

            if (this.errors.length > 0) {
                return res.status(403).json({
                    ok: false,
                    errors: this.errors
                });
            }

            await verifyJWT(String(req.headers['x-bluna-token']));

            next();

        } catch (error) {
            const { message } = processError(error);

            console.log('[token validator] ', message);
            res.status(500).json({ error: '[token validator] something went wrong' })
        }

    }
}


export const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    const tokenValidator = new Validator();
    tokenValidator.validate(req, res, next);
}