import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/user', userRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
