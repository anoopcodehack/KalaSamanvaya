import { NextResponse } from "next/server";
import { allocateBulkOrder } from "@/lib/engine/allocator";
import { MOCK_ARTISANS } from "@/lib/db/mockData";
import { BulkOrderRequirement, CraftType } from "@/lib/engine/types";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const isShortfall = searchParams.get("scenario") === "shortfall" || searchParams.get("capacity") === "160";
  
  let artisansToUse = MOCK_ARTISANS;
  if (isShortfall) {
    artisansToUse = MOCK_ARTISANS.map((a) => {
      if (a.id === "art-kasuti-01") return { ...a, availableCapacity: 60 };
      if (a.id === "art-kasuti-02") return { ...a, availableCapacity: 50 };
      if (a.id === "art-kasuti-03") return { ...a, availableCapacity: 50 };
      if (a.id === "art-kasuti-04") return { ...a, availableCapacity: 0 };
      return a;
    });
  }

  const result = allocateBulkOrder(artisansToUse, {
    orderId: "ORD-200-KASUTI",
    craft: "Kasuti",
    requiredQuantity: 200,
    deliveryDeadlineDays: 30,
    destinationDistrict: "Bengaluru",
    budgetPerUnitINR: 1600,
  });

  return NextResponse.json({
    ...result,
    shortfallDetected: result.shortfall > 0,
    shortfallAlert: result.shortfall > 0
      ? `🚨 ${result.shortfall}-Unit Shortfall Detected! (160 / 200 Units Allocated). Cluster capacity cap reached.`
      : null,
  });
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

    let artisansToUse = MOCK_ARTISANS;
    if (body.clusterCapacityCap === 160 || body.scenario === "shortfall") {
      artisansToUse = MOCK_ARTISANS.map((a) => {
        if (a.id === "art-kasuti-01") return { ...a, availableCapacity: 60 };
        if (a.id === "art-kasuti-02") return { ...a, availableCapacity: 50 };
        if (a.id === "art-kasuti-03") return { ...a, availableCapacity: 50 };
        if (a.id === "art-kasuti-04") return { ...a, availableCapacity: 0 };
        return a;
      });
    }

    const result = allocateBulkOrder(artisansToUse, order);

    return NextResponse.json({
      ...result,
      shortfallDetected: result.shortfall > 0,
      shortfallAlert: result.shortfall > 0
        ? `🚨 ${result.shortfall}-Unit Shortfall Detected! Total cluster capacity (${result.totalAllocated}) is below required demand (${order.requiredQuantity}).`
        : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to execute allocation", details: String(error) },
      { status: 500 }
    );
  }
}
