export enum CategoryType {
  Default = 'default',
  UserCreated = 'user-created'
}

export type CategoryModel = {
  id: number,
  name: string,
  categoryType: CategoryType,
}

export type CategoryUpdate = {
  categoryName: string,
  userId: number,
}