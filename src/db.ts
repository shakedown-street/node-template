import { Pool } from 'pg';
import { DATABASE } from './settings';

export const pool = new Pool({
  user: DATABASE.user,
  password: DATABASE.password,
  database: DATABASE.name,
  host: DATABASE.host,
  port: DATABASE.port,
});

export const query = async (text: string, params: any[] = []) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, params, duration, rows: result.rowCount });
  return result;
};
