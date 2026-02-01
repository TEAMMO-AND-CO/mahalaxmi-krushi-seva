import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET allowed" });
  }

  const { cart_id } = req.query;

  const items = await prisma.cart_item.findMany({
    where: { cart_id: Number(cart_id) },
    include: { product: true },
  });

  let total = 0;

  for (const item of items) {
    total += Number(item.product.price) * item.qty;
  }

  res.json({
    cart_id,
    total_amount: total,
    items_count: items.length,
  });
}
