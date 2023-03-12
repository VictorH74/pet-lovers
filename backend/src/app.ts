import express, { Application } from 'express';
import { petRoutes } from './routes/pet.routes';
import { petshopRoutes } from './routes/petshop.routes';
import { userRoutes } from './routes/user.routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/petshops', petshopRoutes);

export { app };