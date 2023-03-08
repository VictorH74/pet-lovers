import express, { Application, Response } from "express";
// import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client'
// import cors from "cors"
const prisma = new PrismaClient();

const app: Application = express();

const PORT: number = 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res: Response) => {
    res.json({ message: "Helloo!" });
})

app.get("/users", async (_req, res: Response) => {
    const users = await prisma.user.findMany();
    res.json({ users });
})

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})