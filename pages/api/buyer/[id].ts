import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  const { id } = req.query;

  const buyer = await prisma.buyers.findUnique({
    where: { buyer_id: Number(id) },
  });

  if (!buyer) return res.status(404).json({ error: "Buyer not found" });

  res.json(buyer);
}
