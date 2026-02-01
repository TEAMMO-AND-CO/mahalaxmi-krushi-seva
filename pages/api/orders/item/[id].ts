import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();

  const { id } = req.query;

  // update
  if (req.method === "PATCH") {
    const { qty, unit_price } = req.body;

    const updated = await prisma.order_item.update({
      where: { order_item_id: Number(id) },
      data: {
        qty,
        unit_price,
      },
    });

    return res.json(updated);
  }

  // delete
  if (req.method === "DELETE") {
    await prisma.order_item.delete({
      where: { order_item_id: Number(id) },
    });

    return res.json({ message: "Order item removed" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
