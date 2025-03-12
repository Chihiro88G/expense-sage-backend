import { CategoryItem } from '../category/type';

export type BudgetModel = {
  id: number,
  year: number,
  month: number,
  amount: number,
  category: CategoryItem,
}

export type NewBudget = {
  year: string,
  month: string,
  amount: number,
  categoryId: number,
}

export type UpdateBudget = {
  year: string,
  month: string,
  amount: number,
}