import { PrismaClient, PetShop } from '@prisma/client'


const prisma = new PrismaClient()

export class PetShopModel {
    public static listPetshops() {
        const selectFields = {
            select: {
                id: true,
                name: true,
                description: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                website: true,
                phone: true,
                address: true,
                petSpecies: true,
            }
        }

        return prisma.petShop.findMany(selectFields)
    }

    public static createPetshop(data: Omit<PetShop, "id">) {
        const petshop = prisma.petShop.create({ data })
        return petshop
    }

    public static retrievePetshop(id: string) {
        const select = {
            id: true,
            name: true,
            description: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                },
            },
            website: true,
            phone: true,
            address: true,
            createdAt: true,
            petSpecies: true,
            animals: {
                select: {
                    id: true,
                    species: true,
                    age: true,
                    breed: true,
                    price: true,
                  }
            },
        }

        return prisma.petShop.findUnique({ where: { id }, select })
    }

    public static updatePetshop(id: string, data: Partial<PetShop>) {
        return prisma.petShop.update({ where: { id }, data })
    }

    public static deletePetshop(id: string) {
        return prisma.petShop.delete({ where: { id } })
    }
}