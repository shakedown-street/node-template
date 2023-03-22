import { getUserByUsername } from './queries';
import { comparePassword } from './utils';

export const authenticate = async (username: string, password: string) => {
  const user = await getUserByUsername(username);

  if (!user) {
    return null;
  }

  const match = await comparePassword(password, (user as any).password);

  if (!match) {
    return null;
  }

  return user;
};
