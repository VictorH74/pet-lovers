// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ReviewService } from "@/services/review.service";
import { Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Partial<Review> | { message: string; status?: number } | null
  >
) {
  try {
    const reviewId = Number(req.query.reviewId);

    if (!reviewId) throw new Error();

    if (req.method === "PUT") {
      const reviewData = req.body;

      const review = await ReviewService.updateReview(reviewId, reviewData);

      res.status(200).send(review);
    } else if (req.method === "DELETE") {
      await ReviewService.deleteReview(reviewId)
      res.status(200).send({ message: "Pet deleted", status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
