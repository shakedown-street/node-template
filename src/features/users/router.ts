import express from 'express';
import { requireAuth } from '../auth/middleware';
import { getAllUsers } from './controllers';

export const usersRouter = () => {
  const router = express.Router();

  router.get('', requireAuth, getAllUsers);

  return router;
};
