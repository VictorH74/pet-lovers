// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetService } from "@/services/pet.service";
import { Pet } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data?: Pet; status?: number; message?: string }>
) {
  if (req.method !== "POST")
    throw new Error(`Forbidden request method: ${req.method}`);

  try {
    const petData: Pet = req.body;

    console.log(petData.image)

    const newPet = await PetService.createPet(
      petData.image
        ? { ...petData, image: Buffer.from(petData.image) }
        : petData
    );
    res.status(201).send({ data: newPet, status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
