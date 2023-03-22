import express from 'express';
import { me, tokenAuth, signup } from './controllers';

export const authRouter = () => {
  const router = express.Router();

  router.get('/', me);
  router.post('/login', tokenAuth);
  router.post('/signup', signup);

  return router;
};
