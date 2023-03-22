import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { sync } from './db';
import { authRouter } from './features/auth/routes';
import { authMiddleware } from './features/auth/middleware';

const app = express();

sync();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(authMiddleware);

app.use('/api/auth', authRouter());

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
