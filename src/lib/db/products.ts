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
  craftType: "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Woodcraft" | "Handloom" | "Yakshagana";
  categoryLabel: string;
  priceINR: number;
  compareAtPriceINR: number;
  rating: number;
  reviewsCount: number;
  badge: "GI Tagged Heritage" | "Exclusive Handloom" | "Cluster Classic" | "Limited Artisan Batch" | "Folk Theatre Masterpiece";
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
    imageUrl: "/assets/craft-kasuti.jpg",
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
    imageUrl: "/assets/craft-beedu.jpg",
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
    title: "Khanapur Riverbed Terracotta Water Jug",
    kannadaTitle: "ಖಾನಾಪುರ ಪಾರಂಪರಿಕ ಜೇಡಿಮಣ್ಣಿನ ನೀರಿನ ಜಗ್ಗು",
    craftType: "Pottery",
    categoryLabel: "Khanapur Terracotta",
    priceINR: 750,
    compareAtPriceINR: 980,
    rating: 4.9,
    reviewsCount: 44,
    badge: "Cluster Classic",
    artisanName: "Vitthala Kumbhara",
    artisanKannadaName: "ವಿಟ್ಠಲ ಕುಂಬಾರ",
    artisanCluster: "Khanapur Terracotta Guild",
    artisanDistrict: "Belagavi",
    leadTimeDays: 4,
    stockAvailable: 40,
    imageUrl: "/assets/craft-belagavi-terracotta.jpg",
    shortDescription: "Traditional wheel-thrown Belagavi red clay pottery crafted from Malaprabha riverbed silt with agate stone burnishing.",
    craftStory: "Crafted on a manual wooden wheel by the traditional Kumbhara pottery collective of Khanapur, Belagavi. Sourced from the rich alluvial clay of the Malaprabha riverbed and burnished with smooth river stones before wood-firing in traditional earthen kilns.",
    breakdown: {
      handcraftHours: 10,
      artisanDirectPayoutINR: 560,
      rawMaterialsINR: 110,
      clusterPackagingLogisticsINR: 50,
      platformCoordinationFeeINR: 30,
      powerloomMachinePrintCompareINR: 190,
      powerloomMachineMinutes: 2,
      artisanSharePercent: 75,
      materialsUsed: "Malaprabha riverbed red clay, fine river sand, wood ash, untreated natural river stone polish.",
      techniqueName: "Manual Wheel Throwing & Agate Stone Burnishing",
      regionalHeritageNote: "Natural pore architecture cools water naturally by up to 5°C without electricity."
    },
    tags: ["Belagavi Craft", "Natural Cooling", "Non-Toxic", "Khanapur Clay", "Artisan Wheel", "Terracotta", "Pottery"]
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
    imageUrl: "/assets/craft-kasuti-peacock.jpg",
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
    imageUrl: "/assets/craft-bidri.jpg",
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
    categoryLabel: "Udupi Terracotta",
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
    imageUrl: "/assets/craft-pottery-urn.jpg",
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
    tags: ["Breathable Terracotta", "Eco-friendly", "Udupi Craft", "Handmade", "Pottery", "Terracotta"]
  },
  {
    id: "prod-wood-01",
    title: "Channapatna Handcrafted Lacquer Wooden Rocking Horse & Tops",
    kannadaTitle: "ಚನ್ನಪಟ್ಟಣ ನೈಸರ್ಗಿಕ ಬಣ್ಣದ ಮರದ ಆಟಿಕೆಗಳು",
    craftType: "Woodcraft",
    categoryLabel: "Channapatna Woodcraft",
    priceINR: 1150,
    compareAtPriceINR: 1500,
    rating: 4.9,
    reviewsCount: 48,
    badge: "GI Tagged Heritage",
    artisanName: "Subbanna Achar",
    artisanKannadaName: "ಸುಬ್ಬಣ್ಣ ಆಚಾರ್",
    artisanCluster: "Channapatna Toy Artisans Sangha",
    artisanDistrict: "Ramanagara",
    leadTimeDays: 5,
    stockAvailable: 30,
    imageUrl: "/assets/craft-channapatna.jpg",
    shortDescription: "Non-toxic vegetable dyed Ivory-wood lacquerware hand-turned on traditional artisan lathe.",
    craftStory: "Channapatna toys trace their royal legacy to Tipu Sultan who invited Persian artisans to train Karnataka woodturners. Crafted exclusively from Wrightia tinctoria (Aale mara / ivory wood) and polished using natural shellac infused with turmeric, indigo, and katha vegetable dyes.",
    breakdown: {
      handcraftHours: 16,
      artisanDirectPayoutINR: 820,
      rawMaterialsINR: 180,
      clusterPackagingLogisticsINR: 80,
      platformCoordinationFeeINR: 70,
      powerloomMachinePrintCompareINR: 260,
      powerloomMachineMinutes: 2,
      artisanSharePercent: 71,
      materialsUsed: "Locally sourced Ivory wood (Aale Mara), organic seedlac, turmeric & kumkum vegetable colors.",
      techniqueName: "Traditional Lathe Turning & Friction Lacquer Polish",
      regionalHeritageNote: "GI Tag No. 23 protected Karnataka craft, renowned worldwide as the Toy City heritage."
    },
    tags: ["GI Tagged", "Non-Toxic", "Channapatna", "Vegetable Dyes", "Kids Safe"]
  },
  {
    id: "prod-udupi-saree-01",
    title: "Udupi GI Heritage Handloom Cotton Saree",
    kannadaTitle: "ಉಡುಪಿ ಜಿಐ ಮಾನ್ಯತೆಯ ಕೈಮಗ್ಗ ಹತ್ತಿ ಸೀರೆ",
    craftType: "Handloom",
    categoryLabel: "Udupi Handloom",
    priceINR: 2350,
    compareAtPriceINR: 3200,
    rating: 4.9,
    reviewsCount: 36,
    badge: "GI Tagged Heritage",
    artisanName: "Mohini Shettigar",
    artisanKannadaName: "ಮೋಹಿನಿ ಶೆಟ್ಟಿಗಾರ್",
    artisanCluster: "Talipady Weavers Cooperative Society",
    artisanDistrict: "Udupi",
    leadTimeDays: 8,
    stockAvailable: 22,
    imageUrl: "/assets/craft-udupi-saree.jpg",
    shortDescription: "Authentic 80-count combed cotton saree woven on traditional coastal Malabar frame looms with natural dyes.",
    craftStory: "Practiced for over 150 years in coastal Karnataka, Udupi sarees are woven by the Shettigar community on Malabar frame looms using combed fine cotton. The fabric is starched with boiled tapioca and treated with natural vegetable dyes, making it exceptionally breathable in coastal humidity and softer with every wash.",
    breakdown: {
      handcraftHours: 24,
      artisanDirectPayoutINR: 1780,
      rawMaterialsINR: 370,
      clusterPackagingLogisticsINR: 110,
      platformCoordinationFeeINR: 90,
      powerloomMachinePrintCompareINR: 450,
      powerloomMachineMinutes: 4,
      artisanSharePercent: 76,
      materialsUsed: "Combed 80s count organic cotton yarn, natural vegetable dye, organic tapioca sizing.",
      techniqueName: "Malabar Frame Loom Hand-Weaving with Shuttle Shuttle Technique",
      regionalHeritageNote: "GI Application No. 433 certified coastal Karnataka handloom heritage."
    },
    tags: ["GI Tagged", "Coastal Handloom", "100% Cotton", "Udupi Weavers", "Eco-friendly", "Direct Payout"]
  },
  {
    id: "prod-yakshagana-01",
    title: "Yakshagana Handcrafted Kireeta & Folk Regalia",
    kannadaTitle: "ಕರಾವಳಿ ಯಕ್ಷಗಾನ ಪಾರಂಪರಿಕ ಕಿರೀಟ ಮತ್ತು ರಂಗ ಪರಿಕರ",
    craftType: "Yakshagana",
    categoryLabel: "Yakshagana Regalia",
    priceINR: 3450,
    compareAtPriceINR: 4800,
    rating: 5.0,
    reviewsCount: 19,
    badge: "Folk Theatre Masterpiece",
    artisanName: "Ganesh Acharya",
    artisanKannadaName: "ಗಣೇಶ್ ಆಚಾರ್ಯ",
    artisanCluster: "Honnavar Yakshagana Shilpa Guild",
    artisanDistrict: "Uttara Kannada",
    leadTimeDays: 14,
    stockAvailable: 12,
    imageUrl: "/assets/craft-yakshagana.jpg",
    shortDescription: "Ceremonial coastal folk dance headgear hand-sculpted from light Honne wood with golden foil embossing and mirror inlays.",
    craftStory: "Yakshagana is coastal Karnataka's 800-year-old traditional folk dance-theatre. Each Kireeta (ceremonial crown) is carved by master wood sculptors in Honnavar and Kundapur from lightweight local wood, hand-embossed with gold and brass foils, and adorned with intricate mirror and bead inlays to reflect temple stage torchlight.",
    breakdown: {
      handcraftHours: 42,
      artisanDirectPayoutINR: 2650,
      rawMaterialsINR: 520,
      clusterPackagingLogisticsINR: 150,
      platformCoordinationFeeINR: 130,
      powerloomMachinePrintCompareINR: 650,
      powerloomMachineMinutes: 8,
      artisanSharePercent: 77,
      materialsUsed: "Light Honne & Balsa seasoned wood, embossed gold-lacquered brass foil, imported convex mirror inlays.",
      techniqueName: "Manual Relief Woodcarving, Brass Repoussé & Mirror Setting",
      regionalHeritageNote: "Coastal Tulunadu and Uttara Kannada centuries-old temple theatre tradition."
    },
    tags: ["Coastal Karnataka", "Yakshagana", "Masterpiece", "Woodcarving", "Mirror Work", "Honnavar", "Udupi"]
  }
];
