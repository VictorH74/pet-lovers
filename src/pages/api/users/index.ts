// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client';
import { UserService } from '@/services/user.service';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<User>[] | { error: string }>
) {
    try {
        if (req.method !== "GET") throw new Error(`Forbidden request method: ${req.method}`)
        const users = await UserService.listUsers();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message })
            return
        }
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}
