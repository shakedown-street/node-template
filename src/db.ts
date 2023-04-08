import { Pool } from 'pg';

export const pool = new Pool({
  user: 'PROJECT_NAME',
  password: 'PROJECT_NAME',
  database: 'PROJECT_NAME',
  host: 'localhost',
  port: 5433,
});

export const query = async (text: string, params: any[] = []) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, params, duration, rows: result.rowCount });
  return result;
};
