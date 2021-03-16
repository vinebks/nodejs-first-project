import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserModel from '../models/UserModel';

interface IUserType {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IUserType): Promise<UserModel> {
    const userRepository = getRepository(UserModel);

    const findUserWithSameEmail = await userRepository.findOne({
      where: { email },
    });

    if (findUserWithSameEmail) {
      throw Error('E-mail escolhido ja está sendo utilizado');
    }

    const encryptPass = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: encryptPass,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
