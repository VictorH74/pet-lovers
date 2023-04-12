import { PrismaClient, PetShop } from "@prisma/client";

const prisma = new PrismaClient();

export class PetShopModel {
  public static listPetshops(page: number, limit: number) {
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
        location: true,
        petSpecies: true,
        rating: true,
        reviews: true,

      },
      take: limit,
      skip: (page - 1) * limit,
    };

    return prisma.petShop.findMany(selectFields);
  }

  public static createPetshop(data: Omit<PetShop, "id">) {
    const petshop = prisma.petShop.create({ data, select: { id: true } });
    return petshop;
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
      location: true,
      createdAt: true,
      petSpecies: true,
    };

    return prisma.petShop.findUnique({ where: { id }, select });
  }
  public static retrievePetshopByUserId(userId: string) {
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
      location: true,
      createdAt: true,
      petSpecies: true,
    };

    return prisma.petShop.findUnique({ where: { userId }, select });
  }

  public static updatePetshop(id: string, data: Partial<PetShop>) {
    return prisma.petShop.update({ where: { id }, data });
  }

  public static deletePetshop(id: string) {
    return prisma.petShop.delete({ where: { id } });
  }
}
