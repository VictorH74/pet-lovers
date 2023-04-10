// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client';
import { UserService } from '@/services/user.service';
import { UserException } from '@/exceptions/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Partial<User>[] | { message: string; status?: number }>
) {
    try {
        if (req.method !== "GET") throw new UserException(`Forbidden request method: ${req.method}`)

        const { page = 1, limit = 10 } = req.query;

        const users = await UserService.listUsers(Number(page), Number(limit));
        res.status(200).json(users);

    } catch (error) {

        if (error instanceof UserException) {
            res.status(405).send({ message: error.message, status: 405 })
            return
        }

        if (error instanceof Error) {
            res.status(500).send({ message: error.message, status: 500 })
            return
        }
        console.error(error);
        res.status(500).send({ message: 'Internal server error', status: 500 });
    }
}
