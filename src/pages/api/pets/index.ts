// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Pet } from '@prisma/client';
import { PetService } from '@/services/pet.service';
import { SortBy } from '@/models/pet.model';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<Pet>[] | { error: string }>
) {
    try {
        if (req.method !== "GET") throw new Error(`Forbidden request method: ${req.method}`)

        let { page = 1, limit = 10, PetShopId = undefined, sortBy = undefined } = req.query;

        if (PetShopId && typeof PetShopId !== "string") {
            throw new Error("PetShopId must be a string or undefined");
          }

        const pets = await PetService.listPets(Number(page), Number(limit), PetShopId, sortBy as SortBy);
        res.status(200).json(pets);
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message })
            return
        }
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
