import { findOneByCategoryId } from '../category/service';
import db from '../database';
import { UserType } from '../user/type';
import { Budget } from './entity';
import { BudgetModel } from './type';


export async function findAllByUser(user: UserType): Promise<BudgetModel[]> {
  const budgetRows = await db.getRepository(Budget).find(
    { where: { user_id: user.id } }
  );

  if (!budgetRows) throw new Error('Error fetching budgets');

  const budgets: BudgetModel[] = [];

  for (const budgetRow of budgetRows){
    const category = await findOneByCategoryId(budgetRow.category_id);

    const budget: BudgetModel = {
      id: budgetRow.id,
      year: parseInt(budgetRow.year_month.toString().substring(0, 4)),
      month: parseInt(budgetRow.year_month.toString().substring(4)),
      amount: budgetRow.amount,
      category: category,
    };

    budgets.push(budget);
  }

  return budgets;
}