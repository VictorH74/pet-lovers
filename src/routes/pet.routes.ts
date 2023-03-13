import { Router } from 'express';
import { PetController } from '../controllers/pet.controller';
// import {authMiddleware} from "../middleware/auth.middleware"

const router = Router();

router.get('/', PetController.listPets);

router.post('/add', PetController.createPet);

router.get('/:id', PetController.retrievePet);

router.put('/:id', PetController.updatePet);

router.delete('/:id', PetController.deletePet);

export { router as petRoutes };