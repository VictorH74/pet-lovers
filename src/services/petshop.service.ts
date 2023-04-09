import { PetShop } from "@prisma/client";
import { PetShopModel } from "../models/petshop.model";

export class PetShopService {
    public static listPetshops(page: number, limit: number) {
        return PetShopModel.listPetshops(page, limit);
    }

    public static createPetshop(data: Omit<PetShop, "id">) {
        return PetShopModel.createPetshop(data);
    }

    public static retrievePetshop(id: string) {
        return PetShopModel.retrievePetshop(id);
    }

    public static retrievePetshopByUserId(userId: string) {
        return PetShopModel.retrievePetshopByUserId(userId);
    }

    public static updatePetshop(id: string, data: Partial<PetShop>) {
        return PetShopModel.updatePetshop(id, data);
    }

    public static deletePetshop(id: string) {
        return PetShopModel.deletePetshop(id);
    }
}