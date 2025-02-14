import { NextFunction, Request, Response } from 'express';
import Controller from '../controller';
import * as service from './service';
import * as userService from '../user/service';

class BudgetController extends Controller {
  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserIdInRequest(req);
      const user = await userService.findOneById(userId);
      const budgets = await service.findAllByUser(user);

      res.status(200).json(budgets);

    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const budgetId = this.getBudgetIdInRequest(req);
      const userId = this.getUserIdInRequest(req);
      const user = await userService.findOneById(userId);
      const budget = await service.findOneByUserAndBudgetId(user, budgetId);

      res.status(200).json(budget);

    } catch (error) {
      next(error);
    }
  };
}

export default new BudgetController();