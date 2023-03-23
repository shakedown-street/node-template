import { Client } from 'pg';

const client = new Client({
  user: 'pork',
  password: 'pork',
  host: 'localhost',
  database: 'node_ts_api',
  port: 5433,
});

const createUpdatedAtTrigger = async () => {
  await client.query(`
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);
};

const assignTriggerToTable = async (tableName: string) => {
  await client.query(
    `
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON $1
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `,
    [tableName]
  );
};

const createUsersTable = async () => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      date_joined TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  console.log('users table created');
};

const createAuthTokensTable = async () => {
  await client.query(`CREATE TABLE IF NOT EXISTS authtokens (
    key VARCHAR(48) PRIMARY KEY UNIQUE NOT NULL,
    user_id INTEGER UNIQUE REFERENCES users(id) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`);
  console.log('authtokens table created');
};

(async () => {
  await client.connect();
  await createUpdatedAtTrigger();
  await createUsersTable();
  await createAuthTokensTable();
  await client.end();
})();
