import { Artisan, BulkOrderRequirement, AllocationResult, AllocationItem } from "./types";
import { calculateMatchScore } from "./scoring";

/**
 * Sequential Greedy Allocation Algorithm with Hard Craft Filtering
 * 
 * 1. Hard Filter: Match craft type strictly (Kasuti !== Pottery).
 * 2. Score & Rank: Compute S_i = 0.45*A_i + 0.35*T_i + 0.20*L_i and sort descending.
 * 3. Sequential Allocation:
 *    a_i = min(c_i, D - \sum_{j=1}^{i-1} a_j)
 * 4. Shortfall Detection & Standby Capacity Tracking
 */
export function allocateBulkOrder(
  artisans: Artisan[],
  order: BulkOrderRequirement
): AllocationResult {
  // Step 1: Hard Craft Filter
  const craftCompatible = artisans.filter(
    (a) => a.craft.toLowerCase() === order.craft.toLowerCase() && a.availableCapacity > 0
  );

  // Step 2: Score & Rank candidates
  const scoredArtisans = craftCompatible.map((artisan) => ({
    artisan,
    scoreBreakdown: calculateMatchScore(artisan, order),
  }));

  // Sort descending by composite score, break ties by available capacity
  scoredArtisans.sort((a, b) => {
    if (b.scoreBreakdown.compositeScore !== a.scoreBreakdown.compositeScore) {
      return b.scoreBreakdown.compositeScore - a.scoreBreakdown.compositeScore;
    }
    return b.artisan.availableCapacity - a.artisan.availableCapacity;
  });

  // Step 3: Sequential Allocation
  let remainingNeeded = order.requiredQuantity;
  const allocations: AllocationItem[] = [];
  const standbyArtisans: {
    artisanId: string;
    artisanName: string;
    unallocatedCapacity: number;
    score: number;
  }[] = [];

  for (const item of scoredArtisans) {
    const { artisan, scoreBreakdown } = item;
    
    if (remainingNeeded > 0) {
      // a_i = min(c_i, remainingNeeded)
      const allocatedUnits = Math.min(artisan.availableCapacity, remainingNeeded);
      remainingNeeded -= allocatedUnits;

      allocations.push({
        artisanId: artisan.id,
        artisanName: artisan.name,
        kannadaName: artisan.kannadaName,
        clusterName: artisan.location.clusterName,
        allocatedUnits,
        availableCapacityBefore: artisan.availableCapacity,
        remainingCapacityAfter: artisan.availableCapacity - allocatedUnits,
        scoreBreakdown,
      });

      // If artisan still has leftover capacity, record as standby buffer
      const leftover = artisan.availableCapacity - allocatedUnits;
      if (leftover > 0) {
        standbyArtisans.push({
          artisanId: artisan.id,
          artisanName: artisan.name,
          unallocatedCapacity: leftover,
          score: scoreBreakdown.compositeScore,
        });
      }
    } else {
      // Artisans not needed for initial fulfillment serve as standby capacity
      standbyArtisans.push({
        artisanId: artisan.id,
        artisanName: artisan.name,
        unallocatedCapacity: artisan.availableCapacity,
        score: scoreBreakdown.compositeScore,
      });
    }
  }

  const totalAllocated = order.requiredQuantity - remainingNeeded;
  const shortfall = Math.max(0, remainingNeeded);

  return {
    orderId: order.orderId,
    craftRequested: order.craft,
    targetQuantity: order.requiredQuantity,
    totalAllocated,
    shortfall,
    isFullyFulfilled: shortfall === 0,
    allocations,
    standbyArtisans,
    timestamp: new Date().toISOString(),
  };
}
