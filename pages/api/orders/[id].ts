import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();

  const { id } = req.query;

  const order = await prisma.orders.findUnique({
    where: { order_id: Number(id) },
    include: {
      order_item: {
        include: { product: true },
      },
      payment: true,
    },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
}
