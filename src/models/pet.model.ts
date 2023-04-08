import { PrismaClient, Pet, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export type SortBy = "priceDesc" | "priceAsc" | undefined;

export class PetModel {
  public static listPets(
    page: number,
    limit: number,
    PetShopId: string | undefined,
    sortBy: SortBy
  ) {
    let orderBy: { price: "desc" } | { price: "asc" } | { createdAt: "desc" } =
      {
        createdAt: Prisma.SortOrder.desc,
      };

    if (sortBy === "priceDesc") orderBy = { price: Prisma.SortOrder.desc };
    else if (sortBy === "priceAsc") orderBy = { price: Prisma.SortOrder.asc };

    // where
    // specie === ?

    return prisma.pet.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: { PetShopId },
      orderBy,
    });
  }

  public static createPet(data: Pet) {
    return prisma.pet.create({ data });
  }

  public static retrievePet(id: number) {
    return prisma.pet.findUnique({ where: { id } });
  }

  public static updatePet(id: number, data: Partial<Pet>) {
    return prisma.pet.update({ where: { id }, data });
  }

  public static deletePet(id: number) {
    return prisma.pet.delete({ where: { id } });
  }
}
