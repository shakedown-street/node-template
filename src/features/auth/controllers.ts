import { Request, Response } from 'express';
import { authenticate } from './authenticate';
import { createAuthToken, createUser, getTokenByUserId, getUsers } from './queries';

export const signup = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Username and password required',
    });
    return;
  }

  try {
    const { id, username } = await createUser(req.body);

    res.send({
      id,
      username,
    });
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

  const { id, username } = await authenticate(req.body.username, req.body.password);

  if (!id) {
    res.status(400).send({
      message: 'Invalid username or password',
    });
    return;
  }

  let authToken = await getTokenByUserId(id);

  if (!authToken) {
    authToken = await createAuthToken(id);
  }

  res.send({
    authToken: (authToken as any).key,
    user: {
      id,
      username,
    },
  });
};

export const me = async (req: Request, res: Response) => {
  const { id, username } = (req as any).user;

  res.send({
    id,
    username,
  });
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(
    users.map((user: any) => {
      return {
        id: user.id,
        username: user.username,
      };
    })
  );
};
