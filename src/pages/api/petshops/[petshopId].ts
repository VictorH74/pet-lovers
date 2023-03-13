// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PetShopService } from '@/services/petshop.service';
import { validateAddress } from '@/utils/validations';
import { PetShop } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<PetShop> | { error: string } | { message: string } | null>
) {
    try {
        const petshopId = req.query.petshopId as string

        if (!petshopId) throw new Error()

        if (req.method === "GET") {
            const petshop = await PetShopService.retrievePetshop(petshopId);

            if (!petshop) throw new Error("Petshop not found")

            res.status(200).send(petshop);
        }
        else if (req.method === "PUT") {
            const petshopData: Partial<PetShop> = req.body;

            if (petshopData.address === "" || (petshopData.address && !validateAddress(petshopData.address))) {
                throw new Error('Invalid address')
            }

            const petshop = await PetShopService.updatePetshop(petshopId, petshopData);
            res.status(200).send(petshop);
        }
        else if (req.method === "DELETE") {
            await PetShopService.deletePetshop(petshopId);
            res.status(200).send({ message: "Petshop deleted" });
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