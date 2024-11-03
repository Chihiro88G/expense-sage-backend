import { NextFunction, Request, Response } from 'express';
import * as userService from '../user/service';
import * as service from './service';

class CategoryController {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
      const user = await userService.findOneById(1);
      const categories = await service.findAllByUserId(user);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    res.send('from category post controller');
  }
}

export default new CategoryController();