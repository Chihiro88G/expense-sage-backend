import db from '../database';
import { UserType } from '../user/type';
import { Category } from './entity';
import { CategoryModel, CategoryType } from './type';

export async function findAllByUserId(user: UserType): Promise<CategoryModel[]> {
  const defaultCategories = await db.getRepository(Category).find(
    {where: { category_type: 0 }}
  );

  if (!defaultCategories) throw new Error('error fetching default categories');

  const userDefinedCategories =  await db.getRepository(Category)
    .createQueryBuilder('cat')
    .leftJoinAndSelect('user_category', 'uscat', 'cat.id = uscat.category_id')
    .where('uscat.user_id = :userId', { userId: user.id })
    .getMany();

  if (!userDefinedCategories) throw new Error('error fetching user defined categories');

  const categories: CategoryModel[] = [];

  defaultCategories.forEach((dcat: Category) => {
    const category = {
      id: dcat.id,
      name: dcat.name,
      categoryType: CategoryType.Default,
    };
    categories.push(category);
  });

  userDefinedCategories.forEach((dcat: Category) => {
    const category = {
      id: dcat.id,
      name: dcat.name,
      categoryType: CategoryType.UserCreated,
    };
    categories.push(category);
  });

  return categories;
}