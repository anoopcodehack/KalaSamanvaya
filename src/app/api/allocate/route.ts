import { NextResponse } from "next/server";
import { allocateBulkOrder } from "@/lib/engine/allocator";
import { MOCK_ARTISANS } from "@/lib/db/mockData";
import { BulkOrderRequirement, CraftType } from "@/lib/engine/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = allocateBulkOrder(MOCK_ARTISANS, {
    orderId: "ORD-200-KASUTI",
    craft: "Kasuti",
    requiredQuantity: 200,
    deliveryDeadlineDays: 30,
    destinationDistrict: "Bengaluru",
    budgetPerUnitINR: 1600,
  });
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order: BulkOrderRequirement = {
      orderId: body.orderId || `ORD-${Date.now().toString().slice(-4)}`,
      craft: (body.craft as CraftType) || "Kasuti",
      requiredQuantity: Number(body.requiredQuantity) || 200,
      deliveryDeadlineDays: Number(body.deliveryDeadlineDays) || 30,
      destinationDistrict: body.destinationDistrict || "Bengaluru",
      budgetPerUnitINR: Number(body.budgetPerUnitINR) || 1600,
    };

    const result = allocateBulkOrder(MOCK_ARTISANS, order);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to execute allocation", details: String(error) },
      { status: 500 }
    );
  }
}
