import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
dotenv.config({ path: resolve(process.cwd(), '.env') });

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { sql } from 'drizzle-orm';
import { db, pool } from './index';

async function main() {
  console.log('🚀    MIGRATION STARTED\n');
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@')
  });

  // Set session timeout
  await db.execute(sql`SET statement_timeout = 300000`);
  await db.execute(sql`SET idle_in_transaction_session_timeout = 300000`);
  await migrate(db, { migrationsFolder: 'src/db/migrations' });
  console.log('✅    MIGRATION COMPLETED\n');
  console.log('🌱    Closing DB connection...\n');
  await pool.end();
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('👋    Closing process...\n');
    process.exit(0);
  });
