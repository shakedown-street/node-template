import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../db';
import { authTokensTable, usersTable } from '../../db/schema';
import { authenticate } from './authenticate';
import { generateAuthToken, hashPassword } from './utils';

export const login = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'Email and password required',
    });
    return;
  }

  const user = await authenticate(req.body.email, req.body.password);

  if (!user) {
    res.status(400).send({
      message: 'Invalid email or password',
    });
    return;
  }

  let authToken = await db
    .select()
    .from(authTokensTable)
    .where(eq(authTokensTable.userId, user.id))
    .then((rows) => rows[0]);

  if (!authToken) {
    authToken = await db
      .insert(authTokensTable)
      .values({
        key: generateAuthToken(),
        userId: user.id,
      })
      .returning()
      .then((rows) => rows[0]);
  }

  res.send({
    token: authToken.key,
    user,
  });
};

export const signup = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password1 || !req.body.password2) {
    res.status(400).send({
      message: 'Email and password required',
    });
    return;
  }

  if (req.body.email.length < 3) {
    res.status(400).send({
      message: 'Email must be at least 3 characters',
    });
    return;
  }

  if (req.body.password1.length < 8) {
    res.status(400).send({
      message: 'Password must be at least 8 characters',
    });
    return;
  }

  if (req.body.password1 !== req.body.password2) {
    res.status(400).send({
      message: 'Passwords do not match',
    });
    return;
  }

  const hashedPassword = await hashPassword(req.body.password1);

  const user = await db
    .insert(usersTable)
    .values({
      email: req.body.email,
      password: hashedPassword,
    })
    .returning()
    .then((rows) => rows[0]);

  res.send(user);
};

export const getRequestUser = async (req: Request, res: Response) => {
  const user = (req as any).user;

  res.send(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await db.select().from(usersTable);

  res.send(users);
};
