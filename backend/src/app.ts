import express, { Application } from 'express';
import { userRoutes } from './routes/user.routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

export { app };