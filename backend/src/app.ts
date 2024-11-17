import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import { initDb } from './database';
import { routes } from './routes';

await initDb();

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log('server running on: ' + process.env.PORT);
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({ errors: [{ message: err.message || 'Internal Server Error 500' }] });
});