// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserService } from "@/services/user.service";
import { validateLocation } from "@/utils/validations";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Partial<User> | { error: string } | { message: string; status?: number }
  >
) {
  try {
    const userId = req.query.userId as string;

    if (!userId)
      return res
        .status(400)
        .send({ message: "Nenhum id de usuário fornecido", status: 400 });

    if (req.method === "GET") {
      const user = await UserService.retrieveUser(userId);

      if (!user)
        return res
          .status(404)
          .send({ message: "Usuário não encontrado", status: 404 });

      // res.status(200).json(formatUser(user));
      res.status(200).json(user);
    } else if (req.method === "PUT") {
      const userData: Partial<User> = req.body;

      if (userData.location && !validateLocation(userData.location)) {
        return res
          .status(400)
          .send({ message: "Formato de endereço inválido", status: 400 });
      }

      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      const user = await UserService.updateUser(userId, userData);
      res.status(200).json(user);
    } else if (req.method === "DELETE") {
      await UserService.deleteUser(userId);
      res.status(200).json({ message: "User deleted", status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
