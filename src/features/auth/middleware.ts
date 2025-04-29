import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../db';
import { authTokensTable, usersTable } from '../../db/schema';
import { getAuthorizationHeader } from './utils';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = getAuthorizationHeader(req);

  if (!token) {
    (req as any).user = null;
    next();
    return;
  }

  const user = await db
    .select()
    .from(usersTable)
    .innerJoin(authTokensTable, eq(authTokensTable.userId, usersTable.id))
    .where(eq(authTokensTable.key, token))
    .then((rows) => rows[0].users);

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
