import { NextFunction, Request, Response } from 'express';
import * as userService from '../user/service';
import * as service from './service';

class CategoryController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.userId;
      if (!userId) throw new Error('user id not defined');

      const user = await userService.findOneById(parseInt(userId.toString()));
      const categories = await service.findAllByUser(user);
      res.json(categories);
      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }

  // async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const categoryId = req.params.categoryId;
  //     if (!categoryId) throw new Error('category id not defined');


  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { categoryId, userId } = req.params;
      if (!categoryId || !userId) throw new Error('category or user id not defined');

      const categoryName = req.body.categoryName;
      if (!categoryName) throw new Error('category name not specified');

      const category = await service.findOneByCategoryIdAndUserId(parseInt(categoryId), parseInt(userId));
      await service.update(category.id, categoryName);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.userId;
      if (!userId) throw new Error('user id not defined');

      const categoryName = req.body.categoryName;
      if (!categoryName) throw new Error('category name not specified');

      await service.create(parseInt(userId), categoryName);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { categoryId, userId } = req.params;
      if (!categoryId || !userId) throw new Error('category or user id not defined');

      const user = await userService.findOneById(parseInt(userId));
      if (!user) throw new Error('user not found');

      await service.remove(parseInt(categoryId), user.id);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();