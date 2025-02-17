import { findOneByCategoryId } from '../category/service';
import db from '../database';
import { Users } from '../user/entity';
import { UserType } from '../user/type';
import { Budget } from './entity';
import { BudgetModel, NewBudget } from './type';


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

export async function findOneByUserAndBudgetId(user: UserType, budgetId: number): Promise<BudgetModel> {
  const budgetRow = await db.getRepository(Budget).findOne(
    {
      where:
      {
        user_id: user.id,
        id: budgetId,
      }
    }
  );

  if (!budgetRow) throw new Error('Error fetching a budget');

  const category = await findOneByCategoryId(budgetRow.category_id);

  return {
    id: budgetRow.id,
    year: parseInt(budgetRow.year_month.toString().substring(0, 4)),
    month: parseInt(budgetRow.year_month.toString().substring(4)),
    amount: budgetRow.amount,
    category: category,
  };
}

export async function create(budgetObj: NewBudget): Promise<void> {
  const user = await db.getRepository(Users).findOneBy({ id: budgetObj.userId });
  if (!user) throw new Error('no user found');

  const monthLength = String(budgetObj.month).length;

  const newBudget = new Budget();
  newBudget.year_month = monthLength === 1 ? parseInt(`${budgetObj.year}0${budgetObj.month}`) : parseInt(`${budgetObj.year}${budgetObj.month}`);
  newBudget.amount = budgetObj.amount;
  newBudget.category_id = budgetObj.categoryId;
  newBudget.user_id = budgetObj.userId;
  newBudget.created_at = new Date();
  newBudget.modified_at = new Date();

  await db.getRepository(Budget).insert(newBudget);
}