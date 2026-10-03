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
  recoverySummary: {
    deficitCaused: number;
    deficitRecovered: number;
    isCompletelyRecovered: boolean;
    transferredToArtisans: { artisanId: string; addedUnits: number }[];
  };
} {
  // Compute baseline allocation
  const previousResult = allocateBulkOrder(initialArtisans, order);

  // Apply capacity adjustments to pool
  const updatedArtisans: Artisan[] = initialArtisans.map((artisan) => {
    const adj = adjustments.find((a) => a.artisanId === artisan.id);
    if (adj) {
      return {
        ...artisan,
        availableCapacity: Math.max(0, adj.newCapacity),
      };
    }
    return { ...artisan };
  });

  // Re-run deterministic allocation with updated capacities
  const updatedResult = allocateBulkOrder(updatedArtisans, order);

  // Calculate transfer delta
  const transferredToArtisans: { artisanId: string; addedUnits: number }[] = [];
  let deficitCaused = 0;

  for (const adj of adjustments) {
    const prevAlloc = previousResult.allocations.find((a) => a.artisanId === adj.artisanId)?.allocatedUnits || 0;
    const newAlloc = updatedResult.allocations.find((a) => a.artisanId === adj.artisanId)?.allocatedUnits || 0;
    if (prevAlloc > newAlloc) {
      deficitCaused += (prevAlloc - newAlloc);
    }
  }

  for (const newAlloc of updatedResult.allocations) {
    const prevUnits = previousResult.allocations.find((a) => a.artisanId === newAlloc.artisanId)?.allocatedUnits || 0;
    if (newAlloc.allocatedUnits > prevUnits) {
      transferredToArtisans.push({
        artisanId: newAlloc.artisanId,
        addedUnits: newAlloc.allocatedUnits - prevUnits,
      });
    }
  }

  const deficitRecovered = transferredToArtisans.reduce((sum, item) => sum + item.addedUnits, 0);

  return {
    previousResult,
    updatedResult,
    recoverySummary: {
      deficitCaused,
      deficitRecovered,
      isCompletelyRecovered: updatedResult.isFullyFulfilled,
      transferredToArtisans,
    },
  };
}
