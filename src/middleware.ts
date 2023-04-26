import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { authMiddleware } from './features/auth/middleware';

export const middleware = (app: express.Express) => {
  app.use(cors());

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(authMiddleware);
};
