import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

export class ReviewModel {
  public static listByPetShop(petShopId: string) {
    return prisma.review.findMany({ where: { petShopId } });
  }

  public static retrieve(userId: string, petShopId: string) {
    return prisma.review.findUnique({
      where: {
        userId_petShopId: {
          userId,
          petShopId,
        },
      },
    });
  }

  public static update(
    id: number,
    userId: string,
    petShopId: string,
    data: Omit<Partial<Review>, "id" | "userId" | "petShopId">
  ) {
    console.log(data);
    return prisma.review.update({
      where: {
        id,
        userId_petShopId: {
          userId,
          petShopId,
        },
      },
      data,
    });
  }

  public static create(data: Review) {
    return prisma.review.create({ data });
  }

  public static delete(id: number) {
    return prisma.review.delete({ where: { id } });
  }
}
