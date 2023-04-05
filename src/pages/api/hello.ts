// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';

type Data = {
  hash: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let hash = await bcrypt.hash("password123", 10)
  res.status(200).json({ hash })
}
