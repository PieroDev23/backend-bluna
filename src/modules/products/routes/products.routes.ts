import { createProductController } from "@products/controllers/createProduct.controller";
import { deleteProductController } from "@products/controllers/deleteProduct.controller";
import { getProductByIdController } from "@products/controllers/getProductById.controller";
import { getProductsController } from "@products/controllers/getProducts.controller";
import { updateProductController } from "@products/controllers/updateProduct.controller";
import { hasIdValidator } from "@shared/middlewares/hasIdValidator.middleware";
import { productsValidator } from "@products/middlewares/productsValidator.middleware";
import { tokenValidator } from "@shared/middlewares/tokenValidator.middleware";
import { Router } from "express";


export const productsRouter = Router();

productsRouter.get('/get-all', tokenValidator, getProductsController);
productsRouter.get('/get-product/:id', [tokenValidator, hasIdValidator], getProductByIdController)
productsRouter.post('/new-product', [tokenValidator, productsValidator], createProductController);
productsRouter.put('/update-product', [tokenValidator, productsValidator], updateProductController);
productsRouter.delete('/delete-product/:id', [tokenValidator, hasIdValidator], deleteProductController);