import { PetShop } from "@prisma/client";
import { Request, Response } from "express";
import { PetShopService } from "../services/petshop.service";
import { formatAddress } from "../utils/helpers";
import { validateAddress } from "../utils/validations";


export class PetShopController {
    public static async listPetshops(_req: Request, res: Response): Promise<void> {
        try {
            const petshops = await PetShopService.listPetshops();
            const formattedPetshops = petshops.map(p => ({ ...p, address: formatAddress(p.address) })); +
                res.status(200).json(formattedPetshops);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async createPetshop(req: Request, res: Response): Promise<void> {
        try {
            const petshopData: PetShop = req.body;

            if (!validateAddress(petshopData.address)) {
                throw new Error('Invalid address')
            }

            const petshop = await PetShopService.createPetshop(petshopData);
            res.status(201).json(petshop);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({error: error.message});
                return;
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async retrievePetshop(req: Request, res: Response): Promise<void> {
        try {
            const petshopId = req.params.id;
            const petshop = await PetShopService.retrievePetshop(petshopId);

            if (!petshop) throw new Error("Petshop not found")

            res.status(200).json({ ...petshop, address: formatAddress(petshop.address) });
        } catch (error) {
            if (error instanceof Error) {
                res.send({ error: error.message })
                return
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async updatePetshop(req: Request, res: Response): Promise<void> {
        try {
            const petshopId = req.params.id;
            const petshopData: Partial<PetShop> = req.body;

            if (petshopData.address === "" || (petshopData.address && !validateAddress(petshopData.address))) {
                throw new Error('Invalid address')
            }

            const petshop = await PetShopService.updatePetshop(petshopId, petshopData);
            res.status(200).json(petshop);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({error: error.message});
                return;
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async deletePetshop(req: Request, res: Response): Promise<void> {
        try {
            const petshopId = req.params.id;
            await PetShopService.deletePetshop(petshopId);
            res.status(200).json({ message: "Petshop deleted" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({error: error.message});
                return;
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}