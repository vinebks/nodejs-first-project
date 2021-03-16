import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import tokenDetails from '../config/auth';

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
    throw new Error(`JWT token nao esta sendo enviado`);
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
    throw new Error('token JWT invalido!');
  }
}
