import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  const { id } = req.query;

  // Update 
  if (req.method === "PATCH") {
    const { qty } = req.body;

    const updated = await prisma.cart_item.update({
      where: { cart_item_id: Number(id) },
      data: { qty },
    });

    return res.json(updated);
  }
}
