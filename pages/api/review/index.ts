import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  if (req.method === "POST") {
    const { product_id, rating, comment, } = req.body;

    const review = await prisma.product_review.create({
      data: { product_id, rating, comment,  },
    });

    return res.status(201).json(review);
  }

  res.status(405).json({ error: "Only POST allowed" });
}
