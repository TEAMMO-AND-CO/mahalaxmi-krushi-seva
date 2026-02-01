import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  const { id } = req.query;

  // get
  if (req.method === "GET") {
    const seller = await prisma.seller.findUnique({
      where: { seller_id: Number(id) },
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    return res.json(seller);
  }

  // update
  if (req.method === "PATCH") {
    const { name, contact_phone, contact_email, address } = req.body;

    const updatedSeller = await prisma.seller.update({
      where: { seller_id: Number(id) },
      data: {
        name,
        contact_phone,
        contact_email,
        address,
      },
    });

    return res.json({
      message: "Seller updated successfully",
      updatedSeller,
    });
  }

  // delete
  if (req.method === "DELETE") {
    await prisma.seller.delete({
      where: { seller_id: Number(id) },
    });

    return res.json({ message: "Seller deleted successfully" });
  }

  res.status(405).json({ error: "Method not allowed" });
}
