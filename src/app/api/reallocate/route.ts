import { NextResponse } from "next/server";
import { recalculateAllocation, CapacityAdjustment } from "@/lib/engine/recalculator";
import { MOCK_ARTISANS } from "@/lib/db/mockData";
import { BulkOrderRequirement, CraftType } from "@/lib/engine/types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order: BulkOrderRequirement = {
      orderId: body.orderId || "ORD-200-KASUTI",
      craft: (body.craft as CraftType) || "Kasuti",
      requiredQuantity: Number(body.requiredQuantity) || 200,
      deliveryDeadlineDays: Number(body.deliveryDeadlineDays) || 30,
      destinationDistrict: body.destinationDistrict || "Bengaluru",
      budgetPerUnitINR: Number(body.budgetPerUnitINR) || 1600,
    };

    // Default simulation scenario: Artisan A drops from 80 to 40
    const adjustments: CapacityAdjustment[] = body.adjustments || [
      { artisanId: "art-kasuti-01", newCapacity: 40, reason: "Illness / capacity reduction" },
    ];

    const result = recalculateAllocation(MOCK_ARTISANS, order, adjustments);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to recalculate allocation", details: String(error) },
      { status: 500 }
    );
  }
}
