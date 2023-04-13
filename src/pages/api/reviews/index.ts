// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Review } from "@prisma/client";
import { ReviewService } from "@/services/review.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Review>[] | { message: string; status?: number }>
) {
  try {
    if (req.method !== "GET")
      throw new Error(`Forbidden request method: ${req.method}`);

    const petshopId = String(req.query.petshopId);

    if (!petshopId) throw new Error("PetshopId not defined");

    const reviews = await ReviewService.listReviewsByPetShop(petshopId);

    res.status(200).json(reviews);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
