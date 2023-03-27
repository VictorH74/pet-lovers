// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { UserService } from '@/services/user.service';
import { SECRET } from '@/utils/constants';

type Data = {
    token: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | { error: string }>
) {
    try {
        const userData: Pick<User, "email" | "password"> = req.body;
        const user = await UserService.getUserToken(userData);

        if (!user) throw new Error("Invalid email");

        const isPasswordCorrect = await bcrypt.compare(userData.password, user.password);

        if (!isPasswordCorrect) throw new Error("Invalid password");

        const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

        return res.send({ token });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
            return;
        }
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
