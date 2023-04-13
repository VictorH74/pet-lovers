import { PrismaClient, User } from "@prisma/client";


const prisma = new PrismaClient();

export type RequiredUser = Required<Pick<User, "email" | "name">> & Partial<Omit<User, "email" | "name"| "id">>;

export class UserModel {
  public static getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
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

  public static createUser(
    userData: RequiredUser
  ): Promise<User> {
    return prisma.user.create({
      data: { ...userData },
    });
  }

  public static retrieveUser(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }


  public static updateUser(id: string, userData: Partial<User>) {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  public static deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
