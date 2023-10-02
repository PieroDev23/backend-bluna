import { Request, Response, NextFunction } from "express";

export function sanatizeBody(req: Request, res: Response, next: NextFunction) {
    const bodyMatrix = Object.entries(req.body);

    const sanatizedBody = bodyMatrix.reduce((prev, matrix: [string, any]) => {
        const [key, rawValue] = matrix;

        const value = typeof rawValue === 'string' && key !== 'role' ?
            rawValue.trim().toLowerCase() :
            rawValue.trim();

        return {
            ...prev,
            [key]: value,
        }
    }, {})

    req.body = sanatizedBody;
    next();
}