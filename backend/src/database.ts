import { DataSource } from 'typeorm';
import 'reflect-metadata';
import 'dotenv/config';

const db = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  cache: true,
  entities: ['src/**/entity.ts'],
  subscribers: [],
  migrations: [],
});

export default db;

export async function initDb() {
  try {
    await db.initialize();
    // await db.runMigrations();
    console.log('data source initialized');
  } catch (err) {
    console.error('error during Data Source initialization', err);
  }
}