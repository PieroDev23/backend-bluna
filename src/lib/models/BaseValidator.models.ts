import { NextFunction, Request, Response } from "express";

export type ValidationError = {
    msg: string;
    field?: string;
}

export abstract class BaseValidator {

    errors: ValidationError[] = [];
    private payload: Record<string, any>;

    protected abstract process(req: Request, res: Response, next: NextFunction): Promise<any>

    validate(req: Request, res: Response, next: NextFunction) {
        try {
            this.process(req, res, next);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    ok: false,
                    msg: error.message
                });

                console.log(error.message);
            }
        }
    }

    protected check(payload: Record<string, any>) {
        this.payload = payload;

        return this;
    }

    protected hasProperty(prop: string) {
        if (!this.payload[prop]) this.errors.push({ msg: `${prop} required`, field: prop })
        return this
    }

    protected hasEmptyFields() {
        for (const prop in this.payload) {
            if (this.payload[prop].length === 0) {
                this.errors.push({
                    msg: `${prop} is empty`,
                    field: prop,
                });
            }
        }

        return this;
    }

    protected hasValidEmail() {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!emailRegex.test(this.payload['email'])) {
            this.errors.push({
                msg: 'Invalid format email',
                field: 'email'
            });
        }

        return this;
    }


}