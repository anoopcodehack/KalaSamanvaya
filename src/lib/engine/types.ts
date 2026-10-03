export type CraftType = 
  | "Kasuti" 
  | "Pottery" 
  | "Beedu" 
  | "Channapatna" 
  | "Kinnal";

export interface ArtisanLocation {
  district: string;
  taluk: string;
  clusterName: string;
  distanceKm: number; // Distance to primary logistics hub (e.g., Mangaluru / Bengaluru)
}

export interface Artisan {
  id: string;
  name: string;
  kannadaName: string;
  phone: string;
  craft: CraftType;
  location: ArtisanLocation;
  totalMonthlyCapacity: number; // e.g. 80 units
  availableCapacity: number;    // current uncommitted capacity
  leadTimeDays: number;         // production lead time per batch
  qualityScore: number;         // 0.0 to 1.0 (historical craftsmanship rating)
  onboardingDate: string;
  isStandby: boolean;
}

export interface BulkOrderRequirement {
  orderId: string;
  craft: CraftType;
  requiredQuantity: number;
  deliveryDeadlineDays: number;
  destinationDistrict: string;
  budgetPerUnitINR: number;
}

export interface MatchScoreComponents {
  availabilityScore: number; // A_i (0.0 to 1.0)
  turnaroundScore: number;   // T_i (0.0 to 1.0)
  locationScore: number;     // L_i (0.0 to 1.0)
  compositeScore: number;    // S_i = 0.45*A_i + 0.35*T_i + 0.20*L_i
}

export interface AllocationItem {
  artisanId: string;
  artisanName: string;
  kannadaName: string;
  clusterName: string;
  allocatedUnits: number;
  availableCapacityBefore: number;
  remainingCapacityAfter: number;
  scoreBreakdown: MatchScoreComponents;
}

export interface AllocationResult {
  orderId: string;
  craftRequested: CraftType;
  targetQuantity: number;
  totalAllocated: number;
  shortfall: number;
  isFullyFulfilled: boolean;
  allocations: AllocationItem[];
  standbyArtisans: {
    artisanId: string;
    artisanName: string;
    unallocatedCapacity: number;
    score: number;
  }[];
  timestamp: string;
}
