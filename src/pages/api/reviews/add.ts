// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ReviewService } from "@/services/review.service";
import { PetShop, Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< PetShop | { message: string; status?: number }>
) {
  if (req.method !== "POST")
    throw new Error(`Forbidden request method: ${req.method}`);

  try {
    const reviewData: Review = req.body;

    const petshop = await ReviewService.createOrUpdateReview(reviewData);
    res.status(201).send(petshop);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
