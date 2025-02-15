import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 60000, // 60秒
  idleTimeoutMillis: 60000,
  max: 20,
  retryDelay: 1000, // 1秒
});

export const db = drizzle(pool, {
  schema,
  logger: false,
});
