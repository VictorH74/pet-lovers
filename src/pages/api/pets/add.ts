// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserException } from '@/exceptions/user';
import { PetService } from '@/services/pet.service';
import { Pet } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ message: string; status?: number }>
) {

    if (req.method !== "POST") throw new Error(`Forbidden request method: ${req.method}`)

    try {

        const petData: Pet = req.body;

        await PetService.createPet(petData);
        res.status(201).send({ message: "Pet created!", status: 201 });

    } catch (error) {
        
        if (error instanceof Error) {
            res.status(500).send({ message: error.message, status: 500 })
            return
        }
        console.error(error);
        res.status(500).send({ message: 'Internal server error', status: 500 });

    }
}