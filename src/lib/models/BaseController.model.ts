import { processError } from "@lib/helpers/processError.helper";
import { Response, Request } from "express";

export abstract class BaseController {

    protected abstract response(req: Request, res: Response): Promise<void | any>

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            this.response(req, res);
        } catch (error) {
            console.log('[BASE CONTROLLER] Uncaught controller error');
            console.log(error);
            this.serverError(res, error)
        }
    }

    protected json(res: Response, code: number, message: unknown) {
        res.status(code).json(message);
    }

    protected ok<T>(res: Response, payload: T) {
        this.json(res, 200, payload);
    }

    protected created(res: Response, payload?: unknown) {
        this.json(res, 201, !payload ? { msg: 'created succesfully' } : payload);
    }

    protected badRequest(res: Response, payload?: unknown) {
        this.json(res, 400, !payload ? { msg: 'bad request' } : payload);
    }

    protected unauthorized(res: Response, payload?: unknown) {
        this.json(res, 401, !payload ? { msg: 'bad request' } : payload);
    }

    protected serverError(res: Response, error: unknown) {
        const { message } = processError(error);
        console.error('[SERVER ERROR]', error)
        this.json(res, 500, { msg: 'internal server error', error: message });
    }
}