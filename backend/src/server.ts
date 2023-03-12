import express, { Application, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { app } from "./app";

interface UserPayload {
    id: string;
    name: string;
    email: string;
    phone: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

const prisma = new PrismaClient();

export const SECRET: string = process.env['SECRET_KEY'] ?
    process.env['SECRET_KEY']
    :
    (() => { throw new Error('SECRET_KEY not defined') })();


const PORT: number = 3000;

app.get("/", (_req, res: Response) => {
    res.json({ message: "Helloo!!!" });
})

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})