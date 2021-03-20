import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../service/UserService';
import RequestAuth from '../middlewares/RequestAuth';
import UpdateUserAvatarService from '../service/UpdateUserAvatar';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const userService = new CreateUserService();

  const user = await userService.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return res.json(user);
});

userRouter.patch(
  '/avatar',
  RequestAuth,
  upload.single('avatar'),
  async (req, res) => {
    const { id } = req.user;
    const fileName = req.file.filename;

    const updateUserAvatar = new UpdateUserAvatarService();

    const response = await updateUserAvatar.execute({
      user_id: id,
      avatarFileName: fileName,
    });

    delete response.password;

    return res.json(response);
  },
);

export default userRouter;
