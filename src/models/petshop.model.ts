import { PrismaClient, PetShop, Prisma } from "@prisma/client";
import { ObjectListResponse } from "../../types/object-list-response";

const prisma = new PrismaClient();

type SortBy = "sortByRating" | "sortByDistance" | "sortByPet" | undefined;

export interface PetshopList extends Omit<PetShop, "userId" | "createdAt"> {}

export class PetShopModel {
  public static async list(
    page: number,
    limit: number,
    sort?: string
  ): Promise<ObjectListResponse<PetshopList>> {
    /*
     {
      where: {
        petSpecies: {
          contains: varStr,
        },
      },
     }
    */

    let validedSort: any = undefined;

    switch (sort) {
      case "sortByRating":
        validedSort = [
          { count: Prisma.SortOrder.desc },
          { rating: Prisma.SortOrder.desc },
        ];
        break;
      default:
        validedSort = undefined;
    }

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
        count: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: validedSort,
    };

    let count = await prisma.petShop.count();

    let next = page * limit < count;

    let data: PetshopList[] = await prisma.petShop.findMany(selectFields);

    return {
      next,
      data,
    };
  }

  public static create(data: Omit<PetShop, "id">) {
    const petshop = prisma.petShop.create({ data, select: { id: true } });
    return petshop;
  }

  public static retrieve(id: string) {
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
      rating: true,
      count: true,
    };

    return prisma.petShop.findUnique({ where: { id }, select });
  }

  public static retrieveByUserId(userId: string) {
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

  public static update(
    id: string,
    data: Omit<Partial<PetShop>, "id" | "createdAt">
  ) {
    return prisma.petShop.update({ where: { id }, data });
  }

  public static delete(id: string) {
    return prisma.petShop.delete({ where: { id } });
  }
}
