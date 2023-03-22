import express from 'express';
import { listUsers, me, tokenAuth, signup } from './controllers';
import { requireAuth } from './middleware';

export const authRouter = () => {
  const router = express.Router();

  router.get('/', requireAuth, me);
  router.get('/users', requireAuth, listUsers);
  router.post('/login', tokenAuth);
  router.post('/signup', signup);

  return router;
};
