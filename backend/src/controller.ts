import { Request } from 'express';
import { NewBudget, UpdateBudget } from './budget/type';

export default class Controller {

  getUserIdInRequest(req: Request): number {
    const userId = req.params.userId;
    if (!userId) throw new Error('user id not defined');
    return parseInt(userId, 10);
  }

  getCategoryIdInRequest(req: Request): number {
    const categoryId = req.params.categoryId;
    if (!categoryId) throw new Error('category id not found');
    return parseInt(categoryId, 10);
  }

  getCategoryNameInRequest(req: Request): string {
    const categoryName = req.body.categoryName;
    if (!categoryName) throw new Error('no category name specified');
    return categoryName;
  }

  getBudgetIdInRequest(req: Request): number {
    const budgetId = req.params.budgetId;
    if (!budgetId) throw new Error('budget id not found');
    return parseInt(budgetId, 10);
  }

  getBudgetInRequest(req: Request): NewBudget {
    const year = req.body.year;
    const month = req.body.month;
    const amount = req.body.amount;
    const categoryId = req.body.categoryId;

    if (!year || !month || !amount || !categoryId) throw new Error('incomplete budget info');

    return {
      year: year,
      month: month,
      amount: amount,
      categoryId: categoryId,
    };
  }

  getUpdatedBudget(req: Request): UpdateBudget {
    const year = req.body.year;
    const month = req.body.month;
    const amount = req.body.amount;

    if (!year || !month || !amount) throw new Error('incomplete budget info to update');

    return {
      year: year,
      month: month,
      amount: amount,
    };
  }
}