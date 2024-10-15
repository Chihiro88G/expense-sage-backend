import express, { Express, Request, Response } from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(process.env.PORT, () => console.log('server running on: ' + process.env.PORT));