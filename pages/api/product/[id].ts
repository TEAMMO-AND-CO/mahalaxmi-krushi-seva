import type { NextApiRequest, NextApiResponse } from "next";
import getPrismaClient from "@/prisma/lib/getPrismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = getPrismaClient();
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  if (req.method === "GET") {
    const product = await prisma.product.findUnique({
      where: { product_id: id },
    });

    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    const updated = await prisma.product.update({
      where: { product_id: id },
      data: req.body, 
    });

    return res.status(200).json(updated);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
