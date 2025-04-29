import express from 'express';
import { getAuthUser, login, signup } from './controllers';
import { requireAuth } from './middleware';

export const authRouter = () => {
  const router = express.Router();

  router.post('/login', login);
  router.post('/signup', signup);
  router.get('/user', requireAuth, getAuthUser);

  return router;
};
