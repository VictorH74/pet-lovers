import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export type RequiredUser = Required<Pick<User, "email" | "name">> & Partial<Omit<User, "email" | "name"| "id">>;

export class UserModel {
  public static async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  public static listUsers(page: number, limit: number) {
    const selectFields = {
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        location: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    };

    return prisma.user.findMany(selectFields);
  }

  public static async createUser(
    userData: RequiredUser
  ): Promise<User> {

    let hashedPassword = null;

    if (userData.password)
      hashedPassword = await bcrypt.hash(userData.password, 10);

    return prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
  }

  public static async retrieveUser(id: string): Promise<User | null> {
    let user = await prisma.user.findUnique({ where: { id } });
    return user;
  }


  public static async updateUser(id: string, userData: Partial<User>) {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  public static deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
