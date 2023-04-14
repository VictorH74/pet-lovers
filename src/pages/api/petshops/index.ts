// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PetShop } from "@prisma/client";
import { PetShopService } from "@/services/petshop.service";
import { PetshopList } from "@/models/petshop.model";
import { ObjectListResponse } from "../../../../types/object-list-response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    ObjectListResponse<PetshopList> | { message: string; statuc?: number }
  >
) {
  try {
    if (req.method !== "GET")
      throw new Error(`Forbidden request method: ${req.method}`);

    const { page = 1, limit = 10, sort = undefined } = req.query;

    const petshops = await PetShopService.listPetshops(
      Number(page),
      Number(limit),
      String(sort)
    );
    res.status(200).json(petshops);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, statuc: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", statuc: 500 });
  }
}
