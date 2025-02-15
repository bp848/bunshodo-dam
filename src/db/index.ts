import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const config = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 120000, // 2分
  idleTimeoutMillis: 120000,
  max: 20,
  retryDelay: 1000, // 1秒
  keepalive: true,
  keepaliveInitialDelayMillis: 10000,
  ssl: {
    rejectUnauthorized: false
  }
};

console.log('Database config:', {
  ...config,
  connectionString: config.connectionString?.replace(/:[^:@]+@/, ':***@')
});

export const pool = new Pool(config);

export const db = drizzle(pool, {
  schema,
  logger: false,
});
