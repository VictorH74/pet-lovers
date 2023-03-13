// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetShopService } from '@/services/petshop.service';
import { validateAddress } from '@/utils/validations';
import { PetShop } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ message: string } | { error: string }>
) {

    if (req.method !== "POST") throw new Error(`Forbidden request method: ${req.method}`)

    try {

        const petshopData: PetShop = req.body;

        if (petshopData.address && !validateAddress(petshopData.address)) {
            throw new Error('Invalid address')
        }
        await PetShopService.createPetshop(petshopData);
        res.status(201).send({ message: "Petshop created!" });

    } catch (error) {

        if (error instanceof Error) {
            res.status(500).send({ error: error.message })
            return
        }
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });

    }
}