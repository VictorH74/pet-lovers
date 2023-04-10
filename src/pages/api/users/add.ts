// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserService } from "@/services/user.service";
import { validateLocation } from "@/utils/validations";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { message: string } | { message: string; status?: number }
  >
) {
  if (req.method !== "POST")
    throw new Error(`Forbidden request method: ${req.method}`);

  try {
    const userData: User = req.body;

    if (
      userData.location === "" ||
      (userData.location && !validateLocation(userData.location))
    ) {
      return res
        .status(400)
        .send({ message: "Formato de localização inválido", status: 400 });
    }

    await UserService.createUser(userData);

    res.status(201).send({ message: "User created!", status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message, status: 500 });
      return;
    }
    console.error(error);
    res.status(500).send({ message: "Internal server error", status: 500 });
  }
}
