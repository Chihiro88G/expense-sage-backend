import { findOneByCategoryId } from '../category/service';
import db from '../database';
import { UserType } from '../user/type';
import { Budget } from './entity';
import { BudgetModel, NewBudget, UpdateBudget } from './type';


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

export async function findOneByUserIdAndBudgetId(userId: number, budgetId: number): Promise<BudgetModel> {
  const budgetRow = await db.getRepository(Budget).findOne(
    {
      where:
      {
        user_id: userId,
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

export async function create(budgetObj: NewBudget, userId: number): Promise<void> {
  const monthLength = String(budgetObj.month).length;

  const newBudget = new Budget();
  newBudget.year_month = monthLength === 1 ? parseInt(`${budgetObj.year}0${budgetObj.month}`) : parseInt(`${budgetObj.year}${budgetObj.month}`);
  newBudget.amount = budgetObj.amount;
  newBudget.category_id = budgetObj.categoryId;
  newBudget.user_id = userId;
  newBudget.created_at = new Date();
  newBudget.modified_at = new Date();

  await db.getRepository(Budget).insert(newBudget);
}

export async function update(budgetId: number, budgetObj: UpdateBudget, userId: number): Promise<void> {
  const budgetToUpdate = await db.getRepository(Budget).findOne(
    {
      where:
      {
        user_id: userId,
        id: budgetId,
      }
    }
  );
  if (!budgetToUpdate) throw new Error('no budget found');

  const monthLength = String(budgetObj.month).length;

  budgetToUpdate.year_month = monthLength === 1 ? parseInt(`${budgetObj.year}0${budgetObj.month}`) : parseInt(`${budgetObj.year}${budgetObj.month}`);
  budgetToUpdate.amount = budgetObj.amount;
  budgetToUpdate.modified_at = new Date();

  await db.getRepository(Budget).save(budgetToUpdate);
}

export async function remove(budgetId: number, userId: number) {
  const budgetToDelete = await db.getRepository(Budget).findOne(
    {
      where:
      {
        user_id: userId,
        id: budgetId,
      }
    }
  );
  if (!budgetToDelete) throw new Error('no budget found');

  await db.getRepository(Budget).remove(budgetToDelete);
}