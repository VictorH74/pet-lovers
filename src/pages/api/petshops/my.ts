// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetShopService } from "@/services/petshop.service";
import { validateLocation } from "@/utils/validations";
import { PetShop } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(myPetshopRoute, sessionOptions);

async function myPetshopRoute(
  req: NextApiRequest,
  res: NextApiResponse<
    Partial<PetShop> | { error: string } | { message: string } | null
  >
) {
  try {
    const userId = req.query.userId as string
    if (!userId) throw new Error("Not user");

    if (req.method === "GET") {
      const petshop = await PetShopService.retrievePetshopByUserId(
        userId
      );

      if (!petshop) throw new Error(`Petshop not found. User: ${userId}`);

      res.status(200).send(petshop);
    } else if (req.method === "PUT") {
      const petshopData: Partial<PetShop> = req.body;

      if (
        petshopData.location === "" ||
        (petshopData.location && !validateLocation(petshopData.location))
      ) {
        throw new Error("Invalid location");
      }

      const retrievedPetshop = await PetShopService.retrievePetshopByUserId(
        userId
      );

      if (!retrievedPetshop) throw new Error("Petshop not Found");

      const petshop = await PetShopService.updatePetshop(
        retrievedPetshop.id,
        petshopData
      );
      res.status(200).send(petshop);
    } else if (req.method === "DELETE") {
      const retrievedPetshop = await PetShopService.retrievePetshopByUserId(
        userId
      );

      if (!retrievedPetshop) throw new Error("Petshop not Found");
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
