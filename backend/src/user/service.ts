import db from '../database';
import { Users } from './entity';
import { UserType } from './type';

export async function findOneById(userId: number): Promise<UserType> {
  const user = await db.getRepository(Users).findOne({where: { id: userId }});
  if (!user) throw new Error('no user found');

  return {
    id: user.id,
    name: user.name,
  };
}