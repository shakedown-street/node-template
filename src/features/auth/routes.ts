import express from 'express';
import { getAllUsers, getRequestUser, login, signup } from './controllers';
import { requireAuth } from './middleware';

export const authRouter = () => {
  const router = express.Router();

  router.post('/login', login);
  router.post('/signup', signup);
  router.get('/user', requireAuth, getRequestUser);
  router.get('/users', requireAuth, getAllUsers);

  return router;
};
