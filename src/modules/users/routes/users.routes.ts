import { tokenValidator } from '@shared/middlewares/tokenValidator.middleware';
import { Router } from 'express';
import { getUsersController } from '../controllers/getUsers.controller';
import { updateUserController } from '../controllers/updateUser.controller';

export const usersRouter = Router();


usersRouter.get('/get-all', tokenValidator, getUsersController);
usersRouter.put('/update-user', tokenValidator, updateUserController);