// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserService } from '@/services/user.service';
import { validateLocation } from '@/utils/validations';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | { error: string }>
) {

  if (req.method !== "POST") throw new Error(`Forbidden request method: ${req.method}`)

  try {
    const userData: User = req.body;

    if (userData.location === "" || (userData.location && !validateLocation(userData.location))) {
      throw new Error('Invalid location')
    }

    await UserService.createUser(userData);

    res.status(201).send({ message: "User created!" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message })
      return
    }
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
}