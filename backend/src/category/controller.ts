import { NextFunction, Request, Response } from 'express';
import Controller from '../controller';
import * as userService from '../user/service';
import * as service from './service';

class CategoryController extends Controller {
  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserIdInRequest(req);
      const user = await userService.findOneById(userId);
      const categories = await service.findAllByUser(user);

      res.status(200).json(categories);

    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserIdInRequest(req);
      const categoryId = this.getCategoryIdInRequest(req);
      const user = await userService.findOneById(userId);

      const defaultCategory = await service.findDefaultCategoryByCategoryId(categoryId);
      if (defaultCategory) {
        res.status(200).json(defaultCategory);
        return;
      }

      const userDefinedCategory = await service.findUserDefinedCategoryByCategoryIdAndUserId(categoryId, user.id);

      res.status(200).json(userDefinedCategory);

    } catch (error) {
      next(error);
    }
  };

  patch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserIdInRequest(req);
      const categoryId = this.getCategoryIdInRequest(req);
      const categoryName = this.getCategoryNameInRequest(req);

      const category = await service.findUserDefinedCategoryByCategoryIdAndUserId(categoryId, userId);
      await service.update(category.id, categoryName);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  };

  post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserIdInRequest(req);
      const categoryName = this.getCategoryNameInRequest(req);

      await service.create(userId, categoryName);
      res.status(200).send();

    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserIdInRequest(req);
      const categoryId = this.getCategoryIdInRequest(req);
      const user = await userService.findOneById(userId);

      await service.remove(categoryId, user.id);

      res.status(200).send();

    } catch (error) {
      next(error);
    }
  };
}

export default new CategoryController();