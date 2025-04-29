import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Request } from 'express';

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

export const generateAuthToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

export const getAuthorizationHeader = (req: Request): string | null => {
  if (!req.headers.authorization) {
    return null;
  }

  const auth = req.headers.authorization.split(' ');

  if (auth.length !== 2 || auth[0].toLowerCase() !== 'token') {
    return null;
  }

  return auth[1];
};
