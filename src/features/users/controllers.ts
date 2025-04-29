import { Request, Response } from 'express';
import { db } from '../../db';
import { usersTable } from '../../db/schema';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await db.select().from(usersTable);

  res.send(users);
};
