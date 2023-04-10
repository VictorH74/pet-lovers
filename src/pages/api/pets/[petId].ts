// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetService } from '@/services/pet.service';
import { Pet } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<Pet> | { message: string; status?: number } | null>
) {
    try {
        const petId = Number(req.query.petId)

        if (!petId) throw new Error()

        if (req.method === "GET") {
            const pet = await PetService.retrievePet(petId);

            if (!pet) return res
            .status(404)
            .send({ message: "Pet não encontrado", status: 404 });

            res.status(200).send(pet);
        }
        else if (req.method === "PUT") {
            const petData: Partial<Pet> = req.body;

            const pet = await PetService.updatePet(petId, petData);
            res.status(200).send(pet);
        }
        else if (req.method === "DELETE") {
            await PetService.deletePet(petId);
            res.status(200).send({ message: "Pet deleted", status: 200 });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message, status: 500 })
            return
        }
        console.error(error);
        res.status(500).send({ message: 'Internal server error', status: 500 });
    }
}