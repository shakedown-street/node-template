import { Request, Response, NextFunction } from 'express';
import { getUserByAuthToken } from './queries';
import { getAuthorizationHeader } from './utils';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = getAuthorizationHeader(req);

  if (!token) {
    (req as any).user = null;
    next();
    return;
  }

  const user = await getUserByAuthToken(token);

  if (!user) {
    (req as any).user = null;
    next();
    return;
  }

  (req as any).user = user;
  next();
};
