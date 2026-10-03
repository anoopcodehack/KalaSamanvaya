export interface CraftCostBreakdown {
  handcraftHours: number;
  artisanDirectPayoutINR: number;
  rawMaterialsINR: number;
  clusterPackagingLogisticsINR: number;
  platformCoordinationFeeINR: number;
  powerloomMachinePrintCompareINR: number;
  powerloomMachineMinutes: number;
  artisanSharePercent: number;
  materialsUsed: string;
  techniqueName: string;
  regionalHeritageNote: string;
}

export interface ArtisanProduct {
  id: string;
  title: string;
  kannadaTitle: string;
  craftType: "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Woodcraft";
  categoryLabel: string;
  priceINR: number;
  compareAtPriceINR: number;
  rating: number;
  reviewsCount: number;
  badge: "GI Tagged Heritage" | "Exclusive Handloom" | "Cluster Classic" | "Limited Artisan Batch";
  artisanName: string;
  artisanKannadaName: string;
  artisanCluster: string;
  artisanDistrict: string;
  leadTimeDays: number;
  stockAvailable: number;
  imageUrl: string;
  shortDescription: string;
  craftStory: string;
  breakdown: CraftCostBreakdown;
  tags: string[];
}

export const ARTISAN_PRODUCTS: ArtisanProduct[] = [
  {
    id: "prod-kasuti-01",
    title: "Dharwad Heritage Kasuti Silk Shawl",
    kannadaTitle: "ಧಾರವಾಡ ಪರಂಪರೆಯ ಕಸೂತಿ ರೇಷ್ಮೆ ಶಾಲು",
    craftType: "Kasuti",
    categoryLabel: "Kasuti Embroidery",
    priceINR: 1850,
    compareAtPriceINR: 2400,
    rating: 4.9,
    reviewsCount: 52,
    badge: "GI Tagged Heritage",
    artisanName: "Savita Naik",
    artisanKannadaName: "ಸವಿತಾ ನಾಯ್ಕ್",
    artisanCluster: "Dharwad Central Sangha",
    artisanDistrict: "Dharwad",
    leadTimeDays: 7,
    stockAvailable: 24,
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Hand-stitched counted-thread Kasuti with traditional Gopura & Chariot motifs on pure handloom silk-cotton.",
    craftStory: "Kasuti is an intricate 7th-century Chalukyan embroidery style from northern Karnataka. Each motif is created by hand without tracing, counting the warp and weft threads one by one. The Gavanti (double running) and Murgi (zig-zag) stitches make both sides of the fabric appear identical with zero knots visible.",
    breakdown: {
      handcraftHours: 38,
      artisanDirectPayoutINR: 1380,
      rawMaterialsINR: 320,
      clusterPackagingLogisticsINR: 80,
      platformCoordinationFeeINR: 70,
      powerloomMachinePrintCompareINR: 380,
      powerloomMachineMinutes: 3,
      artisanSharePercent: 75,
      materialsUsed: "100% Pure Mulberry Silk thread & Handloom Khadi Cotton base, certified azo-free vegetable dyes.",
      techniqueName: "Counted-Thread Gavanti & Murgi Needlework",
      regionalHeritageNote: "GI Application No. 85 certified Karnataka craft tradition dating back to 640 CE."
    },
    tags: ["GI Tagged", "Handloom Silk", "Dharwad Cluster", "Zero Middlemen"]
  },
  {
    id: "prod-beedu-01",
    title: "Hand-Woven Beedu Wildgrass Storage Hamper",
    kannadaTitle: "ಕೈಯಿಂದ ನೇಯ್ದ ಬೀಡು ಹುಲ್ಲಿನ ಸಂಗ್ರಹಣಾ ಬುಟ್ಟಿ",
    craftType: "Beedu",
    categoryLabel: "Beedu Basketry",
    priceINR: 920,
    compareAtPriceINR: 1250,
    rating: 4.8,
    reviewsCount: 38,
    badge: "Exclusive Handloom",
    artisanName: "Janaki Poojary",
    artisanKannadaName: "ಜಾನಕಿ ಪೂಜಾರಿ",
    artisanCluster: "Padubidri Coastal Cooperative",
    artisanDistrict: "Udupi",
    leadTimeDays: 5,
    stockAvailable: 35,
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Sustainably harvested coastal wildgrass, coiled and hand-plaited using traditional riverside methods.",
    craftStory: "Beedu basketry is an indigenous craft practiced by coastal artisans using riparian river grass. The wild stalks are sun-cured for three weeks and woven tightly into durable, moisture-resistant baskets without any synthetic binders or chemical coatings.",
    breakdown: {
      handcraftHours: 14,
      artisanDirectPayoutINR: 690,
      rawMaterialsINR: 130,
      clusterPackagingLogisticsINR: 60,
      platformCoordinationFeeINR: 40,
      powerloomMachinePrintCompareINR: 220,
      powerloomMachineMinutes: 1,
      artisanSharePercent: 75,
      materialsUsed: "Naturally harvested Karnataka coastal river grass, raw jute fiber, sun-cured organic reeds.",
      techniqueName: "Multi-strand Coiled Wildgrass Weave",
      regionalHeritageNote: "Eco-friendly coastal tradition preserving indigenous tribal weaving wisdom."
    },
    tags: ["100% Organic", "Biodegradable", "Coastal Crafts", "Direct Payout"]
  },
  {
    id: "prod-pottery-01",
    title: "Coastal Burnished Terracotta Water Jug",
    kannadaTitle: "ಕರಾವಳಿ ಹೊಳಪುಳ್ಳ ಜೇಡಿಮಣ್ಣಿನ ನೀರಿನ ಜಗ್ಗು",
    craftType: "Pottery",
    categoryLabel: "Coastal Pottery",
    priceINR: 750,
    compareAtPriceINR: 980,
    rating: 4.9,
    reviewsCount: 44,
    badge: "Cluster Classic",
    artisanName: "Shankara Kumbhara",
    artisanKannadaName: "ಶಂಕರ ಕುಂಬಾರ",
    artisanCluster: "Gurupura Potter Colony",
    artisanDistrict: "Dakshina Kannada",
    leadTimeDays: 4,
    stockAvailable: 40,
    imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Wheel-thrown river silt terracotta with river stone burnishing for natural alkaline water cooling.",
    craftStory: "Crafted on a manual wooden potter's wheel using red clay harvested from the Netravati riverbed. The unique smooth sheen is achieved not by chemical glaze, but by painstakingly burnishing the surface with smooth coastal agate stones before wood-firing in an underground kiln.",
    breakdown: {
      handcraftHours: 10,
      artisanDirectPayoutINR: 560,
      rawMaterialsINR: 110,
      clusterPackagingLogisticsINR: 50,
      platformCoordinationFeeINR: 30,
      powerloomMachinePrintCompareINR: 190,
      powerloomMachineMinutes: 2,
      artisanSharePercent: 75,
      materialsUsed: "Netravati riverbed clay, fine beach sand, wood ash, untreated natural river stone polish.",
      techniqueName: "Manual Wheel Throwing & Agate Stone Burnishing",
      regionalHeritageNote: "Natural pore architecture cools water naturally by up to 5°C without electricity."
    },
    tags: ["Natural Cooling", "Non-Toxic", "Netravati Clay", "Artisan Wheel"]
  },
  {
    id: "prod-kasuti-02",
    title: "Navalgund Peacock Motif Kasuti Stole",
    kannadaTitle: "ನವಲಗುಂದ ನವಿಲು ವಿನ್ಯಾಸದ ಕಸೂತಿ ಶಾಲು",
    craftType: "Kasuti",
    categoryLabel: "Kasuti Embroidery",
    priceINR: 2150,
    compareAtPriceINR: 2800,
    rating: 5.0,
    reviewsCount: 29,
    badge: "Limited Artisan Batch",
    artisanName: "Renuka Badiger",
    artisanKannadaName: "ರೇಣುಕಾ ಬಡಿಗೇರ್",
    artisanCluster: "Navalgund Women's Collective",
    artisanDistrict: "Dharwad",
    leadTimeDays: 10,
    stockAvailable: 15,
    imageUrl: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Dense peacock (Mayura) embroidery featuring over 12,000 individual hand stitches on raw Tussar silk.",
    craftStory: "Embroidered by master artisan Renuka Badiger, featuring the iconic Navalgund Mayura design. Requires three full weeks of focused needlework where four separate embroidery stitches (Gavanti, Murgi, Neygi, Menthi) are combined to form a sacred geometric grid.",
    breakdown: {
      handcraftHours: 46,
      artisanDirectPayoutINR: 1620,
      rawMaterialsINR: 360,
      clusterPackagingLogisticsINR: 90,
      platformCoordinationFeeINR: 80,
      powerloomMachinePrintCompareINR: 420,
      powerloomMachineMinutes: 4,
      artisanSharePercent: 75,
      materialsUsed: "Cruelty-free wild Tussar silk base, pure mercerized cotton threads, natural indigo and madder dye.",
      techniqueName: "Quad-Stitch Kasuti (Gavanti, Murgi, Neygi, Menthi)",
      regionalHeritageNote: "Preserves the royal Vijayanagara court embroidery patterns of North Karnataka."
    },
    tags: ["Tussar Silk", "Master Artisan", "Navalgund Cluster", "Handmade"]
  },
  {
    id: "prod-bidri-01",
    title: "Bidar Pure Silver Inlay Heritage Coaster Set",
    kannadaTitle: "ಬೀದರ್ ಶುದ್ಧ ಬೆಳ್ಳಿ ಕೆತ್ತನೆಯ ಪಾರಂಪರಿಕ ಕೋಸ್ಟರ್ ಸೆಟ್",
    craftType: "Bidriware",
    categoryLabel: "Bidriware & Metalcraft",
    priceINR: 1650,
    compareAtPriceINR: 2200,
    rating: 4.9,
    reviewsCount: 31,
    badge: "GI Tagged Heritage",
    artisanName: "Mohammed Rafeeq",
    artisanKannadaName: "ಮೊಹಮ್ಮದ್ ರಫೀಕ್",
    artisanCluster: "Bidar Old Fort Artisan Guild",
    artisanDistrict: "Bidar",
    leadTimeDays: 6,
    stockAvailable: 20,
    imageUrl: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Zinc-copper alloy blackened with historic Bidar fort soil, inlaid with pure 99.9% fine silver wires.",
    craftStory: "Bidriware is Karnataka's world-renowned 14th-century metal craft originating from the Bahmani Sultans. Pure silver sheet or wire is hand-chiseled into blackened zinc alloy. The jet-black patina is created using soil uniquely found inside the 500-year-old Bidar Fort grounds.",
    breakdown: {
      handcraftHours: 22,
      artisanDirectPayoutINR: 1220,
      rawMaterialsINR: 280,
      clusterPackagingLogisticsINR: 85,
      platformCoordinationFeeINR: 65,
      powerloomMachinePrintCompareINR: 320,
      powerloomMachineMinutes: 2,
      artisanSharePercent: 74,
      materialsUsed: "99.9% Fine Silver wire inlay, Zinc-Copper casting alloy, authentic Bidar Fort mineral soil.",
      techniqueName: "Tarkashi (Fine Silver Wire Inlay) & Fort Soil Patination",
      regionalHeritageNote: "GI Tagged Karnataka metal art form protected under Geographical Indications."
    },
    tags: ["GI Tagged", "Pure Silver", "Bidar Craft", "Heritage Metal"]
  },
  {
    id: "prod-pottery-02",
    title: "Udupi Hand-Coiled Terracotta Plant Urn",
    kannadaTitle: "ಉಡುಪಿ ಕೈಯಿಂದ ರೂಪಿಸಿದ ಜೇಡಿಮಣ್ಣಿನ ಗಿಡದ ಮಡಿಕೆ",
    craftType: "Pottery",
    categoryLabel: "Coastal Pottery",
    priceINR: 890,
    compareAtPriceINR: 1150,
    rating: 4.7,
    reviewsCount: 26,
    badge: "Cluster Classic",
    artisanName: "Girija Kulkarni",
    artisanKannadaName: "ಗಿರಿಜಾ ಕುಲಕರ್ಣಿ",
    artisanCluster: "Anegudde Village Cluster",
    artisanDistrict: "Udupi",
    leadTimeDays: 5,
    stockAvailable: 28,
    imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Unglazed breathable terracotta planter featuring hand-pressed coastal floral reliefs.",
    craftStory: "Hand-coiled using coastal laterite soil and tempered with fine river sand. The unglazed micro-porous walls allow plant roots to breathe and maintain natural thermal balance in high summer.",
    breakdown: {
      handcraftHours: 12,
      artisanDirectPayoutINR: 660,
      rawMaterialsINR: 125,
      clusterPackagingLogisticsINR: 65,
      platformCoordinationFeeINR: 40,
      powerloomMachinePrintCompareINR: 240,
      powerloomMachineMinutes: 1,
      artisanSharePercent: 74,
      materialsUsed: "Coastal Laterite red clay, organic husk temper, natural iron-oxide wash.",
      techniqueName: "Pinch & Coil Clay Sculpting with Wood-Pit Firing",
      regionalHeritageNote: "Centuries-old coastal Karnataka home pottery tradition."
    },
    tags: ["Breathable Terracotta", "Eco-friendly", "Udupi Craft", "Handmade"]
  }
];
