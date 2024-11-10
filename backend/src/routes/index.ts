import { Router } from 'express';
import category from '../category/controller';

export const routes = Router();

// category
routes.get('/category', category.get);
routes.post('/category', category.post);
routes.patch('/category/:categoryId', category.patch);
// routes.delete('/category/:categoryId', category.delete);