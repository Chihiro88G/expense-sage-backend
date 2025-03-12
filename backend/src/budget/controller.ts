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
      const budget = await service.findOneByUserIdAndBudgetId(user.id, budgetId);

      res.status(200).json(budget);

    } catch (error) {
      next(error);
    }
  };

  post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newBudget = this.getBudgetInRequest(req);
      const userId = this.getUserIdInRequest(req);

      const user = await userService.findOneById(userId);

      await service.create(newBudget, user.id);
      res.status(200).send();

    } catch (error) {
      next(error);
    }
  };

  patch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const budgetId = this.getBudgetIdInRequest(req);
      const budgetObj = this.getUpdatedBudget(req);
      const userId = this.getUserIdInRequest(req);

      const user = await userService.findOneById(userId);

      await service.update(budgetId, budgetObj, user.id);
      res.status(200).send();

    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const budgetId = this.getBudgetIdInRequest(req);
      const userId = this.getUserIdInRequest(req);

      const user = await userService.findOneById(userId);

      await service.remove(budgetId, user.id);
      res.status(200).send();

    } catch (error) {
      next(error);
    }
  };
}

export default new BudgetController();