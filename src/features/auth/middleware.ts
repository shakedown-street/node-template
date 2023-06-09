import { Request, Response, NextFunction } from 'express';
import { selectUserByAuthToken } from './queries';
import { getAuthorizationHeader } from './utils';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = getAuthorizationHeader(req);

  if (!token) {
    (req as any).user = null;
    next();
    return;
  }

  const user = await selectUserByAuthToken(token);

  if (!user) {
    (req as any).user = null;
    next();
    return;
  }

  (req as any).user = user;
  next();
};

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).user) {
    res.status(401).send({
      message: 'Unauthorized',
    });
    return;
  }
  next();
};
