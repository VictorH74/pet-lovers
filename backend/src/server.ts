import express, { Application, Request, Response } from "express";
import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
// import { z } from "zod";
// import cors from "cors"
const prisma = new PrismaClient();
const secret = "mysecretkey";

const app: Application = express();

const PORT: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res: Response) => {
    res.json({ message: "Helloo!!!" });
})

app.get("/users", async (_req, res: Response) => {
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, phone: true } });
    res.json({ users });
})

app.post("/users", async (req: Request, res: Response) => {
    const data: User = req.body
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await prisma.user.create({ data: { ...data, password: hashedPassword } })
        return res.status(201).send({ message: "User created!" })
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
})

app.delete("/users", async (req: Request, res: Response) => {
    const { id, email } = req.body
    let field = {}
    try {
        if (id) {
            field = { id }
        }
        else if (email) {
            field = { email }
        }
        await prisma.user.delete({ where: field })
        return res.status(201).send({ message: "User deleted" })
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
})

app.put("/users/:id", async (req: Request, res: Response) => {
    if (!req?.params['id']) return res.status(500).send({ error: "Failed to update user" });

    const id = req.params['id'];
    const data = req.body;
  
    try {
    //   const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { id },
        data
      });
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to update user" });
    }
  });

app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Verifica se o email e a senha estão corretos
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) return res.status(401).send({ message: "Invalid email" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(401).send({ error: "Invalid password" });

    // Cria o token com o id do usuário e o segredo
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });

    return res.send({ token });
});

// /petshops
// /petshops/animals
// petshops
// petshops
// petshops
// petshops
// petshops

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})