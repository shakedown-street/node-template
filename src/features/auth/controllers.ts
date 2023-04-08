import { Request, Response } from 'express';
import { authenticate } from './authenticate';
import { insertAuthToken, insertUser, selectAuthTokenById, selectUsers } from './queries';
import { userSerializer } from './serializers';

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

  try {
    const user = await insertUser({
      email: req.body.email,
      password: req.body.password1,
    });
    res.send(userSerializer(user));
  } catch (e: any) {
    res.status(400).send({
      message: e.detail,
    });
  }
};

export const tokenAuth = async (req: Request, res: Response) => {
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

  let authToken = await selectAuthTokenById(user.id);

  if (!authToken) {
    authToken = await insertAuthToken(user.id);
  }

  res.send({
    token: authToken.key,
    user: userSerializer(user),
  });
};

export const readMe = async (req: Request, res: Response) => {
  const user = (req as any).user;

  res.send(userSerializer(user));
};

export const readUsers = async (req: Request, res: Response) => {
  const users = await selectUsers();
  res.send(
    users.map((user: any) => {
      return userSerializer(user);
    })
  );
};
