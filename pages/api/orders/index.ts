import type { NextApiRequest, NextApiResponse } from 'next'
import getPrismaClient from "@/prisma/lib/getPrismaClient";


//get products
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const prisma = getPrismaClient();
  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { delivery_address, delivery_phone, items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Items must be a non-empty array",
      });
    }

    let total_amount = 0;

    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { product_id: item.product_id },
      });

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product_id}`,
        });
      }

      // Stock check
      if (product.quantity < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
          available: product.quantity,
        });
      }

      // Use DB price
      const unit_price = Number(product.discount_price ?? product.price);

      total_amount += unit_price * item.qty;

      
    }

    const order = await prisma.orders.create({
      data: {
        delivery_address,
        delivery_phone,
        total_amount,

        order_item: {
          create: orderItemsData,
        },
      },
      include: {
        order_item: true,
      },
    });

    for (const item of items) {
      await prisma.product.update({
        where: { product_id: item.product_id },
        data: {
          quantity: {
            decrement: item.qty,
          },
        },
      });
    }

    return res.status(201).json({
      message: "Order created successfully",
      order_id: order.order_id,
      total_amount: order.total_amount,
      items: order.order_item,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return res.status(500).json({
      message: "Something went wrong while creating order",
      error: String(error),
    });
  }
}
