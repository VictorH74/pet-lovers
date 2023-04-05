// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetShopService } from '@/services/petshop.service';
// import { validateLocation } from '@/utils/validations';
import { PetShop } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Pick<PetShop, "id"> | { error: string }>
) {

    if (req.method !== "POST") throw new Error(`Forbidden request method: ${req.method}`)

    try {

        const petshopData: PetShop = req.body;
        
        const petshopId = await PetShopService.createPetshop(petshopData);

        res.status(201).send(petshopId);

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message })
            return
        }
        res.status(500).send({ error: 'Internal server error' });

    }
}