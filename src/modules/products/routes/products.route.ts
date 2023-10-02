import { getProductsController } from "@products/controllers/getProducts.controller";
import { tokenValidator } from "@shared/middlewares/tokenValidator.middleware";
import { Router } from "express";


export const productsRouter = Router();

productsRouter.get('/getAll', tokenValidator, getProductsController);