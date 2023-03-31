import { UserModel } from '../models/user.model';
import { User } from '@prisma/client';

export class UserService {
  public static async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.getUserByEmail(email);
    return user;
  }

  public static async createUser(userData: User): Promise<User> {
    const user = await UserModel.createUser(userData);
    return user;
  }

  public static async listUsers(page: number, limit: number) {
    const user = await UserModel.listUsers(page, limit);
    return user;
  }

  public static async retrieveUser(userId: string) {
    const user = await UserModel.retrieveUser(userId);
    return user;
  }

  public static async updateUser(userId: string, userData: Partial<User>) {
    const user = await UserModel.updateUser(userId, userData);
    return user;
  }

  public static async deleteUser(userId: string) {
    return UserModel.deleteUser(userId);
  }
}
