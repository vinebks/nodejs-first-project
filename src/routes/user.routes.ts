import { Router } from 'express';
import { getRepository } from 'typeorm';

import UserModel from '../models/UserModel';
import CreateUserService from '../service/UserService';

const userRouter = Router();

userRouter.get('/', async (_req, res) => {
  const userRepository = getRepository(UserModel);
  const allUsers = await userRepository.find();
  return res.json(allUsers);
});

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userService = new CreateUserService();

    const user = await userService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

export default userRouter;
