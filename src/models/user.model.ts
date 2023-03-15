import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export class UserModel {
    public static async getUserToken({ email }: Pick<User, "email">): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user
    }

    public static listUsers(page: number, limit: number) {
        const selectFields = {
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
            },
            take: limit, 
            skip: (page - 1) * limit,
        }

        return prisma.user.findMany(selectFields);
    }

    public static async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        return prisma.user.create({ data: { ...userData, password: hashedPassword } })
    }

    public static retrieveUser(id: string) {
        const select = {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true
        }

        return prisma.user.findUnique({ where: { id }, select })
    }

    public static async updateUser(id: string, userData: Partial<User>) {
        return prisma.user.update({
            where: { id },
            data: userData,
        })
    }

    public static deleteUser(id: string) {
        return prisma.user.delete({ where: { id } })
    }
}
