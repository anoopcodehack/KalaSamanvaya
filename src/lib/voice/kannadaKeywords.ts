export interface ExtractedCraftListing {
  craft: string;
  craftKannada: string;
  itemName: string;
  quantity: number;
  pricePerUnitINR: number;
  totalValueINR: number;
  material: string;
  leadTimeDays: number;
  rawTranscript: string;
  confidence: number;
}

export const KANNADA_CRAFT_DICTIONARY: Record<string, { craft: string; kannada: string; material: string; defaultPrice: number; defaultLead: number; defaultTitle: string }> = {
  // Pure Kannada & Coastal Tulu terms
  "ಬೀಡುದ ಬುಟ್ಟಿ": { craft: "Beedu", kannada: "ಬೀಡು ಬುಟ್ಟಿ (ಕರಾವಳಿ)", material: "Sun-Cured Coastal Wildgrass & Raw Jute", defaultPrice: 450, defaultLead: 10, defaultTitle: "Udupi Coastal Beedu Wildgrass Baskets" },
  "ಬೀಡುದ": { craft: "Beedu", kannada: "ಬೀಡು ಬುಟ್ಟಿ", material: "Coastal Wildgrass & Jute", defaultPrice: 450, defaultLead: 10, defaultTitle: "Udupi Beedu Wildgrass Baskets" },
  "ಬುಟ್ಟಿಲು": { craft: "Beedu", kannada: "ಹುಲ್ಲಿನ ಬುಟ್ಟಿಲು", material: "Coastal Wild Rivergrass", defaultPrice: 450, defaultLead: 10, defaultTitle: "Coastal Handwoven Baskets" },
  "ಮುಟ್ಟಾಲೆ": { craft: "Yakshagana", kannada: "ಕರಾವಳಿ ಮುಟ್ಟಾಲೆ / ಕಿರೀಟ", material: "Traditional Coastal Areca & Wood Craft", defaultPrice: 1250, defaultLead: 7, defaultTitle: "Coastal Tulunadu Traditional Muttale Headgear" },
  "ಯಕ್ಷಗಾನದ ಮುಟ್ಟಾಲೆ": { craft: "Yakshagana", kannada: "ಯಕ್ಷಗಾನ ಮುಟ್ಟಾಲೆ", material: "Carved Wood & Brass Embellishments", defaultPrice: 1850, defaultLead: 10, defaultTitle: "Yakshagana Stage Muttale Headgear" },
  "ಯಕ್ಷಗಾನದ ಕಿರೀಟ": { craft: "Yakshagana", kannada: "ಯಕ್ಷಗಾನ ಕಿರೀಟ", material: "Carved Honne Wood & Gold Foil", defaultPrice: 3450, defaultLead: 14, defaultTitle: "Yakshagana Handcrafted Kireeta" },
  "ಉಡುಪಿದ ಸೀರೆ": { craft: "Handloom", kannada: "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ", material: "100% Combed Organic Cotton", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi GI Heritage Handloom Cotton Sarees" },
  "ಮಣ್ಣ್ದ ಮಡಿಕೆ": { craft: "Pottery", kannada: "ಕರಾವಳಿ ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt & Stone Polish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Coastal Terracotta Earthenware" },
  "ಮಣ್ಣ್ದ ಜಗ್ಗು": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Netravati Riverbed Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Water Jugs" },
  "ಮಣ್ಣ್ದ": { craft: "Pottery", kannada: "ಮಣ್ಣಿನ ಕಲೆ", material: "Riverbed Terracotta Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Artisanal Terracotta Pottery" },
  "ಕಸೂತಿದ ಶಾಲು": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಶಾಲು", material: "Pure Silk Cotton Base", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Heritage Kasuti Silk Shawls" },
  "ಕಸೂತಿ": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಕಲೆ", material: "Pure Mulberry Silk Thread & Handloom Cotton", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Heritage Kasuti Silk Shawls" },
  "ಶಾಲು": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಶಾಲು", material: "Pure Silk Cotton Base", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Heritage Kasuti Silk Shawls" },
  "ಸೀರೆ": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಸೀರೆ", material: "Ilkal Handloom Silk", defaultPrice: 1600, defaultLead: 20, defaultTitle: "Ilkal Kasuti Handcrafted Saree" },
  "ಬೀಡು": { craft: "Beedu", kannada: "ಬೀಡು ಬುಟ್ಟಿ", material: "Sun-Cured Coastal Wildgrass & Raw Jute", defaultPrice: 450, defaultLead: 10, defaultTitle: "Udupi Beedu Wildgrass Baskets" },
  "ಬುಟ್ಟಿ": { craft: "Beedu", kannada: "ಹುಲ್ಲಿನ ಬುಟ್ಟಿ", material: "Natural Wild Rivergrass", defaultPrice: 450, defaultLead: 10, defaultTitle: "Coastal Handwoven Grass Baskets" },
  "ಮಡಿಕೆ": { craft: "Pottery", kannada: "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt & Stone Polish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Coastal Terracotta Water Jugs & Pots" },
  "ಜಗ್ಗು": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay & River Silt", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Water Jugs" },
  "ನೀರಿನ ಜಗ್ಗು": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay & River Silt", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Water Jugs" },
  "ನೀರು": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay & Natural Finish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Terracotta Water Storage Jugs" },
  "ಕುಂಬಾರಿಕೆ": { craft: "Pottery", kannada: "ಕುಂಬಾರಿಕೆ ಕಲೆ", material: "Riverbed Terracotta Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Artisanal Terracotta Earthenware" },
  "ಖಾನಾಪುರ": { craft: "Pottery", kannada: "ಖಾನಾಪುರ ಮಣ್ಣಿನ ಕಲೆ", material: "Malaprabha Riverbed Red Clay", defaultPrice: 750, defaultLead: 7, defaultTitle: "Khanapur Belagavi Terracotta Water Jugs" },
  "ಬೆಳಗಾವಿ": { craft: "Pottery", kannada: "ಬೆಳಗಾವಿ ಮಡಿಕೆ", material: "Malaprabha Riverbed Clay", defaultPrice: 750, defaultLead: 7, defaultTitle: "Belagavi Terracotta Earthenware" },
  "ಉಡುಪಿ ಸೀರೆ": { craft: "Handloom", kannada: "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ", material: "100% Combed Organic Cotton", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi GI Heritage Handloom Cotton Sarees" },
  "ಉಡುಪಿ": { craft: "Handloom", kannada: "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ", material: "100% Combed Organic Cotton", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi GI Heritage Handloom Cotton Sarees" },
  "ಕೈಮಗ್ಗ": { craft: "Handloom", kannada: "ಕೈಮಗ್ಗ ಸೀರೆ", material: "Combed Cotton on Frame Looms", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi Coastal Handloom Sarees" },
  "ಯಕ್ಷಗಾನ": { craft: "Yakshagana", kannada: "ಯಕ್ಷಗಾನ ಕಲೆ", material: "Carved Honne Wood, Brass Foil & Stage Mirrors", defaultPrice: 3450, defaultLead: 14, defaultTitle: "Yakshagana Traditional Stage Kireeta" },
  "ಕಿರೀಟ": { craft: "Yakshagana", kannada: "ಯಕ್ಷಗಾನ ಕಿರೀಟ", material: "Carved Wood & Gold Foil", defaultPrice: 3450, defaultLead: 14, defaultTitle: "Yakshagana Handcrafted Kireeta" },
  "ಬಿದ್ರಿ": { craft: "Bidriware", kannada: "ಬಿದ್ರಿ ಕಲೆ", material: "Zinc-Copper Alloy with Pure Silver Wire", defaultPrice: 1400, defaultLead: 20, defaultTitle: "Bidar Pure Silver Inlay Bidriware" },
  "ಬೆಳ್ಳಿ": { craft: "Bidriware", kannada: "ಬೆಳ್ಳಿ ಕೆತ್ತನೆ", material: "Pure 99.9% Silver Wire", defaultPrice: 1400, defaultLead: 20, defaultTitle: "Bidar Silver Wire Engraved Craft" },
  "ಚನ್ನಪಟ್ಟಣ": { craft: "Channapatna Toys", kannada: "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ", material: "Natural Ivory Wood & Organic Vegetable Dyes", defaultPrice: 550, defaultLead: 12, defaultTitle: "Channapatna Organic Wooden Toys" },
  "ಆಟಿಕೆ": { craft: "Channapatna Toys", kannada: "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ", material: "Natural Ivory Wood & Lacquer Polish", defaultPrice: 550, defaultLead: 12, defaultTitle: "Traditional Lacquer Wooden Toys" },

  // English & Transliterated terms (for bilingual speech / Kanglish / Coastal Tulu terms in English)
  "muttale": { craft: "Yakshagana", kannada: "ಕರಾವಳಿ ಮುಟ್ಟಾಲೆ", material: "Traditional Coastal Areca Craft", defaultPrice: 1250, defaultLead: 7, defaultTitle: "Coastal Tulunadu Muttale Headgear" },
  "beeduda butti": { craft: "Beedu", kannada: "ಬೀಡುದ ಬುಟ್ಟಿ", material: "Coastal Wildgrass & Jute", defaultPrice: 450, defaultLead: 10, defaultTitle: "Udupi Beedu Wildgrass Baskets" },
  "beeduda": { craft: "Beedu", kannada: "ಬೀಡುದ ಬುಟ್ಟಿ", material: "Coastal Wildgrass & Jute", defaultPrice: 450, defaultLead: 10, defaultTitle: "Udupi Beedu Wildgrass Baskets" },
  "khanapur terracotta": { craft: "Pottery", kannada: "ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ", material: "Malaprabha Riverbed Red Clay", defaultPrice: 1200, defaultLead: 10, defaultTitle: "Khanapur Belagavi Terracotta Garden Urn" },
  "belagavi terracotta": { craft: "Pottery", kannada: "ಬೆಳಗಾವಿ ಟೆರಾಕೋಟಾ", material: "Malaprabha Riverbed Red Clay", defaultPrice: 1200, defaultLead: 10, defaultTitle: "Khanapur Belagavi Terracotta Earthenware" },
  "khanapur": { craft: "Pottery", kannada: "ಖಾನಾಪುರ ಮಣ್ಣಿನ ಕಲೆ", material: "Malaprabha Riverbed Red Clay", defaultPrice: 750, defaultLead: 7, defaultTitle: "Khanapur Belagavi Terracotta Water Jugs" },
  "belagavi": { craft: "Pottery", kannada: "ಬೆಳಗಾವಿ ಮಡಿಕೆ", material: "Malaprabha Riverbed Clay", defaultPrice: 750, defaultLead: 7, defaultTitle: "Belagavi Terracotta Earthenware" },
  "udupi sarees": { craft: "Handloom", kannada: "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ", material: "100% Combed Organic Cotton", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi GI Heritage Handloom Cotton Sarees" },
  "udupi saree": { craft: "Handloom", kannada: "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ", material: "100% Combed Organic Cotton", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi GI Heritage Handloom Cotton Sarees" },
  "udupi cotton": { craft: "Handloom", kannada: "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ", material: "100% Combed Organic Cotton", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi GI Heritage Handloom Cotton Sarees" },
  "udupi": { craft: "Handloom", kannada: "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ", material: "100% Combed Organic Cotton", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi GI Heritage Handloom Cotton Sarees" },
  "handloom": { craft: "Handloom", kannada: "ಕೈಮಗ್ಗ ಸೀರೆ", material: "Combed Cotton on Frame Looms", defaultPrice: 2350, defaultLead: 14, defaultTitle: "Udupi Coastal Handloom Sarees" },
  "yakshagana": { craft: "Yakshagana", kannada: "ಯಕ್ಷಗಾನ ಕಲೆ", material: "Carved Honne Wood, Brass Foil & Stage Mirrors", defaultPrice: 3450, defaultLead: 14, defaultTitle: "Yakshagana Traditional Stage Kireeta" },
  "kireeta": { craft: "Yakshagana", kannada: "ಯಕ್ಷಗಾನ ಕಿರೀಟ", material: "Carved Wood & Gold Foil", defaultPrice: 3450, defaultLead: 14, defaultTitle: "Yakshagana Handcrafted Kireeta" },
  "regalia": { craft: "Yakshagana", kannada: "ಯಕ್ಷಗಾನ ರಂಗ ಪರಿಕರ", material: "Carved Wood & Brass Foil", defaultPrice: 3450, defaultLead: 14, defaultTitle: "Yakshagana Stage Folk Regalia" },
  "water jug": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay & River Silt", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Water Jugs" },
  "water jugs": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay & River Silt", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Water Jugs" },
  "water pot": { craft: "Pottery", kannada: "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt & Stone Polish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Terracotta Water Storage Pots" },
  "water pots": { craft: "Pottery", kannada: "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt & Stone Polish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Terracotta Water Storage Pots" },
  "water": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Terracotta Water Jugs" },
  "jug": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Jugs" },
  "jugs": { craft: "Pottery", kannada: "ನೀರಿನ ಜಗ್ಗು", material: "Terracotta Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Jugs" },
  "pottery": { craft: "Pottery", kannada: "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt & Stone Polish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Coastal Terracotta Pottery" },
  "pot": { craft: "Pottery", kannada: "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt & Stone Polish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Pots" },
  "pots": { craft: "Pottery", kannada: "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt & Stone Polish", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Terracotta Pots" },
  "matka": { craft: "Pottery", kannada: "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ", material: "Netravati Riverbed Silt", defaultPrice: 350, defaultLead: 7, defaultTitle: "Handcrafted Earthen Matka" },
  "clay": { craft: "Pottery", kannada: "ಕುಂಬಾರಿಕೆ ಕಲೆ", material: "Riverbed Terracotta Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Natural Clay Handcrafted Pottery" },
  "terracotta": { craft: "Pottery", kannada: "ಕುಂಬಾರಿಕೆ ಕಲೆ", material: "Riverbed Terracotta Clay", defaultPrice: 350, defaultLead: 7, defaultTitle: "Natural Terracotta Craft" },
  "beedu": { craft: "Beedu", kannada: "ಬೀಡು ಬುಟ್ಟಿ", material: "Sun-Cured Coastal Wildgrass & Raw Jute", defaultPrice: 450, defaultLead: 10, defaultTitle: "Udupi Beedu Wildgrass Baskets" },
  "basket": { craft: "Beedu", kannada: "ಹುಲ್ಲಿನ ಬುಟ್ಟಿ", material: "Natural Wild Rivergrass", defaultPrice: 450, defaultLead: 10, defaultTitle: "Coastal Handwoven Grass Baskets" },
  "baskets": { craft: "Beedu", kannada: "ಹುಲ್ಲಿನ ಬುಟ್ಟಿ", material: "Natural Wild Rivergrass", defaultPrice: 450, defaultLead: 10, defaultTitle: "Coastal Handwoven Grass Baskets" },
  "cane": { craft: "Beedu", kannada: "ಬೀಡು ಬುಟ್ಟಿ", material: "Sun-Cured Coastal Wildgrass & Raw Jute", defaultPrice: 450, defaultLead: 10, defaultTitle: "Woven Cane & Grass Baskets" },
  "grass": { craft: "Beedu", kannada: "ಹುಲ್ಲಿನ ಬುಟ್ಟಿ", material: "Natural Wild Rivergrass", defaultPrice: 450, defaultLead: 10, defaultTitle: "Natural Wild Rivergrass Craft" },
  "kasuti": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಕಲೆ", material: "Pure Mulberry Silk Thread & Handloom Cotton", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Heritage Kasuti Shawls" },
  "kasooti": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಕಲೆ", material: "Pure Mulberry Silk Thread & Handloom Cotton", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Heritage Kasuti Shawls" },
  "shawl": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಶಾಲು", material: "Pure Silk Cotton Base", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Kasuti Embroidered Shawls" },
  "shawls": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಶಾಲು", material: "Pure Silk Cotton Base", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Kasuti Embroidered Shawls" },
  "saree": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಸೀರೆ", material: "Ilkal Handloom Silk", defaultPrice: 1600, defaultLead: 20, defaultTitle: "Ilkal Kasuti Handcrafted Saree" },
  "sari": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಸೀರೆ", material: "Ilkal Handloom Silk", defaultPrice: 1600, defaultLead: 20, defaultTitle: "Ilkal Kasuti Handcrafted Saree" },
  "embroidery": { craft: "Kasuti", kannada: "ಕಸೂತಿ ಕಲೆ", material: "Pure Mulberry Silk Thread & Handloom Cotton", defaultPrice: 600, defaultLead: 15, defaultTitle: "Dharwad Kasuti Embroidery Craft" },
  "channapatna": { craft: "Channapatna Toys", kannada: "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ", material: "Natural Ivory Wood & Lacquer Polish", defaultPrice: 550, defaultLead: 12, defaultTitle: "Channapatna Lacquer Wooden Toys" },
  "toy": { craft: "Channapatna Toys", kannada: "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ", material: "Natural Ivory Wood & Lacquer Polish", defaultPrice: 550, defaultLead: 12, defaultTitle: "Channapatna Wooden Toys" },
  "toys": { craft: "Channapatna Toys", kannada: "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ", material: "Natural Ivory Wood & Lacquer Polish", defaultPrice: 550, defaultLead: 12, defaultTitle: "Channapatna Wooden Toys" },
  "bidri": { craft: "Bidriware", kannada: "ಬಿದ್ರಿ ಕಲೆ", material: "Zinc-Copper Alloy with Pure Silver Wire", defaultPrice: 1400, defaultLead: 20, defaultTitle: "Bidar Pure Silver Inlay Bidriware" },
  "bidriware": { craft: "Bidriware", kannada: "ಬಿದ್ರಿ ಕಲೆ", material: "Zinc-Copper Alloy with Pure Silver Wire", defaultPrice: 1400, defaultLead: 20, defaultTitle: "Bidar Pure Silver Inlay Bidriware" }
};

// Kannada & English numeral words mapping to integer values
const NUMERAL_WORDS: Record<string, number> = {
  // Kannada & Tulu Numerals
  "ಒಂಜಿ": 1,
  "ರಡ್ಡ್": 2,
  "ಮೂಜಿ": 3,
  "ನಾಲ್": 4,
  "ಐನ್": 5,
  "ಆಜಿ": 6,
  "ಏಳ್": 7,
  "ಎನ್ಮ": 8,
  "ಒರುಂಬ": 9,
  "ಪತ್ತ್": 10,
  "ಹತ್ತು": 10,
  "ಇಪ್ಪತ್ತು": 20,
  "ಇರ್ವ": 20,
  "ಮೂವತ್ತು": 30,
  "ಮುಪ್ಪ": 30,
  "ನಲವತ್ತು": 40,
  "ನಲ್ಪ": 40,
  "ಐವತ್ತು": 50,
  "ಐವ": 50,
  "ಅರವತ್ತು": 60,
  "ಅಜಿಪ": 60,
  "ಎಪ್ಪತ್ತು": 70,
  "ಎಲ್ಪ": 70,
  "ಎಂಬತ್ತು": 80,
  "ಎಂಭತ್ತು": 80,
  "ಎನ್ಪ": 80,
  "ತೊಂಬತ್ತು": 90,
  "ಸೊನ್ಪ": 90,
  "ನೂರು": 100,
  "ನೂದು": 100,
  "ಇನ್ನೂರು": 200,
  "ಇನ್ನೂದು": 200,
  "ಮುನ್ನೂರು": 300,
  "ಮುನ್ನೂದು": 300,
  "ನಾನ್ನೂರು": 400,
  "ನಾನ್ನೂದು": 400,
  "ಐನೂರು": 500,
  "ಐನೂದು": 500,
  "ಆರುನೂರು": 600,
  "ಆರ್ನೂದು": 600,
  "ಎಂಟುನೂರು": 800,
  "ಎನ್ಮನೂದು": 800,
  "ಸಾವಿರ": 1000,

  // English
  "ten": 10,
  "twenty": 20,
  "thirty": 30,
  "forty": 40,
  "fifty": 50,
  "sixty": 60,
  "seventy": 70,
  "eighty": 80,
  "ninety": 90,
  "hundred": 100,
  "two hundred": 200,
  "three hundred": 300,
  "four hundred": 400,
  "five hundred": 500,
  "six hundred": 600,
  "seven hundred": 700,
  "eight hundred": 800,
  "thousand": 1000
};

// Kannada digits to Latin digits
const KANNADA_DIGITS: Record<string, string> = {
  "೦": "0", "೧": "1", "೨": "2", "೩": "3", "೪": "4",
  "೫": "5", "೬": "6", "೭": "7", "೮": "8", "೯": "9"
};

/**
 * Normalizes Kannada script numbers and digits into standard Arabic numerals
 */
function normalizeKannadaNumbers(text: string): string {
  let normalized = text;
  for (const [kDigit, aDigit] of Object.entries(KANNADA_DIGITS)) {
    normalized = normalized.replaceAll(kDigit, aDigit);
  }
  return normalized;
}

const KANGLISH_TO_KANNADA_REPLACEMENTS: [RegExp, string][] = [
  // Phrases (Kannada & Tulu)
  [/\b(?:na\s+badi|na\s+baadi|nanna\s+bali|nanna\s+baLi|nan\s+hatra|nanna\s+hatra)\b/gi, "ನನ್ನ ಬಳಿ"],
  [/\b(?:namma\s+sanghadalli|namma\s+sangha|namma\s+koota)\b/gi, "ನಮ್ಮ ಸಂಘದಲ್ಲಿ"],
  [/\b(?:enkulede|yenkuleda|yenkuled|yenklede|enkleda)\b/gi, "ಯೆಂಕುಲೆಡ"],
  [/\b(?:enna\s+kayit|enna\s+kaiyt|enna\s+kaiyit)\b/gi, "ಎನ್ನ ಕೈಟ್"],
  [/\b(?:namma\s+sanghodu|namma\s+sanghadu)\b/gi, "ನಮ್ಮ ಸಂಘೊಡು"],
  [/\bnan\s+baddi\b/gi, "ನನ್ನ ಬಳಿ"],

  // Quantities & Numbers
  [/\b(?:gammathu|ombattu|ombatu)\b/gi, "೯ (ಒಂಬತ್ತು)"],
  [/\b(?:embattu|embatu|yembattu)\b/gi, "೮೦ (ಎಂಬತ್ತು)"],
  [/\b(?:eppattu|yeppattu)\b/gi, "೭೦ (ಎಪ್ಪತ್ತು)"],
  [/\baravattu\b/gi, "೬೦ (ಅರವತ್ತು)"],
  [/\b(?:aivattu|ayvattu)\b/gi, "೫೦ (ಐವತ್ತು)"],
  [/\bnalavattu\b/gi, "೪೦ (ನಲವತ್ತು)"],
  [/\b(?:moovattu|muvattu)\b/gi, "೩೦ (ಮೂವತ್ತು)"],
  [/\bippattu\b/gi, "೨೦ (ಇಪ್ಪತ್ತು)"],
  [/\bhattu\b/gi, "೧೦ (ಹತ್ತು)"],
  [/\bnooru\b/gi, "೧೦೦"],
  [/\binnooru\b/gi, "೨೦೦"],
  [/\bmunnooru\b/gi, "೩೦೦"],
  [/\bnannooru\b/gi, "೪೦೦"],
  [/\bainooru\b/gi, "೫೦೦"],
  [/\baarunooru\b/gi, "೬೦೦"],
  [/\b(?:saavira|savira)\b/gi, "೧೦೦೦ (ಸಾವಿರ)"],

  // Crafts & Artifacts
  [/\b(?:kasuti|kasooti)\b/gi, "ಕಸೂತಿ"],
  [/\bshalugalive\b/gi, "ಶಾಲುಗಳಿವೆ"],
  [/\bshalugalu\b/gi, "ಶಾಲುಗಳು"],
  [/\bshalu\b/gi, "ಶಾಲು"],
  [/\bseeregalive\b/gi, "ಸೀರೆಗಳಿವೆ"],
  [/\b(?:seere|saree)\b/gi, "ಸೀರೆ"],
  [/\bbeedu\b/gi, "ಬೀಡು"],
  [/\bhullina\b/gi, "ಹುಲ್ಲಿನ"],
  [/\bbuttigalive\b/gi, "ಬುಟ್ಟಿಗಳಿವೆ"],
  [/\bbutti\b/gi, "ಬುಟ್ಟಿ"],
  [/\bmadikegalive\b/gi, "ಮಡಿಕೆಗಳಿವೆ"],
  [/\bmadike\b/gi, "ಮಡಿಕೆ"],
  [/\bjaggugalive\b/gi, "ಜಗ್ಗುಗಳಿವೆ"],
  [/\bjaggu\b/gi, "ಜಗ್ಗು"],
  [/\bneerina\b/gi, "ನೀರಿನ"],
  [/\bterracotta\b/gi, "ಟೆರಾಕೋಟಾ"],
  [/\bkundagalu\b/gi, "ಕುಂಡಗಳು"],
  [/\budupi\b/gi, "ಉಡುಪಿ"],
  [/\bkaimagga\b/gi, "ಕೈಮಗ್ಗ"],
  [/\byakshagana\b/gi, "ಯಕ್ಷಗಾನ"],
  [/\bkireeta\b/gi, "ಕಿರೀಟ"],
  [/\bbidri\b/gi, "ಬಿದ್ರಿ"],
  [/\bchannapatna\b/gi, "ಚನ್ನಪಟ್ಟಣ"],
  [/\b(?:aatike|atike)\b/gi, "ಆಟಿಕೆ"],

  // Commercial verbs & units (Kannada & Tulu)
  [/\b(?:ondakke|ondak)\b/gi, "ಒಂದಕ್ಕೆ"],
  [/\b(?:onjek|onjeg)\b/gi, "ಒಂಜೆಕ್"],
  [/\bbele\b/gi, "ಬೆಲೆ"],
  [/\b(?:roopayi|rupayi|rupees?|rs\.?)\b/gi, "ರುಪಾಯಿ"],
  [/\b(?:dinagalalli|dinadalli)\b/gi, "ದಿನಗಳಲ್ಲಿ"],
  [/\b(?:dinotu|dinat)\b/gi, "ದಿನೊಟು"],
  [/\b(?:needuttene|needuteve|koduttene|koduteve)\b/gi, "ನೀಡುತ್ತೇವೆ"],
  [/\b(?:korpa|korpe|korpar)\b/gi, "ಕೊರ್ಪ"],
  [/\b(?:tayarisuttene|tayarisuteve)\b/gi, "ತಯಾರಿಸುತ್ತೇವೆ"],
  [/\b(?:malpuv|malpuna)\b/gi, "ಮಲ್ಪುನ"],
  [/\b(?:undu|und)\b/gi, "ಉಂಡು"],
  [/\bide\b/gi, "ಇದೆ"],
  [/\bive\b/gi, "ಇವೆ"],
];

/**
 * Transliterates Kanglish (Kannada written in Latin/English letters) into authentic Kannada script
 */
export function transliterateKanglishToKannada(text: string): string {
  if (!text) return "";
  let converted = text;
  for (const [pattern, knScript] of KANGLISH_TO_KANNADA_REPLACEMENTS) {
    converted = converted.replace(pattern, knScript);
  }
  return converted;
}

/**
 * Intelligent Heuristic Extractor for Spoken Kannada & Bilingual Indian Speech
 */
export function parseKannadaTranscript(transcript: string, lang: "kn" | "en" | "tcy" = "kn"): ExtractedCraftListing {
  const convertedText = (lang === "kn" || lang === "tcy") ? transliterateKanglishToKannada(transcript) : transcript;
  const normalizedText = normalizeKannadaNumbers(transcript).toLowerCase();

  // 1. Craft identification (Check specific multi-word matches first)
  let detectedCraft = "Kasuti";
  let detectedKannada = "ಕಸೂತಿ ಕಲೆ";
  let detectedMaterial = "Pure Mulberry Silk Thread & Handloom Cotton";
  let detectedTitle = "Dharwad Heritage Kasuti Silk Shawl";
  let defaultPrice = 600;
  let defaultLead = 15;

  let matched = false;
  // Sort dictionary keys by length descending to match "water jug" before "water" or "jug"
  const sortedKeywords = Object.keys(KANNADA_CRAFT_DICTIONARY).sort((a, b) => b.length - a.length);

  for (const kw of sortedKeywords) {
    if (normalizedText.includes(kw.toLowerCase())) {
      const meta = KANNADA_CRAFT_DICTIONARY[kw];
      detectedCraft = meta.craft;
      detectedKannada = meta.kannada;
      detectedMaterial = meta.material;
      detectedTitle = meta.defaultTitle;
      defaultPrice = meta.defaultPrice;
      defaultLead = meta.defaultLead;
      matched = true;
      break;
    }
  }

  // Fallback checks if no direct dictionary keyword matched
  if (!matched) {
    if (normalizedText.includes("jug") || normalizedText.includes("water") || normalizedText.includes("pot") || normalizedText.includes("ಮಡಿಕೆ") || normalizedText.includes("ಜಗ್ಗು") || normalizedText.includes("ಮಣ್ಣ್ದ")) {
      detectedCraft = "Pottery";
      detectedKannada = "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ / ನೀರಿನ ಜಗ್ಗು";
      detectedMaterial = "Netravati Riverbed Silt & Stone Polish";
      detectedTitle = "Handcrafted Terracotta Water Jugs";
      defaultPrice = 350;
      defaultLead = 7;
    } else if (normalizedText.includes("basket") || normalizedText.includes("grass") || normalizedText.includes("ಬುಟ್ಟಿ") || normalizedText.includes("ಬೀಡು") || normalizedText.includes("ಬುಟ್ಟಿಲು") || normalizedText.includes("ಬೀಡುದ")) {
      detectedCraft = "Beedu";
      detectedKannada = "ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿ (ಉಡುಪಿ)";
      detectedMaterial = "Natural Wild Rivergrass";
      detectedTitle = "Udupi Beedu Wildgrass Baskets";
      defaultPrice = 450;
      defaultLead = 10;
    } else if (normalizedText.includes("muttale") || normalizedText.includes("ಮುಟ್ಟಾಲೆ") || normalizedText.includes("kireeta") || normalizedText.includes("ಕಿರೀಟ")) {
      detectedCraft = "Yakshagana";
      detectedKannada = "ಕರಾವಳಿ ಯಕ್ಷಗಾನ ಕಿರೀಟ / ಮುಟ್ಟಾಲೆ";
      detectedMaterial = "Honne Wood & Brass Embellishments";
      detectedTitle = "Yakshagana Stage Regalia";
      defaultPrice = 2800;
      defaultLead = 12;
    }
  }

  // 2. Quantity, Price & Lead Time Extraction
  let leadTime = defaultLead;
  let cleanText = normalizedText;

  // Extract days (lead time) first so it is not confused with quantity or price
  const daysMatch = cleanText.match(/(\d+)\s*(?:ದಿನೊಟು|ದಿನಗಳು|ದಿನ|days?)/i);
  if (daysMatch) {
    leadTime = parseInt(daysMatch[1], 10);
    cleanText = cleanText.replace(daysMatch[0], " ");
  }

  // Extract explicit price if adjacent to currency words (₹, rs, inr, rupees, ರೂಪಾಯಿ, ರುಪಾಯಿ, ರೂ., ರು.)
  let price = defaultPrice;
  let foundExplicitPrice = false;
  const explicitPrice = cleanText.match(/(?:rs\.?|inr|₹|ರೂ\.|ರು\.)\s*(\d{2,6})|(\d{2,6})\s*(?:rupees?|rs\.?|inr|ರುಪಾಯಿ|ರೂಪಾಯಿ|ರೂ\.|ರು\.)/i);
  if (explicitPrice) {
    price = parseInt(explicitPrice[1] || explicitPrice[2], 10);
    foundExplicitPrice = true;
    cleanText = cleanText.replace(explicitPrice[0], " ");
  }

  // Extract remaining numbers from text
  const digitsFound = cleanText.match(/\b\d+\b/g)?.map(Number) || [];
  const wordsFound: number[] = [];
  for (const [word, val] of Object.entries(NUMERAL_WORDS)) {
    // Only match as whole word or clear delimiter
    const wordRegex = new RegExp(`(^|\\s)${word}(\\s|$)`, "i");
    if (wordRegex.test(cleanText)) {
      wordsFound.push(val);
    }
  }

  const allNumbers = [...digitsFound, ...wordsFound];
  let quantity = 50;

  if (allNumbers.length === 1) {
    if (!foundExplicitPrice && allNumbers[0] > 200) {
      price = allNumbers[0];
    } else {
      quantity = allNumbers[0];
    }
  } else if (allNumbers.length >= 2) {
    if (foundExplicitPrice) {
      quantity = allNumbers[0];
    } else {
      const sorted = [...allNumbers].sort((a, b) => a - b);
      quantity = sorted[0];
      price = sorted[sorted.length - 1];
    }
  }

  return {
    craft: detectedCraft,
    craftKannada: detectedKannada,
    itemName: detectedTitle,
    quantity,
    pricePerUnitINR: price,
    totalValueINR: quantity * price,
    material: detectedMaterial,
    leadTimeDays: leadTime,
    rawTranscript: (lang === "kn" || lang === "tcy") ? (convertedText || transcript) : transcript,
    confidence: 0.96
  };
}
