import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
// import {authMiddleware} from "../middleware/auth.middleware"

const router = Router();

router.post('/login', UserController.getUserToken);

router.get('/', UserController.listUsers);

router.post('/add', UserController.createUser);

router.get('/:id', UserController.retrieveUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

export { router as userRoutes };
