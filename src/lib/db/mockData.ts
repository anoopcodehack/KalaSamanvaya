import { Artisan } from "../engine/types";

/**
 * Verified Benchmark Dataset for Coastal Karnataka & Dharwad Artisan Clusters
 * Matches the exact demonstrated evaluation scenario:
 * 
 * - Artisan A (Savita Naik): Score 0.94 | Cap 80 | Initial 80 | Recovery 40
 * - Artisan B (Manjula Patil): Score 0.88 | Cap 70 | Initial 70 | Recovery 70
 * - Artisan C (Girija Kulkarni): Score 0.81 | Cap 60 | Initial 50 (10 buffer) | Recovery 60 (absorbs 10)
 * - Artisan D (Renuka Badiger): Score 0.72 | Cap 40 | Initial 0 (standby) | Recovery 30 (standby active)
 */
export const MOCK_ARTISANS: Artisan[] = [
  // --- Kasuti Embroidery Cluster ---
  {
    id: "art-kasuti-01",
    name: "Savita Naik",
    kannadaName: "ಸವಿತಾ ನಾಯಕ್",
    phone: "+91 94812 34567",
    craft: "Kasuti",
    location: {
      district: "Dharwad",
      taluk: "Hubballi",
      clusterName: "Dharwad Kasuti Mahila Kendra",
      distanceKm: 45,
    },
    totalMonthlyCapacity: 80,
    availableCapacity: 80,
    leadTimeDays: 14,
    qualityScore: 0.94,
    onboardingDate: "2026-01-15",
    isStandby: false,
  },
  {
    id: "art-kasuti-02",
    name: "Manjula Patil",
    kannadaName: "ಮಂಜುಳಾ ಪಾಟೀಲ್",
    phone: "+91 94812 76543",
    craft: "Kasuti",
    location: {
      district: "Dharwad",
      taluk: "Dharwad Rural",
      clusterName: "Kalghatgi Artisan Sangha",
      distanceKm: 55,
    },
    totalMonthlyCapacity: 70,
    availableCapacity: 70,
    leadTimeDays: 16,
    qualityScore: 0.88,
    onboardingDate: "2026-02-01",
    isStandby: false,
  },
  {
    id: "art-kasuti-03",
    name: "Girija Kulkarni",
    kannadaName: "ಗಿರಿಜಾ ಕುಲಕರ್ಣಿ",
    phone: "+91 94813 11223",
    craft: "Kasuti",
    location: {
      district: "Udupi",
      taluk: "Karkala",
      clusterName: "Coastal Kasuti Collective",
      distanceKm: 70,
    },
    totalMonthlyCapacity: 60,
    availableCapacity: 60,
    leadTimeDays: 18,
    qualityScore: 0.81,
    onboardingDate: "2026-02-18",
    isStandby: false,
  },
  {
    id: "art-kasuti-04",
    name: "Renuka Badiger",
    kannadaName: "ರೇಣುಕಾ ಬಡಿಗೇರ",
    phone: "+91 94813 99887",
    craft: "Kasuti",
    location: {
      district: "Dharwad",
      taluk: "Navalgund",
      clusterName: "Navalgund Embroidery Group",
      distanceKm: 85,
    },
    totalMonthlyCapacity: 40,
    availableCapacity: 40,
    leadTimeDays: 22,
    qualityScore: 0.72,
    onboardingDate: "2026-03-05",
    isStandby: true,
  },

  // --- Coastal Pottery Cluster ---
  {
    id: "art-pottery-01",
    name: "Sheena Kulal",
    kannadaName: "ಶೀನ ಕುಲಾಲ್",
    phone: "+91 98451 22334",
    craft: "Pottery",
    location: {
      district: "Dakshina Kannada",
      taluk: "Mangaluru Rural",
      clusterName: "Gurupura Terracotta Guild",
      distanceKm: 18,
    },
    totalMonthlyCapacity: 120,
    availableCapacity: 120,
    leadTimeDays: 10,
    qualityScore: 0.95,
    onboardingDate: "2026-01-20",
    isStandby: false,
  },
  {
    id: "art-pottery-02",
    name: "Ramesh Moolya",
    kannadaName: "ರಮೇಶ್ ಮೂಲ್ಯ",
    phone: "+91 98452 33445",
    craft: "Pottery",
    location: {
      district: "Udupi",
      taluk: "Kundapura",
      clusterName: "Koteshwara Clay Crafts",
      distanceKm: 80,
    },
    totalMonthlyCapacity: 90,
    availableCapacity: 90,
    leadTimeDays: 12,
    qualityScore: 0.92,
    onboardingDate: "2026-02-10",
    isStandby: false,
  },

  // --- Beedu & Handloom Weaving Cluster ---
  {
    id: "art-beedu-01",
    name: "Padmavathi Shettigar",
    kannadaName: "ಪದ್ಮಾವತಿ ಶೆಟ್ಟಿಗಾರ್",
    phone: "+91 99001 55667",
    craft: "Beedu",
    location: {
      district: "Udupi",
      taluk: "Udupi",
      clusterName: "Talipady Weavers Society",
      distanceKm: 60,
    },
    totalMonthlyCapacity: 50,
    availableCapacity: 50,
    leadTimeDays: 21,
    qualityScore: 0.97,
    onboardingDate: "2026-01-10",
    isStandby: false,
  }
];
