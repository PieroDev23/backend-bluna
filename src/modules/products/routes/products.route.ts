import { createProductController } from "@products/controllers/createProduct.controller";
import { deleteProductController } from "@products/controllers/deleteProduct.controller";
import { getProductsController } from "@products/controllers/getProducts.controller";
import { hasIdValidator } from "@products/middlewares/hasIdValidator.middleware";
import { productsValidator } from "@products/middlewares/productsValidator.middleware";
import { tokenValidator } from "@shared/middlewares/tokenValidator.middleware";
import { Router } from "express";


export const productsRouter = Router();

productsRouter.get('/getAll', tokenValidator, getProductsController);
productsRouter.post('/new-product', [tokenValidator, productsValidator], createProductController);
productsRouter.delete('/delete-product/:id', [tokenValidator, hasIdValidator], deleteProductController);