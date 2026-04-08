import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      customerName, 
      customerEmail, 
      address, 
      city, 
      postalCode, 
      country, 
      totalAmount, 
      items 
    } = body

    // Validation
    if (!customerEmail || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create order and items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the order
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          address,
          city,
          postalCode,
          country,
          totalAmount,
          status: 'PENDING',
        },
      })

      // 2. Create order items
      await tx.orderItem.createMany({
        data: items.map((item: any) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      })

      return newOrder
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}
