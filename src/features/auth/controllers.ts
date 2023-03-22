import { Request, Response } from 'express';
import { authenticate } from './authenticate';
import { createAuthToken, createUser, getTokenByUserId } from './queries';

export const signup = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Username and password required',
    });
    return;
  }

  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (e) {
    res.status(400).send({
      message: e,
    });
  }
};

export const tokenAuth = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Username and password required',
    });
    return;
  }

  const user = await authenticate(req.body.username, req.body.password);

  if (!user) {
    res.status(400).send({
      message: 'Invalid username or password',
    });
    return;
  }

  let authToken = await getTokenByUserId((user as any).id);

  if (!authToken) {
    authToken = await createAuthToken(user);
  }

  res.send({
    authToken: (authToken as any).key,
    user: user,
  });
};

export const me = async (req: Request, res: Response) => {
  if (!(req as any).user) {
    res.status(401).send({
      message: 'Unauthorized',
    });
    return;
  }
  res.send((req as any).user);
};
