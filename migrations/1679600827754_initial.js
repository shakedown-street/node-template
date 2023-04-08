/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);
  pgm.createTable('users', {
    id: 'id',
    email: {
      type: 'VARCHAR(256)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'VARCHAR(1024)',
      notNull: true,
    },
    first_name: {
      type: 'VARCHAR(64)',
    },
    last_name: {
      type: 'VARCHAR(64)',
    },
    date_joined: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });
  pgm.createTable('auth_tokens', {
    key: {
      type: 'VARCHAR(64)',
      primaryKey: true,
      unique: true,
      notNull: true,
    },
    user_id: {
      type: 'INTEGER',
      unique: true,
      references: 'users(id)',
      notNull: true,
      onDelete: 'cascade',
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });
};

exports.down = (pgm) => {
  pgm.sql(`DROP FUNCTION IF EXISTS trigger_set_timestamp()`);
  pgm.dropTable('users', {
    cascade: true,
  });
  pgm.dropTable('auth_tokens');
};
