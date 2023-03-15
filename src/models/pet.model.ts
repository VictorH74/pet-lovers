import { PrismaClient, Pet } from "@prisma/client"


const prisma = new PrismaClient()

export class PetModel {
    public static listPets(page: number, limit: number) {
        return prisma.pet.findMany({
            take: limit,
            skip: (page - 1) * limit,
        })
    }

    public static createPet(data: Pet) {
        return prisma.pet.create({ data })
    }

    public static retrievePet(id: number) {
        return prisma.pet.findUnique({ where: { id } })
    }

    public static updatePet(id: number, data: Partial<Pet>) {
        return prisma.pet.update({ where: { id }, data })
    }

    public static deletePet(id: number) {
        return prisma.pet.delete({ where: { id } })
    }
}