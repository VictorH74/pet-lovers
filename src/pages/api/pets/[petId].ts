// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetService } from '@/services/pet.service';
import { Pet } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<Pet> | { error: string } | { message: string } | null>
) {
    try {
        const petId = Number(req.query.petId)

        if (!petId) throw new Error()

        if (req.method === "GET") {
            const pet = await PetService.retrievePet(petId);

            if (!pet) throw new Error("Pet not found")

            res.status(200).send(pet);
        }
        else if (req.method === "PUT") {
            const petData: Partial<Pet> = req.body;

            const pet = await PetService.updatePet(petId, petData);
            res.status(200).send(pet);
        }
        else if (req.method === "DELETE") {
            await PetService.deletePet(petId);
            res.status(200).send({ message: "Pet deleted" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message })
            return
        }
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}