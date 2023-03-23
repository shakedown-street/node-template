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

export const query = async (text: string, params: any[] = []) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, params, duration, rows: result.rowCount });
  return result;
};
