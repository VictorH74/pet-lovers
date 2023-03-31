// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserService } from "@/services/user.service";
// import jwt from "jsonwebtoken";
// import { SECRET } from "@/utils/constants";

// NEW
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

// type Data = {
//   token: string;
// };

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean } | { error: string }>
) {
  try {
    const userData: Pick<User, "email" | "password"> = await req.body;
    const user = await UserService.getUserByEmail(userData.email);

    if (!user) throw new Error("Invalid email");

    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Invalid password");

    // NEW
    req.session.user = user;
    await req.session.save();
    return res.send({ ok: true });

    // const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });

    // return res.send({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
      return;
    }
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}
