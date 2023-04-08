import { Pet } from "@prisma/client";
import { PetModel, SortBy } from "../models/pet.model";

export class PetService {
  public static listPets(
    page: number,
    limit: number,
    PetShopId: string | undefined,
    sortBy: SortBy
  ) {
    return PetModel.listPets(page, limit, PetShopId, sortBy);
  }

  public static createPet(data: Pet) {
    return PetModel.createPet(data);
  }

  public static retrievePet(id: number) {
    return PetModel.retrievePet(id);
  }

  public static updatePet(id: number, data: Partial<Pet>) {
    return PetModel.updatePet(id, data);
  }

  public static deletePet(id: number) {
    return PetModel.deletePet(id);
  }
}
