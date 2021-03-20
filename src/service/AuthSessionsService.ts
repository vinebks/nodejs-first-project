import UserModel from '../models/UserModel';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import tokenDetails from '../config/auth';
import AppError from '../errors/AppError';

interface ISession {
  email: string;
  password: string;
}

interface IAuth {
  user: UserModel;
  token: string;
}

class AuthSessionsService {
  public async execute({ email, password }: ISession): Promise<IAuth> {
    const userRepository = getRepository(UserModel);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new AppError(
        `Combinacao incorreta entre Senha/Email, tente novamente!`,
        401,
      );
    }

    const passValidation = await compare(password, user.password);

    if (!passValidation) {
      throw new AppError(
        `Combinacao incorreta entre Senha/Email, tente novamente!`,
        401,
      );
    }

    const token = sign(
      {
        name: user.name,
        id: user.id,
        expiresIn: tokenDetails.jwt.expiresIn,
      },
      tokenDetails.jwt.secret,
    );

    return {
      user,
      token,
    };
  }
}

export default AuthSessionsService;
