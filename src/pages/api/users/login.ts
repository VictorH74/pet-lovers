// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserService } from "@/services/user.service";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string; status: number }>
) {
  try {
    const userData: Pick<User, "email" | "password"> = await req.body;
    const user = await UserService.getUserByEmail(userData.email);

    if (!user)
      return res
        .status(404)
        .send({ message: "Email não encontrado", status: 404 });

    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordCorrect)
      res.status(400).send({ message: "Senha inválida", status: 400 });

    req.session.user = user;
    await req.session.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
