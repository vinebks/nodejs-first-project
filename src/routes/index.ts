import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';

import RequestAuth from '../middlewares/RequestAuth';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use(RequestAuth);
routes.use('/appointments', appointmentsRouter);
routes.use('/user', userRouter);

export default routes;
