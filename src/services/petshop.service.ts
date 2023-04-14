import { PetShop } from "@prisma/client";
import { PetShopModel } from "../models/petshop.model";

export class PetShopService {
    public static listPetshops(page: number, limit: number, sort?: string) {
        return PetShopModel.list(page, limit, sort);
    }

    public static createPetshop(data: Omit<PetShop, "id">) {
        return PetShopModel.create(data);
    }

    public static retrievePetshop(id: string) {
        return PetShopModel.retrieve(id);
    }

    public static retrievePetshopByUserId(userId: string) {
        return PetShopModel.retrieveByUserId(userId);
    }

    public static updatePetshop(id: string, data: Partial<PetShop>) {
        return PetShopModel.update(id, data);
    }

    public static deletePetshop(id: string) {
        return PetShopModel.delete(id);
    }
}