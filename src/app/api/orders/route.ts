import { NextResponse } from "next/server";
import { getAllOrders, createOrder, getProductById, CustomerOrder } from "@/lib/db/store";

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.productId || !body.buyerName || !body.buyerPhone) {
      return NextResponse.json(
        { error: "Missing required fields: productId, buyerName, buyerPhone" },
        { status: 400 }
      );
    }

    const product = getProductById(body.productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const quantity = Number(body.quantity) || 1;
    const unitPrice = product.priceINR;
    const totalPrice = unitPrice * quantity;
    const artisanPayout = Math.round(product.breakdown.artisanDirectPayoutINR * quantity);

    const newOrder: CustomerOrder = {
      orderId: `KS-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      buyerName: body.buyerName,
      buyerPhone: body.buyerPhone,
      deliveryDistrict: body.deliveryDistrict || "Bengaluru Urban",
      deliveryAddress: body.deliveryAddress || "Standard Delivery",
      paymentMethod: body.paymentMethod || "UPI",
      status: "CONFIRMED",
      items: [
        {
          productId: product.id,
          productTitle: product.title,
          craftType: product.craftType,
          quantity,
          unitPriceINR: unitPrice,
          totalPriceINR: totalPrice,
          artisanName: product.artisanName,
          artisanPayoutINR: artisanPayout,
        },
      ],
      totalAmountINR: totalPrice,
      totalArtisanPayoutINR: artisanPayout,
    };

    const savedOrder = createOrder(newOrder);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully. Direct artisan payout registered.",
      order: savedOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to place order", details: String(error) },
      { status: 500 }
    );
  }
}
