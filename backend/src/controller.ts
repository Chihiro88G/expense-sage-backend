import { Request } from 'express';

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
}