import { getRequestsController } from '@requests/controllers/getRequests.controller';
import { handleRequestController } from '@requests/controllers/handleRequest.controller';
import { hasIdValidator } from '@shared/middlewares/hasIdValidator.middleware';
import { tokenValidator } from '@shared/middlewares/tokenValidator.middleware';
import { Router } from 'express';


export const requestRouter = Router();

requestRouter.get('/get-all', tokenValidator, getRequestsController);
requestRouter.post('/handle-request', tokenValidator, handleRequestController);