import { CategoryItem } from '../category/type';

export type BudgetModel = {
  id: number,
  year: number,
  month: number,
  amount: number,
  category: CategoryItem,
}
