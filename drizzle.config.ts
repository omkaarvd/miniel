import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

if (!process.env.DATABASE_URL) {
  throw new Error('🥲 Database credentials missing!');
}

export default defineConfig({
  schema: 'src/db/schema.ts',
  out: 'migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
