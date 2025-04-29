import express from 'express';
import path from 'path';
import { authRouter } from './features/auth/routes';
import { STATIC_DIR, STATIC_URL, TEMPLATE_DIR } from './settings';

const getTemplate = (...paths: string[]) => {
  return path.join(TEMPLATE_DIR, ...paths);
};

export const router = (app: express.Express) => {
  const router = express.Router();

  router.use(STATIC_URL, express.static(STATIC_DIR));
  router.use('/api/auth', authRouter());

  app.use('/', router);
};
