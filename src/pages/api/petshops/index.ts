// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PetShop } from '@prisma/client';
import { PetShopService } from '@/services/petshop.service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<PetShop>[] | { error: string }>
) {
    try {
        if (req.method !== "GET") throw new Error(`Forbidden request method: ${req.method}`)

        const petshops = await PetShopService.listPetshops();
        res.status(200).json(petshops);
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message })
            return
        }
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
