import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.session.user) return {}
        res.send(req.session.user) 
    } catch(e) {
        res.status(500).send({error: "Internal server error"})
    }
}