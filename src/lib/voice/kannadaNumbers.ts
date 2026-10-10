/**
 * Kannada number formatting utility
 * Converts standard numbers into bilingual format:
 * e.g., 1850 -> "1,850 (ಒಂದು ಸಾವಿರದ ಎಂಟುನೂರ ಐವತ್ತು)"
 * or 40 -> "40 (ನಲವತ್ತು)"
 * Also provides Kannada digit transliteration (1 -> ೧, 2 -> ೨) for step indicators.
 */

const KANNADA_DIGITS: Record<string, string> = {
  "0": "೦",
  "1": "೧",
  "2": "೨",
  "3": "೩",
  "4": "೪",
  "5": "೫",
  "6": "೬",
  "7": "೭",
  "8": "೮",
  "9": "೯",
};

export function toKannadaDigits(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => KANNADA_DIGITS[digit] || digit);
}

const ONES: Record<number, string> = {
  0: "ಸೊನ್ನೆ",
  1: "ಒಂದು",
  2: "ಎರಡು",
  3: "ಮೂರು",
  4: "ನಾಲ್ಕು",
  5: "ಐದು",
  6: "ಆರು",
  7: "ಏಳು",
  8: "ಎಂಟು",
  9: "ಒಂಬತ್ತು",
  10: "ಹತ್ತು",
  11: "ಹನ್ನೊಂದು",
  12: "ಹನ್ನೆರಡು",
  13: "ಹದಿಮೂರು",
  14: "ಹದಿನಾಲ್ಕು",
  15: "ಹದಿನೈದು",
  16: "ಹದಿನಾರು",
  17: "ಹದಿನೇಳು",
  18: "ಹದಿನೆಂಟು",
  19: "ಹತ್ತೊಂಬತ್ತು",
};

const TENS: Record<number, string> = {
  20: "ಇಪ್ಪತ್ತು",
  30: "ಮೂವತ್ತು",
  40: "ನಲವತ್ತು",
  50: "ಐವತ್ತು",
  60: "ಅರವತ್ತು",
  70: "ಎಪ್ಪತ್ತು",
  80: "ಎಂಬತ್ತು",
  90: "ತೊಂಬತ್ತು",
};

const TENS_PREFIX: Record<number, string> = {
  20: "ಇಪ್ಪತ್ತೆ",
  30: "ಮೂವತ್ತೆ",
  40: "ನಲವತ್ತೆ",
  50: "ಐವತ್ತೆ",
  60: "ಅರವತ್ತೆ",
  70: "ಎಪ್ಪತ್ತೆ",
  80: "ಎಂಬತ್ತೆ",
  90: "ತೊಂಬತ್ತೆ",
};

const HUNDREDS: Record<number, string> = {
  100: "ನೂರು",
  200: "ಇನ್ನೂರು",
  300: "ಮುನ್ನೂರು",
  400: "ನಾನೂರು",
  500: "ಐನೂರು",
  600: "ಆರುನೂರು",
  700: "ಏಳುನೂರು",
  800: "ಎಂಟುನೂರು",
  900: "ಒಂಬೈನೂರು",
};

const HUNDREDS_PREFIX: Record<number, string> = {
  100: "ಒಂದು ನೂರ ",
  200: "ಇನ್ನೂರ ",
  300: "ಮುನ್ನೂರ ",
  400: "ನಾನೂರಾ ",
  500: "ಐನೂರ ",
  600: "ಆರುನೂರ ",
  700: "ಏಳುನೂರ ",
  800: "ಎಂಟುನೂರ ",
  900: "ಒಂಬೈನೂರ ",
};

export function numberToKannadaWords(n: number): string {
  if (n < 0) return "ಋಣ " + numberToKannadaWords(Math.abs(n));
  if (n <= 19) return ONES[n] || String(n);

  if (n >= 20 && n < 100) {
    const ten = Math.floor(n / 10) * 10;
    const remainder = n % 10;
    if (remainder === 0) return TENS[ten] || String(n);
    return `${TENS_PREFIX[ten] || TENS[ten]}${ONES[remainder]}`;
  }

  if (n >= 100 && n < 1000) {
    const hundred = Math.floor(n / 100) * 100;
    const remainder = n % 100;
    if (remainder === 0) return HUNDREDS[hundred] || String(n);
    return `${HUNDREDS_PREFIX[hundred] || HUNDREDS[hundred] + " "}${numberToKannadaWords(remainder)}`;
  }

  if (n >= 1000 && n < 100000) {
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    const thousandWord = thousands === 1 ? "ಒಂದು ಸಾವಿರ" : `${numberToKannadaWords(thousands)} ಸಾವಿರ`;
    if (remainder === 0) return thousandWord;
    return `${thousandWord}ದ ${numberToKannadaWords(remainder)}`;
  }

  if (n >= 100000 && n < 10000000) {
    const lakhs = Math.floor(n / 100000);
    const remainder = n % 100000;
    const lakhWord = lakhs === 1 ? "ಒಂದು ಲಕ್ಷ" : `${numberToKannadaWords(lakhs)} ಲಕ್ಷ`;
    if (remainder === 0) return lakhWord;
    return `${lakhWord} ${numberToKannadaWords(remainder)}`;
  }

  return String(n);
}

/**
 * Returns clean bilingual price string:
 * formatPriceWithKannada(1850) -> "₹1,850 (ಒಂದು ಸಾವಿರದ ಎಂಟುನೂರ ಐವತ್ತು ರೂ.)"
 */
export function formatPriceWithKannada(amount: number): string {
  const formattedDigits = `₹${amount.toLocaleString("en-IN")}`;
  const words = numberToKannadaWords(amount);
  return `${formattedDigits} (${words} ರೂ.)`;
}

/**
 * Returns bilingual units string:
 * formatUnitsWithKannada(40, "ಶಾಲುಗಳು") -> "40 (ನಲವತ್ತು) ಶಾಲುಗಳು"
 */
export function formatUnitsWithKannada(units: number, unitLabelKn: string = "ಯೂನಿಟ್"): string {
  const words = numberToKannadaWords(units);
  return `${units} (${words}) ${unitLabelKn}`;
}
