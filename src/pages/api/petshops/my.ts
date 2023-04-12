// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetShopService } from "@/services/petshop.service";
import { validateLocation } from "@/utils/validations";
import { PetShop } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function myPetshopRoute(
  req: NextApiRequest,
  res: NextApiResponse<
    | Partial<PetShop>
    | { error: string }
    | { message: string; status?: number }
    | null
  >
) {
  try {
    const userId = req.query.userId as string;
    if (!userId)
      return res.status(400).send({ message: "Sem usuário", status: 400 });

    if (req.method === "GET") {
      const petshop = await PetShopService.retrievePetshopByUserId(userId);

      if (!petshop)
        return res
          .status(404)
          .send({ message: "Petshop não encontrada", status: 404 });

      res.status(200).send(petshop);
    } else if (req.method === "PUT") {
      const petshopData: Partial<PetShop> = req.body;

      if (
        petshopData.location === "" ||
        (petshopData.location && !validateLocation(petshopData.location))
      ) {
        return res
          .status(400)
          .send({ message: "Formato de localização inválida", status: 400 });
      }

      const retrievedPetshop = await PetShopService.retrievePetshopByUserId(
        userId
      );

      if (!retrievedPetshop)
        return res
          .status(404)
          .send({ message: "Petshop não encontrada", status: 404 });

      const petshop = await PetShopService.updatePetshop(
        retrievedPetshop.id,
        petshopData
      );
      res.status(200).send(petshop);
    } else if (req.method === "DELETE") {
      const retrievedPetshop = await PetShopService.retrievePetshopByUserId(
        userId
      );

      if (!retrievedPetshop)
        return res
          .status(404)
          .send({ message: "Petshop não encontrada", status: 404 });
      await PetShopService.deletePetshop(retrievedPetshop.id);
      res.status(200).send({ message: "Petshop deleted" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}
