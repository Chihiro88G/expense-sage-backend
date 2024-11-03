export enum CategoryType {
  Default = 'default',
  UserCreated = 'user-created'
}

export type CategoryModel = {
  id: number,
  name: string,
  categoryType: CategoryType,
}