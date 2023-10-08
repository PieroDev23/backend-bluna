import { createRequestContoller } from '@requests/controllers/createRequest.controller';
import { getRequestsController } from '@requests/controllers/getRequests.controller';
import { handleRequestController } from '@requests/controllers/handleRequest.controller';
import { requestValidator } from '@requests/middlewares/requestValidator.middleware';
import { tokenValidator } from '@shared/middlewares/tokenValidator.middleware';
import { Router } from 'express';


export const requestRouter = Router();

requestRouter.get('/get-all', tokenValidator, getRequestsController);
requestRouter.post('/handle-request', [tokenValidator, requestValidator], handleRequestController);
requestRouter.post('/create-request', [tokenValidator, requestValidator], createRequestContoller);