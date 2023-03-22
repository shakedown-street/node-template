import { query } from '../../db';
import { generateAuthToken, hashPassword } from './utils';

export interface ICreateUser {
  username: string;
  password: string;
}

export const createUser = async (createUser: ICreateUser) => {
  const hashedPassword = await hashPassword(createUser.password);

  const user = await query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [
    createUser.username,
    hashedPassword,
  ]);

  return user.rows[0];
};

export const getUserByUsername = async (username: string) => {
  const user = await query('SELECT * FROM users WHERE username = $1', [username]);
  return user.rows[0];
};

export const getUserByAuthToken = async (token: string) => {
  const user = await query(
    'SELECT users.* FROM users INNER JOIN authtokens ON users.id = authtokens.user_id WHERE authtokens.key = $1',
    [token]
  );
  return user.rows[0];
};

export const getTokenByUserId = async (userId: number) => {
  const token = await query('SELECT * FROM authtokens WHERE user_id = $1', [userId]);
  return token.rows[0];
};

export const createAuthToken = async (user: any) => {
  const token = await query('INSERT INTO authtokens (key, user_id) VALUES ($1, $2) RETURNING *', [
    generateAuthToken(),
    user.id,
  ]);
  return token.rows[0];
};
