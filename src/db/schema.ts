import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 1024 }).notNull(),
  firstName: varchar('first_name', { length: 64 }),
  lastName: varchar('last_name', { length: 64 }),
  dateJoined: timestamp('date_joined', { withTimezone: true }).notNull().defaultNow(),
});

export const authTokensTable = pgTable('auth_tokens', {
  key: varchar('key', { length: 64 }).primaryKey().notNull().unique(),
  userId: serial('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
