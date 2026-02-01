import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  if (req.method === "POST") {
    const { product_id } = req.body;

    const wish = await prisma.wishlist.create({
      data: { product_id },
    });

    return res.status(201).json(wish);
  }

  res.status(405).json({ error: "Only POST allowed" });
}
