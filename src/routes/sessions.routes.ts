import { Router } from 'express';

import AuthSessionsService from '../service/AuthSessionsService';
import AppError from '../errors/AppError';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const authService = new AuthSessionsService();

  const { email, password } = req.body;

  const { token, user } = await authService.execute({ email, password });

  delete user.password;

  return res.json({ token, user });
});

export default sessionsRouter;
