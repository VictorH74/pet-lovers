// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserService } from "@/services/user.service";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";


export default async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<
    Partial<User> | { error: string } | { message: string; status?: number }
  >
) {
  try {
    if (req.method !== "POST")
      throw new Error(`Forbidden request method: ${req.method}`);


    const userId = req.query.userId as string;

    if (!userId)
      return res
        .status(400)
        .send({ message: "Nenhum id de usuário fornecido", status: 400 });

    const user = await UserService.retrieveUser(userId);

    if (!user)
      return res
        .status(404)
        .send({ message: "Usuário não encontrado", status: 404 });

    const { prevPassword, newPassword } = await req.body;

    const isPasswordCorrect = await bcrypt.compare(prevPassword, user.password);

    if (!isPasswordCorrect)
      return res.status(400).send({ message: "Senha inválida", status: 400 });

    let hashedPass = await bcrypt.hash(newPassword, 10);

    const updatedUser = await UserService.updateUser(userId, {
      password: hashedPass,
    });

    res.status(200).send(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
