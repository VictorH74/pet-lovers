import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { SECRET } from "../server";

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

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" })

    try {
        const payload = jwt.verify(token, SECRET) as UserPayload;
        req.currentUser = payload;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Unauthorized" });
    }
};