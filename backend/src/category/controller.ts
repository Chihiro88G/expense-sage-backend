import { NextFunction, Request, Response } from 'express';
import * as userService from '../user/service';
import * as service from './service';
import { CategoryForm } from './type';

class CategoryController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.query.userId;
      if (!userId) throw new Error('user id not defined');

      const user = await userService.findOneById(parseInt(userId.toString()));
      const categories = await service.findAllByUser(user);
      res.json(categories);
      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoryId = req.params.categoryId;
      if (!categoryId) throw new Error('category id not defined');

      const categoryToUpdate: CategoryForm = req.body;
      if (!categoryToUpdate) throw new Error('req body not found');

      const category = await service.findOneByCategoryIdAndUserId(parseInt(categoryId.toString()), categoryToUpdate.userId);
      await service.update(category.id, categoryToUpdate);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newCategory: CategoryForm = req.body;
      if (!newCategory) throw new Error('req body not found');

      await service.create(newCategory);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (!categoryId) throw new Error('category id not defined');

      const userId = req.query.userId;
      if (!userId) throw new Error('user id not defined');

      const user = await userService.findOneById(parseInt(userId.toString()));
      if (!user) throw new Error('user not found');

      await service.remove(categoryId, parseInt(userId.toString()));

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();