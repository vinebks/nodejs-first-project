import { getRepository } from 'typeorm';
import UserModel from '../models/UserModel';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface IUpdateAvatar {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFileName,
  }: IUpdateAvatar): Promise<UserModel> {
    const userRepository = getRepository(UserModel);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Usuario invalido !');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
