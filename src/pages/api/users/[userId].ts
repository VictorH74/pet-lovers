// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserService } from '@/services/user.service';
import { validateAddress } from '@/utils/validations';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<User> | { error: string } | { message: string }>
) {
  try {
    const userId = req.query.userId as string

    if (!userId) throw new Error("User not found")

    if (req.method === "GET") {
      const user = await UserService.retrieveUser(userId);

      if (!user) throw new Error("User not found")

      // res.status(200).json(formatUser(user));
      res.status(200).json(user);
    }
    else if (req.method === "PUT") {
      const userData: Partial<User> = req.body;

      if (userData.address && !validateAddress(userData.address)) {
        throw new Error('Invalid address')
      }

      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      const user = await UserService.updateUser(userId, userData);
      res.status(200).json(user);
    }
    else if (req.method === "DELETE") {
      await UserService.deleteUser(userId);
      res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message })
      return
    }
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
}