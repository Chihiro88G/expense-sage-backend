import db from '../database';
import { Users } from '../user/entity';
import { UserType } from '../user/type';
import { UserCategory } from '../user_category/entity';
import { Category } from './entity';
import { CategoryModel, CategoryType } from './type';

export async function findAllByUser(user: UserType): Promise<CategoryModel[]> {
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

  const categories: CategoryModel[] = [
    ...defaultCategories.map((category: Category) => ({
      id: category.id,
      name: category.name,
      categoryType: CategoryType.Default,
    })),
    ...userDefinedCategories.map((category: Category) => ({
      id: category.id,
      name: category.name,
      categoryType: CategoryType.UserCreated,
    }))
  ];

  return categories;
}

export async function findDefaultCategoryByCategoryId(categoryId: number): Promise<CategoryModel | null> {
  const category = await db.getRepository(Category)
    .findOneBy({
      id: categoryId,
      category_type: 0,
    });

  if (!category) return null;

  return {
    id: category.id,
    name: category.name,
    categoryType: CategoryType.Default,
  };
}

export async function findUserDefinedCategoryByCategoryIdAndUserId(categoryId: number, userId: number): Promise<CategoryModel> {
  const category = await db.getRepository(Category)
    .createQueryBuilder('cat')
    .leftJoinAndSelect('user_category', 'uscat', 'cat.id = uscat.category_id')
    .where('uscat.user_id = :userId', { userId: userId })
    .andWhere('cat.id = :categoryId', { categoryId: categoryId})
    .andWhere('cat.category_type = 1')
    .getOne();

  if (!category) throw new Error('category not found');
  if (category.category_type === 0) throw new Error('cannot modify default categories');

  return {
    id: category.id,
    name: category.name,
    categoryType: CategoryType.UserCreated,
  };
}

export async function update(categoryId: number, categoryName: string): Promise<void> {
  const categoryToUpdate = await db.getRepository(Category)
    .findOneBy({
      id: categoryId,
    });

  if (!categoryToUpdate) throw new Error('category not found');

  categoryToUpdate.name = categoryName;
  categoryToUpdate.modified_at = new Date();

  await db.getRepository(Category).save(categoryToUpdate);
}

export async function create(userId: number, categoryName: string): Promise<void> {
  const user = await db.getRepository(Users).findOneBy({ id: userId });
  if (!user) throw new Error('no user found');

  const newCategory = new Category();
  newCategory.name = categoryName;
  newCategory.category_type = 1;
  newCategory.created_at = new Date();
  newCategory.modified_at = new Date();

  const savedCategory = await db.getRepository(Category).save(newCategory);

  const newUserCategory = new UserCategory();
  newUserCategory.category = savedCategory;
  newUserCategory.user = user;

  await db.getRepository(UserCategory).insert(newUserCategory);
}

export async function remove(categoryId: number, userId: number): Promise<void> {
  const user = await db.getRepository(Users).findOneBy({ id: userId });
  if (!user) throw new Error('no user found');

  const categoryToRemove = await db.getRepository(Category).findOneBy({
    id: categoryId,
  });
  if (!categoryToRemove) throw new Error('no caegory found');

  const userCategoryToRemove = await db.getRepository(UserCategory).findOneBy({
    user: { id: user.id },
    category: { id: categoryToRemove.id }
  });
  if (!userCategoryToRemove) throw new Error('no user-category found');

  await db.getRepository(UserCategory).remove(userCategoryToRemove);
  await db.getRepository(Category).remove(categoryToRemove);
}