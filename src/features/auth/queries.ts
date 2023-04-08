import { query } from '../../db';
import { generateAuthToken, hashPassword } from './utils';

export interface InsertUser {
  email: string;
  password: string;
}

export const insertUser = async (createUser: InsertUser) => {
  const hashedPassword = await hashPassword(createUser.password);

  const user = await query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [
    createUser.email,
    hashedPassword,
  ]);

  return user.rows[0];
};

export const selectUsers = async () => {
  const users = await query('SELECT * FROM users');
  return users.rows;
};

export const selectUserById = async (id: number) => {
  const user = await query('SELECT * FROM users WHERE id = $1', [id]);
  return user.rows[0];
};

export const selectUserByEmail = async (email: string) => {
  const user = await query('SELECT * FROM users WHERE email = $1', [email]);
  return user.rows[0];
};

export const selectUserByAuthToken = async (token: string) => {
  const user = await query(
    'SELECT users.* FROM users INNER JOIN auth_tokens ON users.id = auth_tokens.user_id WHERE auth_tokens.key = $1',
    [token]
  );
  return user.rows[0];
};

export const insertAuthToken = async (userId: any) => {
  const token = await query('INSERT INTO auth_tokens (key, user_id) VALUES ($1, $2) RETURNING *', [
    generateAuthToken(),
    userId,
  ]);
  return token.rows[0];
};

export const selectAuthTokenById = async (userId: number) => {
  const token = await query('SELECT * FROM auth_tokens WHERE user_id = $1', [userId]);
  return token.rows[0];
};
