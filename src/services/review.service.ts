import { ReviewModel } from "@/models/review.model";
import { Review } from "@prisma/client";
import { PetShopService } from "./petshop.service";

export class ReviewService {
  public static listReviewsByPetShop(petShopId: string) {
    return ReviewModel.listByPetShop(petShopId);
  }

  public static retrieveReview(userId: string, petShopId: string) {
    return ReviewModel.retrieve(userId, petShopId);
  }

  public static async createOrUpdateReview(data: Review) {
    const { id, userId, petShopId } = data;

    const retrievedReview = await this.retrieveReview(userId, petShopId);

    if (retrievedReview) {
      await ReviewModel.update(id, userId, petShopId, data);
    } else {
      await ReviewModel.create(data);
    }

    const reviews = await this.listReviewsByPetShop(data.petShopId);

    var total = 0;

    for (const review of reviews) {
      total += review.rating;
    }

    const count = reviews.length;

    const rating = total / count;

    return PetShopService.updatePetshop(data.petShopId, { rating, count });
  }

  public static deleteReview(id: number) {
    return ReviewModel.delete(id);
  }
}
