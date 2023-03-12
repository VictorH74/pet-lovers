import { Pet } from "@prisma/client";
import { Request, Response } from "express";
import { PetService } from "../services/pet.service";

export class PetController {
    public static async listPets(_req: Request, res: Response): Promise<void> {
        try {
            const petshops = await PetService.listPets();
            res.status(200).json(petshops);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async createPet(req: Request, res: Response): Promise<void> {
        try {
            const petData: Pet = req.body;
            const pet = await PetService.createPet(petData);

            res.status(201).json(pet);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ error: error.message });
                return;
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async retrievePet(req: Request, res: Response): Promise<void> {
        try {
            const petId = Number(req.params.id);

            const pet = await PetService.retrievePet(petId);
            if (!pet) throw new Error("Pet not found")

            res.status(200).json(pet);
        } catch (error) {
            if (error instanceof Error) {
                res.send({ error: error.message })
                return
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async updatePet(req: Request, res: Response): Promise<void> {
        try {
            const petId = Number(req.params.id);
            const petData: Partial<Pet> = req.body;

            const petshop = await PetService.updatePet(petId, petData);
            res.status(200).json(petshop);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ error: error.message });
                return;
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    public static async deletePet(req: Request, res: Response): Promise<void> {
        try {
            const petId = Number(req.params.id);
            await PetService.deletePet(petId);
            res.status(200).json({ message: "Petshop deleted" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ error: error.message });
                return;
            }
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}