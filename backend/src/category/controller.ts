import { NextFunction, Request, Response } from 'express';
import * as userService from '../user/service';
import * as service from './service';
import { CategoryUpdate } from './type';

class CategoryController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.query.userId;
      if (!userId) throw new Error('user id not defined');

      const user = await userService.findOneById(parseInt(userId.toString()));
      const categories = await service.findAllByUserId(user);
      res.json(categories);

    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categoryId = req.params.categoryId;
      if (!categoryId) throw new Error('category id not defined');

      const categoryToUpdate: CategoryUpdate = req.body;
      if (!categoryToUpdate) throw new Error('req body not found');

      const category = await service.getOneByCategoryIdAndUserId(parseInt(categoryId.toString()), categoryToUpdate.userId);
      await service.update(category.id, categoryToUpdate);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    res.send('from category post controller');
  }
}

export default new CategoryController();