# node-template

This is a template for creating a new node/express project with TypeScript, PostgreSQL, and Drizzle ORM.

## Features

- TypeScript
- Drizzle ORM (PostgreSQL)
- Cors middleware
- User registration and token authentication
- Static file serving

## Quickstart

```bash
bash <(wget -qO- https://raw.githubusercontent.com/shakedown-street/node-template/main/startproject.sh) <project_name>
```

Add your connection string to `.env` file:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/database
```

Run migrations:

```bash
npx drizzle-kit push
```

Start express server:

```bash
npm start
```
