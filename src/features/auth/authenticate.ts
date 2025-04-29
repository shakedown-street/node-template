import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { usersTable } from '../../db/schema';
import { comparePassword } from './utils';

export const authenticate = async (email: string, password: string) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .then((rows) => rows[0]);

  if (!user) {
    return null;
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    return null;
  }

  return user;
};
