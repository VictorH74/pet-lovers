// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>
) {
  req.session.destroy();
  res.send({ ok: true });
}
