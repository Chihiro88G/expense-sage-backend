import db from '../database';
import { UserType } from '../user/type';
import { Category } from './entity';
import { CategoryModel, CategoryType, CategoryUpdate } from './type';

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

export async function getOneByCategoryIdAndUserId(categoryId: number, userId: number): Promise<CategoryModel> {
  const category = await db.getRepository(Category)
    .createQueryBuilder('cat')
    .leftJoinAndSelect('user_category', 'uscat', 'cat.id = uscat.category_id')
    .where('uscat.user_id = :userId', { userId: userId })
    .andWhere('cat.id = :categoryId', { categoryId: categoryId})
    .getOne();

  if (!category) throw new Error('category not found');
  if (category.category_type === 0) throw new Error('cannot modify default categories');

  return {
    id: category.id,
    name: category.name,
    categoryType: CategoryType.UserCreated,
  };
}

export async function update(categoryId: number, category: CategoryUpdate): Promise<void> {
  const categoryToUpdate = await db.getRepository(Category)
    .findOneBy({
      id: categoryId,
    });

  if (!categoryToUpdate) throw new Error('category not found');

  categoryToUpdate.name = category.categoryName;
  categoryToUpdate.modified_at = new Date();

  await db.getRepository(Category).save(categoryToUpdate);
}