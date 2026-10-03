import { Artisan, BulkOrderRequirement, MatchScoreComponents } from "./types";

/**
 * Deterministic Matching Score Calculation
 * S_i = 0.45 * A_i + 0.35 * T_i + 0.20 * L_i
 * 
 * - A_i (Availability): Proportion of free capacity relative to monthly capacity
 * - T_i (Turnaround Fit): How well the maker's lead time fits within the required deadline
 * - L_i (Location Fit): Proximity score to logistics consolidation hub
 */
export function calculateMatchScore(
  artisan: Artisan,
  order: BulkOrderRequirement
): MatchScoreComponents {
  // 1. Availability Score (A_i)
  const capacityRatio = artisan.totalMonthlyCapacity > 0 
    ? artisan.availableCapacity / artisan.totalMonthlyCapacity 
    : 0;
  const availabilityScore = Math.max(0, Math.min(1, capacityRatio));

  // 2. Turnaround Fit Score (T_i)
  // Higher score if lead time is well within deadline
  let turnaroundScore = 0;
  if (artisan.leadTimeDays <= order.deliveryDeadlineDays) {
    // Reward buffer margin: lead time / deadline
    const margin = 1 - (artisan.leadTimeDays / (order.deliveryDeadlineDays + 1));
    turnaroundScore = 0.6 + (0.4 * Math.max(0, margin));
  } else {
    // Penalize if lead time exceeds deadline
    turnaroundScore = Math.max(0.1, 0.5 - ((artisan.leadTimeDays - order.deliveryDeadlineDays) * 0.1));
  }

  // 3. Location / Logistics Fit (L_i)
  // Closer to logistics consolidation hub gets higher score (assume max radius 250km)
  const maxRadiusKm = 250;
  const distance = Math.min(artisan.location.distanceKm, maxRadiusKm);
  const locationScore = Math.max(0.2, 1 - (distance / maxRadiusKm));

  // Composite weighted score: S_i = 0.45*A_i + 0.35*T_i + 0.20*L_i
  const compositeScore = Number(
    (0.45 * availabilityScore + 0.35 * turnaroundScore + 0.20 * locationScore).toFixed(4)
  );

  return {
    availabilityScore: Number(availabilityScore.toFixed(3)),
    turnaroundScore: Number(turnaroundScore.toFixed(3)),
    locationScore: Number(locationScore.toFixed(3)),
    compositeScore,
  };
}
