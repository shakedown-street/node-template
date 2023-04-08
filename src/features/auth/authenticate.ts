import { selectUserByEmail } from './queries';
import { comparePassword } from './utils';

export const authenticate = async (email: string, password: string) => {
  const user = await selectUserByEmail(email);

  if (!user) {
    return null;
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    return null;
  }

  return user;
};
