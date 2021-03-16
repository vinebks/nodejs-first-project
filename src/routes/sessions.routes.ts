import { Router } from 'express';

import AuthSessionsService from '../service/AuthSessionsService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const authService = new AuthSessionsService();

  try {
    const { email, password } = req.body;

    const { token, user } = await authService.execute({ email, password });

    delete user.password;

    return res.json({ token, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
