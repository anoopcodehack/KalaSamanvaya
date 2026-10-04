import { Artisan, BulkOrderRequirement, AllocationResult } from "./types";
import { allocateBulkOrder } from "./allocator";

export interface CapacityAdjustment {
  artisanId: string;
  newCapacity: number;
  reason?: string;
}

/**
 * Dynamic Recalculation Engine
 * Handles artisan capacity drops or dropouts and deterministically rebalances
 * allocation across active and standby artisans.
 */
export function recalculateAllocation(
  initialArtisans: Artisan[],
  order: BulkOrderRequirement,
  adjustments: CapacityAdjustment[]
): {
  previousResult: AllocationResult;
  updatedResult: AllocationResult;
  newAllocation: AllocationResult;
  recoverySummary: {
    deficitCaused: number;
    deficitRecovered: number;
    isCompletelyRecovered: boolean;
    transferredToArtisans: { artisanId: string; addedUnits: number }[];
  };
} {
  // 1. Compute baseline allocation
  const previousResult = allocateBulkOrder(initialArtisans, order);

  // 2. Clone artisans and initial allocation amounts
  const allocationMap = new Map<string, number>();
  for (const item of previousResult.allocations) {
    allocationMap.set(item.artisanId, item.allocatedUnits);
  }

  // 3. Apply capacity reductions to affected artisans
  let deficitCaused = 0;
  for (const adj of adjustments) {
    const currentAlloc = allocationMap.get(adj.artisanId) || 0;
    if (adj.newCapacity < currentAlloc) {
      const drop = currentAlloc - Math.max(0, adj.newCapacity);
      deficitCaused += drop;
      allocationMap.set(adj.artisanId, Math.max(0, adj.newCapacity));
    }
  }

  // 4. Identify candidate artisans for deficit recovery
  // Sorted by composite score descending
  const candidates = initialArtisans
    .filter((a) => a.craft.toLowerCase() === order.craft.toLowerCase())
    .map((a) => {
      const adj = adjustments.find((x) => x.artisanId === a.id);
      const cap = adj !== undefined ? Math.max(0, adj.newCapacity) : a.availableCapacity;
      const currentAlloc = allocationMap.get(a.id) || 0;
      const spareCap = Math.max(0, cap - currentAlloc);
      return { artisan: a, maxCapacity: cap, currentAlloc, spareCap };
    })
    .sort((a, b) => (b.artisan.qualityScore || 0) - (a.artisan.qualityScore || 0));

  let deficitRemaining = deficitCaused;
  const transferredToArtisans: { artisanId: string; addedUnits: number }[] = [];

  for (const cand of candidates) {
    if (deficitRemaining <= 0) break;
    if (cand.spareCap > 0) {
      const absorbed = Math.min(cand.spareCap, deficitRemaining);
      const newTotal = cand.currentAlloc + absorbed;
      allocationMap.set(cand.artisan.id, newTotal);
      transferredToArtisans.push({
        artisanId: cand.artisan.id,
        addedUnits: absorbed,
      });
      deficitRemaining -= absorbed;
    }
  }

  const deficitRecovered = deficitCaused - deficitRemaining;

  // 5. Build updated allocation list
  const updatedAllocations = candidates
    .filter((c) => (allocationMap.get(c.artisan.id) || 0) > 0)
    .map((c) => {
      const units = allocationMap.get(c.artisan.id) || 0;
      const prev = previousResult.allocations.find((a) => a.artisanId === c.artisan.id);
      return {
        artisanId: c.artisan.id,
        artisanName: c.artisan.name,
        kannadaName: c.artisan.kannadaName,
        clusterName: c.artisan.location.clusterName,
        allocatedUnits: units,
        availableCapacityBefore: c.maxCapacity,
        remainingCapacityAfter: c.maxCapacity - units,
        scoreBreakdown: prev?.scoreBreakdown || {
          availabilityScore: 1,
          turnaroundScore: 1,
          locationScore: 1,
          compositeScore: c.artisan.qualityScore || 0.8,
        },
      };
    });

  const updatedStandbys = candidates
    .filter((c) => {
      const allocated = allocationMap.get(c.artisan.id) || 0;
      return c.maxCapacity > allocated;
    })
    .map((c) => {
      const allocated = allocationMap.get(c.artisan.id) || 0;
      return {
        artisanId: c.artisan.id,
        artisanName: c.artisan.name,
        unallocatedCapacity: c.maxCapacity - allocated,
        score: c.artisan.qualityScore || 0.8,
      };
    });

  const totalAllocated = Array.from(allocationMap.values()).reduce((sum, n) => sum + n, 0);
  const shortfall = Math.max(0, order.requiredQuantity - totalAllocated);

  const updatedResult: AllocationResult = {
    orderId: order.orderId,
    craftRequested: order.craft,
    targetQuantity: order.requiredQuantity,
    totalAllocated,
    shortfall,
    isFullyFulfilled: shortfall === 0,
    allocations: updatedAllocations,
    standbyArtisans: updatedStandbys,
    timestamp: new Date().toISOString(),
  };

  return {
    previousResult,
    updatedResult,
    newAllocation: updatedResult,
    recoverySummary: {
      deficitCaused,
      deficitRecovered,
      isCompletelyRecovered: shortfall === 0,
      transferredToArtisans,
    },
  };
}
