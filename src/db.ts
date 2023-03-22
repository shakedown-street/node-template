import { Pool } from 'pg';

export const pool = new Pool({
  user: 'pork',
  password: 'pork',
  host: 'localhost',
  database: 'node_ts_api',
  port: 5433,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const sync = async () => {
  await createUsersTable();
  await createAuthTokensTable();
};

export const query = async (text: string, params: any[] = []) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, params, duration, rows: result.rowCount });
  return result;
};

export const createUsersTable = async () => {
  await query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(24) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )`);
};

export const createAuthTokensTable = async () => {
  await query(`CREATE TABLE IF NOT EXISTS authtokens (
    key VARCHAR(48) PRIMARY KEY UNIQUE NOT NULL,
    user_id INTEGER UNIQUE REFERENCES users(id) NOT NULL
  )`);
};
