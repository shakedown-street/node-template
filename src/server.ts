import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { authRouter } from './features/auth/routes';
import { authMiddleware } from './features/auth/middleware';

// Start express server

const app = express();

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
  console.log('Express listening on http://localhost:3000');
});
