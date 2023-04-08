import express from 'express';
import { readUsers, readMe, tokenAuth, signup } from './controllers';
import { requireAuth } from './middleware';

export const authRouter = () => {
  const router = express.Router();

  router.get('/user', requireAuth, readMe);
  router.get('/users', requireAuth, readUsers);
  router.post('/login', tokenAuth);
  router.post('/signup', signup);

  return router;
};
