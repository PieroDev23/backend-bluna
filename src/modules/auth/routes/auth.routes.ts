import { Router } from "express";
import { authValidator } from "@auth/middlewares/authValidator.middleware";
import { registerController } from "@auth/controllers/register.controller";
import { loginController } from "@auth/controllers/login.controller";

export const authRouter = Router();

authRouter.post('/register', authValidator, registerController);
authRouter.post('/login', authValidator, loginController);