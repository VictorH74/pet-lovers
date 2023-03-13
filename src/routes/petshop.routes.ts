import { Router } from 'express';
import { PetShopController } from '../controllers/petshop.controller';
// import {authMiddleware} from "../middleware/auth.middleware"

const router = Router();

router.get('/', PetShopController.listPetshops);

router.post('/add', PetShopController.createPetshop);

router.get('/:id', PetShopController.retrievePetshop);

router.put('/:id', PetShopController.updatePetshop);

router.delete('/:id', PetShopController.deletePetshop);

export { router as petshopRoutes };