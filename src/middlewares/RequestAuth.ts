import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import tokenDetails from '../config/auth';

import AppError from '../errors/AppError';

interface ITokenType {
  iat: number;
  expiresIn: string;
  id: string;
}

export default function requestAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new AppError(`JWT token nao esta sendo enviado`, 401);
  }

  const [, token] = auth.split(' ');

  try {
    const decoded = verify(token, tokenDetails.jwt.secret);

    const { id } = decoded as ITokenType;

    req.user = {
      id: id,
    };

    return next();
  } catch (err) {
    throw new AppError('token JWT invalido!', err.statusCode);
  }
}
