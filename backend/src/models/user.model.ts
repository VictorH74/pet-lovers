import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt';
import { validateAddress } from '../utils/validations';

const prisma = new PrismaClient()

export class UserModel {
    public static async getUserToken({ email }: Pick<User, "email">): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user
    }

    public static async createUser(userData: Omit<User, 'id'>): Promise<User> {
        if (userData.address && !validateAddress(userData.address)) {
            throw new Error('Invalid address')
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        return prisma.user.create({ data: { ...userData, password: hashedPassword } })
    }

    public static async listUsers() {
        const selectFields = {
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true
            }
        }

        const users = await prisma.user.findMany(selectFields);
        return users
    }

    public static async retrieveUser(id: string) {
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
        if (userData.address && !validateAddress(userData.address)) {
            throw new Error('Invalid address')
        }

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        return prisma.user.update({
            where: { id },
            data: userData,
        })
    }

    public static async deleteUser(id: string) {
        return prisma.user.delete({ where: { id } })
    }
}
