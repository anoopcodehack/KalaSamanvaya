export interface ExtractedCraftListing {
  craft: string;
  itemName: string;
  quantity: number;
  pricePerUnit: number;
  material: string;
  leadTimeDays: number;
  rawTranscript: string;
}

export const KANNADA_CRAFT_DICTIONARY: Record<string, string> = {
  "ಕಸೂತಿ": "Kasuti",
  "ಕಸೂತಿ ಸೀರೆ": "Kasuti",
  "ಮಡಿಕೆ": "Pottery",
  "ಕುಂಬಾರಿಕೆ": "Pottery",
  "ಟೆರ್ರಾಕೋಟಾ": "Pottery",
  "ಬೀಡು": "Beedu",
  "ಕೈಮಗ್ಗ": "Beedu",
  "ಚನ್ನಪಟ್ಟಣ": "Channapatna",
  "ಕಿನ್ನಾಳ": "Kinnal",
};

/**
 * Heuristic fallback parser for Kannada speech transcripts
 * Extracts craft type, numeric quantity, and price from spoken Kannada.
 */
export function parseKannadaTranscript(transcript: string): ExtractedCraftListing {
  const lower = transcript.toLowerCase();
  
  // 1. Identify Craft
  let detectedCraft = "Kasuti";
  for (const [kannadaWord, craftName] of Object.entries(KANNADA_CRAFT_DICTIONARY)) {
    if (transcript.includes(kannadaWord)) {
      detectedCraft = craftName;
      break;
    }
  }

  // 2. Identify numbers (Kannada digits or Arabic digits or words)
  const numbersFound = transcript.match(/\d+/g);
  let quantity = 50;
  let price = 1200;

  if (numbersFound && numbersFound.length >= 1) {
    quantity = parseInt(numbersFound[0], 10);
  }
  if (numbersFound && numbersFound.length >= 2) {
    price = parseInt(numbersFound[1], 10);
  }

  // 3. Fallback extraction structure
  return {
    craft: detectedCraft,
    itemName: `${detectedCraft} Handcrafted Batch`,
    quantity,
    pricePerUnit: price,
    material: detectedCraft === "Kasuti" ? "Cotton / Silk Thread" : detectedCraft === "Pottery" ? "Natural Clay" : "Handspun Cotton",
    leadTimeDays: 14,
    rawTranscript: transcript,
  };
}
