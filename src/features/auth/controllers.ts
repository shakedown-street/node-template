import { Request, Response } from 'express';
import { authenticate } from './authenticate';
import { createAuthToken, createUser, getTokenByUserId, getUsers } from './queries';
import { toUserNode } from './types';

export const signup = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Username and password required',
    });
    return;
  }

  try {
    const user = await createUser(req.body);
    res.send(toUserNode(user));
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

  let authToken = await getTokenByUserId(user.id);

  if (!authToken) {
    authToken = await createAuthToken(user.id);
  }

  res.send({
    authToken: (authToken as any).key,
    user: toUserNode(user),
  });
};

export const me = async (req: Request, res: Response) => {
  const user = (req as any).user;

  res.send(toUserNode(user));
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(
    users.map((user: any) => {
      return toUserNode(user);
    })
  );
};
