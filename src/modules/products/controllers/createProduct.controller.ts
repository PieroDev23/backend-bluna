import { BaseController } from "@lib/http/BaseController.http";
import { Request, Response } from "express";


class Controller extends BaseController {
    protected response(req: Request, res: Response): Promise<any> {


        throw new Error("Method not implemented.");
    }



}