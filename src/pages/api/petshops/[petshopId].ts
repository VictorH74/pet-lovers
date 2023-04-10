// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetShopService } from "@/services/petshop.service";
import { validateLocation } from "@/utils/validations";
import { PetShop } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Partial<PetShop> | { message: string; status?: number } | null
  >
) {
  try {
    const petshopId = req.query.petshopId as string;

    if (!petshopId) throw new Error();

    if (req.method === "GET") {
      const petshop = await PetShopService.retrievePetshop(petshopId);

      if (!petshop)
        return res
          .status(404)
          .send({ message: "Petshop não encontrado", status: 404 });

      res.status(200).send(petshop);
    } else if (req.method === "PUT") {
      const petshopData: Partial<PetShop> = req.body;

      if (
        petshopData.location === "" ||
        (petshopData.location && !validateLocation(petshopData.location))
      ) {
        return res
          .status(400)
          .send({ message: "Localização inválida", status: 400 });
      }

      const petshop = await PetShopService.updatePetshop(
        petshopId,
        petshopData
      );
      res.status(200).send(petshop);
    } else if (req.method === "DELETE") {
      await PetShopService.deletePetshop(petshopId);
      res.status(200).send({ message: "Petshop deleted" });
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
