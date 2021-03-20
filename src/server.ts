import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import 'reflect-metadata';

import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Erro interno da API !',
    status: 'error',
  });
});

app.listen(3001, () => {
  console.log('::This Application is Running on port :: 3001');
});
