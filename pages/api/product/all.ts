import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();

  const products = await prisma.product.findMany({
    where: { is_active: true },
    include: {
      category: true,
      seller: true,
      product_image: true,
    },
  });

  return res.status(200).json(products);
}
