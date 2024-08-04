import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './index.js';

async function main() {
  try {
    console.log('[migrate] Running migrations...');

    await migrate(db, {
      migrationsFolder: 'migrations',
    });

    console.log('[migrate] All migrations have been ran, exiting...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
