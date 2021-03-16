import express from 'express';
import routes from './routes';
import 'reflect-metadata';

import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3001, () => {
  console.log('::This Application is Running on port :: 3001');
});
