import { Router } from 'express';
import category from '../category/controller';
import budget from '../budget/controller';

export const routes = Router();

// category
routes.get('/user/:userId/category', category.get);
routes.get('/user/:userId/category/:categoryId', category.getOne);
routes.post('/user/:userId/category', category.post);
routes.patch('/user/:userId/category/:categoryId', category.patch);
routes.delete('/user/:userId/category/:categoryId', category.delete);

// budget
routes.get('/user/:userId/budget', budget.get);