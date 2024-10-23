import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import db, { initDb } from './database';
import { Category } from './category/entity';

await initDb();

const app = express();

console.log(await db.getRepository(Category).find());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(process.env.PORT, () => console.log('server running on: ' + process.env.PORT));