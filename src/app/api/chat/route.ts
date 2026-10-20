import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the intelligent, warm, and highly knowledgeable "Craft Concierge & Project Assistant" for KALASAMANVAYA (ಕಲಾ ಸಮನ್ವಯ) — an authentic direct-to-artisan coordination platform and digital market access initiative in Karnataka for DevHack 2026 (Problem Statement 4.2).

You know EVERYTHING about KalaSamanvaya inside and out. Answer ANY question asked about the platform, its mission, algorithms, crafts, team, economics, or features accurately and helpfully.

=== CORE IDENTITY & MISSION ===
- Name: KALASAMANVAYA (ಕಲಾ ಸಮನ್ವಯ)
- Hook / Core Insight: "Small artisans have small capacities. Larger buyers have larger requirements. We coordinate the gap." ("ಸಣ್ಣ ಕುಶಲಕರ್ಮಿಗಳಿಗೆ ಸಣ್ಣ ಸಾಮರ್ಥ್ಯ, ದೊಡ್ಡ ಖರೀದಿದಾರರಿಗೆ ಬೃಹತ್ ಬೇಡಿಕೆ. ನಾವು ಇವೆರಡನ್ನೂ ತಾಂತ್ರಿಕವಾಗಿ ಸಮನ್ವಯಗೊಳಿಸುತ್ತೇವೆ.")
- Team Name: MIDDLEWARE MAFIA
- Institution: Sahyadri College of Engineering & Management, Mangaluru
- Team Members:
  1. Anoop A. (Team Leader)
  2. Muhammad Ashath
  3. Prajna K V
  4. Pratheeksha K

=== THE REAL PROBLEM (DHARWAD FIELD CASE) ===
- In Dharwad, a corporate gifting agency approached a master Kasuti artisan for 200 hand-embroidered shawls with a 20-day delivery deadline.
- An individual artisan produces only 30–50 units per month. Unable to coordinate with neighboring home-weavers in time, she declined.
- The corporate buyer placed the order with a Surat powerloom mill for cheap synthetic polyester replicas.
- The artisan cluster lost ₹1,20,000 in direct income, and authentic heritage was replaced by machine polyester.
- Macro Reality: 7 Million+ rural artisans in India (55% in regional-language belts); 93% locked out of bulk corporate orders; ₹13,000 Crore PM Vishwakarma allocation underutilized due to fragmented supply chains.

=== SYSTEM ARCHITECTURE & 3 NOVEL INNOVATIONS ===
1. Capacity-Aware Multi-Artisan Allocation Engine: Algorithmically splits high-volume orders (200–500+ units) across verified artisan clusters based on real-time monthly capacity and delivery deadlines.
2. Kannada & Coastal Tulu Voice Onboarding: Native Web Speech API (kn-IN & tcy) + Google Gemini API slot extraction allows rural artisans to list verbally without typing or English forms. Includes bilingual number literacy ("80 (ಎಂಬತ್ತು)", "₹48,000 (ನಲವತ್ತೆಂಟು ಸಾವಿರ)").
3. "Why This Price?" Provenance & Wage Defense: Transparently defends handmade craft value against ₹300 powerloom fakes by displaying labor hours, raw material costs, and authentic GI certification.

=== ALGORITHMIC FORMULATIONS & STRESS-TEST BENCHMARK ===
1. Match Scoring Index (MSI):
   MSI_i = 0.45 * A_i + 0.35 * T_i + 0.20 * L_i  (Normalized weights: 0.45 + 0.35 + 0.20 = 1.00)
   - A_i: Availability score (ratio of free capacity to total capacity)
   - T_i: Turnaround fit (margin between maker lead time and buyer deadline)
   - L_i: Geographic proximity to regional logistics consolidation center
2. Bounded Sequential Greedy Allocation Rule:
   a_i = min(c_i, Remaining Demand)
3. 200-Unit Kasuti Benchmark Stress-Test:
   - Initial Allocation: Artisan A (Savita Naik - Dharwad) 80 units + Artisan B (Manjula Patil - Kalghatgi) 70 units + Artisan C (Girija Kulkarni - Gadag/Udupi) 50 units = 200 / 200 units (100% fulfilled).
   - Capacity Shock: Artisan A reports capacity reduction from 80 to 40 (-40 deficit due to illness).
   - Dynamic Rebalancing: Artisan C absorbs +10 buffer (hits 60 max cap); Standby Artisan D (Renuka Badiger - Navalgund) is activated from standby for +30 units.
   - Result: 40 + 70 + 60 + 30 = 200 / 200 units (100% demand preserved!).
   - Shortfall Alert Edge Case: If standby capacity is 0, system allocates 160 units and raises an immediate 40-unit Shortfall Alert giving the buyer two options: (a) Accept 160 partial shipment, or (b) Extend deadline by 6 days for adjacent cluster. Zero silent defaults!

=== UNIT ECONOMICS & REVENUE MODEL ===
- 200-Unit Enterprise Benchmark: 200 units @ ₹600 = ₹1,20,000 GMV.
- 75% Direct Artisan Wage: ₹90,000 (₹450/unit paid directly via Aadhaar DBT / UPI).
  * Artisan A (40 units): ₹18,000
  * Artisan B (70 units): ₹31,500
  * Artisan C (60 units): ₹27,000
  * Artisan D (30 units): ₹13,500
- 12% Raw Material Advance: ₹14,400 (₹72/unit disbursed upfront to shield artisans from 36-60% local moneylender debt traps).
- 5% Local SHG Cluster Lead Coordination: ₹6,000 (₹30/unit for quality & needlework inspection).
- 8% Lean Platform Operating Fee: ₹9,600 (₹48/unit for cloud hosting, speech APIs, and cluster routing).
- Community Retention: 92% (₹1,10,400) stays directly inside the rural artisan community!

=== 7 SUPPORTED KARNATAKA CRAFTS ===
1. Dharwad Heritage Kasuti Silk Shawl (Dharwad) - 38 hrs labor, ₹1,850 retail (₹1,380 direct maker pay), GI Application No. 85.
2. Udupi Beedu Wildgrass Baskets (Udupi / Padubidri) - 14 hrs labor, ₹920 retail (₹690 direct maker pay), sun-cured river grass.
3. Khanapur Riverbed Terracotta Water Jug (Belagavi) - 10 hrs labor, ₹750 retail (₹560 direct maker pay), cools water naturally by 5°C.
4. Navalgund Peacock Kasuti Stole (Navalgund) - 46 hrs labor, ₹2,150 retail (₹1,620 direct maker pay), 12,000 stitches.
5. Bidar Pure Silver Wire Inlay Bidriware (Bidar) - 22 hrs labor, ₹1,650 retail (₹1,220 direct maker pay), 99.9% silver & fort soil.
6. Udupi GI Handloom Cotton Sarees (Udupi) - 28 hrs labor, ₹2,350 retail (80s combed natural cotton, Malabar frame loom).
7. Coastal Tulunadu Yakshagana Regalia & Kireeta (Udupi/Honnavar) - 48 hrs labor, ₹3,450–₹4,800 retail, carved honne wood & brass repoussé.

=== POLICIES, SHIPPING & CUSTOMER CARE ===
- Shipping: Shipped via India Post Speed Post / Dak Ghar Niryat Kendra (DNK). Metro: 3–5 days, regional Karnataka: 2–4 days.
- Returns: 7-day handcrafted transit safe guarantee. If damaged in transit, 100% free cluster remake or refund.
- Data Privacy: Zero third-party ad tracking. Spoken Kannada/Tulu audio is processed transiently and never sold.
- Contact: Phone +91 91138 09951 | Email: info@kalasamanvaya.in | Dharwad & Udupi Clusters, Karnataka - 580001.

=== PLATFORM PAGES ===
- /marketplace: Retail store with GI Passports and "Why This Price?" modals.
- /b2b: Live corporate bulk order allocation console (test 200 Kasuti shawls, capacity shock, and rebalancing).
- /impact: Fair-trade monetization & unit economics simulator (8% platform fee).
- /artisan/onboard: Vernacular Kannada & Coastal Tulu voice onboarding + AI photo craft scanner.
- /artisan/inbox: Rural maker work order acceptance desk with audio playback.
- /help: Customer care and cluster policies (Shipping & Returns, Privacy, Terms, Bulk Enquiry).

=== CONVERSATION STYLE & LANGUAGE RULES ===
- If the user writes in Kannada, reply warmly and fluently in pure, natural Kannada.
- If the user writes in English, reply in friendly, professional, articulate English.
- If the user asks in Kanglish / Manglish, respond in natural, helpful bilingual style.
- Keep answers concise (2-4 clear sentences or structured bullet points), informative, and inspiring.
- Always cite specific facts, numbers, formulas, or names when asked.
- Provide the exact page link (/b2b, /marketplace, /impact, /artisan/onboard, /help) to guide the user.`;

export async function GET() {
  return NextResponse.json({ status: "online", service: "KalaSamanvaya Craft Concierge AI" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body.message || "").trim();
    const clientLanguage = body.language as string | undefined;

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const hasKannadaUnicode = /[\u0C80-\u0CFF]/.test(userMessage);
    const isKannada = hasKannadaUnicode || clientLanguage === "kn";

    const apiKey = process.env.GEMINI_API_KEY;
    const isGeminiAvailable = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 10;

    let botResponse = "";

    if (isGeminiAvailable) {
      const languageInstruction = isKannada
        ? "CRITICAL MANDATORY INSTRUCTION: The user is asking in KANNADA (ಕನ್ನಡ). You MUST reply STRICTLY and ENTIRELY in natural, fluent KANNADA script (ಕನ್ನಡ). Do NOT reply in English. Do NOT output English sentences."
        : "The user is asking in English. Reply in clear, articulate, warm English.";

      // Prioritize fast, working Gemini 1.5 & 2.0 flash models with strict 2.5s timeout
      const modelsToTry = [
        "gemini-1.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-pro"
      ];
      for (const model of modelsToTry) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              signal: AbortSignal.timeout(2500),
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [
                      { text: `${SYSTEM_PROMPT}\n\n${languageInstruction}\n\nUser Question: "${userMessage}"\nHelpful, concise answer:` }
                    ]
                  }
                ],
                generationConfig: {
                  maxOutputTokens: 2048,
                  temperature: 0.7,
                },
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            const candidate = data.candidates?.[0];
            const textPart = candidate?.content?.parts?.find((p: any) => p.text);
            if (textPart && textPart.text) {
              const candidateText = textPart.text.trim();
              // If user queried in Kannada, ensure output is in Kannada
              if (isKannada && !/[\u0C80-\u0CFF]/.test(candidateText)) {
                console.warn("Gemini replied in English for a Kannada query, falling back to Kannada heuristics");
              } else {
                botResponse = candidateText;
                break;
              }
            }
          }
        } catch (geminiErr) {
          console.warn(`Gemini chat model ${model} notice:`, geminiErr);
        }
      }
    }

    // Heuristic Fallback if Gemini unavailable or failed
    if (!botResponse) {
      botResponse = isKannada
        ? getKannadaHeuristicResponse(userMessage)
        : getEnglishHeuristicResponse(userMessage);
    }

    // Determine relevant action link
    const actionLink = getActionLink(userMessage, botResponse, isKannada);

    return NextResponse.json({
      success: true,
      response: botResponse,
      actionLink,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate chat response", details: String(error) },
      { status: 500 }
    );
  }
}

function getKannadaHeuristicResponse(q: string): string {
  const lower = q.toLowerCase();

  // 1. TEAM & IDENTITY
  if (lower.includes("ತಂಡ") || lower.includes("ಯಾರು ಮಾಡಿದ್ದು") || lower.includes("ಯಾರು ನಿರ್ಮಿಸಿದ್ದು") || lower.includes("ಮಿಡಲ್‌ವೇರ್") || lower.includes("ಸಹ್ಯಾದ್ರಿ") || lower.includes("team") || lower.includes("middleware")) {
    return "ಕಲಾ ಸಮನ್ವಯ ವೇದಿಕೆಯನ್ನು ಮಂಗಳೂರಿನ ಸಹ್ಯಾದ್ರಿ ಕಾಲೇಜ್ ಆಫ್ ಇಂಜಿನಿಯರಿಂಗ್ & ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್‌ನ **ಮಿಡಲ್‌ವೇರ್ ಮಾಫಿಯಾ (MIDDLEWARE MAFIA)** ತಂಡವು DevHack / SYNERGIA 2026 ಗಾಗಿ ನಿರ್ಮಿಸಿದೆ. ತಂಡದ ಸದಸ್ಯರು: ಅನೂಪ್ ಎ. (ತಂಡದ ನಾಯಕ), ಮುಹಮ್ಮದ್ ಆಶಿತ್, ಪ್ರಾಜ್ಞಾ ಕೆ. ವಿ., ಮತ್ತು ಪ್ರತೀಕ್ಷಾ ಕೆ.";
  }

  // 2. DHARWAD INCIDENT / PROBLEM STATEMENT
  if (lower.includes("ಧಾರವಾಡ") || lower.includes("ಸಮಸ್ಯೆ") || lower.includes("ಘಟನೆ") || lower.includes("ಹಿನ್ನೆಲೆ") || lower.includes("dharwad") || lower.includes("incident")) {
    return "ಧಾರವಾಡದಲ್ಲಿ ಕಾರ್ಪೊರೇಟ್ ಸಂಸ್ಥೆಯೊಂದು 20 ದಿನಗಳಲ್ಲಿ 200 ಕೈಹೆಣಿಗೆಯ ಕಸೂತಿ ಶಾಲುಗಳನ್ನು ಕೇಳಿತ್ತು. ಒಬ್ಬ ಮಾಸ್ಟರ್ ಕುಶಲಕರ್ಮಿ ತಿಂಗಳಿಗೆ ಕೇವಲ 30–50 ಶಾಲುಗಳನ್ನು ಮಾತ್ರ ತಯಾರಿಸಲು ಸಾಧ್ಯವಿದ್ದು, ಸಮನ್ವಯದ ಕೊರತೆಯಿಂದ ಈ ಬೃಹತ್ ಆರ್ಡರ್ ಕೈತಪ್ಪಿ ಸೂರತ್ ಪವರ್‌ಲೂಮ್ ಮಿಲ್ಲುಗಳ ಪಾಲಾಯಿತು. ಇದರಿಂದ ಸ್ಥಳೀಯ ಕಸೂತಿ ಕ್ಲಸ್ಟರ್‌ಗೆ ₹1,20,000 ನೇರ ಆದಾಯ ನಷ್ಟವಾಯಿತು. ಇಂತಹ ಯಾವುದೇ ಬೃಹತ್ ಆರ್ಡರ್ ಕೈತಪ್ಪದಂತೆ ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳ ಸಾಮರ್ಥ್ಯವನ್ನು ತಾಂತ್ರಿಕವಾಗಿ ಒಂದುಗೂಡಿಸಲು ಕಲಾ ಸಮನ್ವಯವನ್ನು ನಿರ್ಮಿಸಲಾಗಿದೆ!";
  }

  // 3. FAIR TRADE ECONOMICS / 75% WAGE / 8% FEE / DBT
  if (lower.includes("75%") || lower.includes("ಕೂಲಿ") || lower.includes("ಡಿಬಿಟಿ") || lower.includes("dbt") || lower.includes("ಬ್ಯಾಂಕ್") || lower.includes("ಖಾತೆಗೆ") || lower.includes("ಬೆಲೆ") || lower.includes("ಹಣ") || lower.includes("ಶೇಕಡಾ") || lower.includes("ಲಾಭ") || lower.includes("8%") || lower.includes("wage") || lower.includes("price")) {
    return "ಕಲಾ ಸಮನ್ವಯದಲ್ಲಿ ಪ್ರತಿಯೊಂದು ರೂಪಾಯಿಯ **ಶೇಕಡಾ 75% ರಷ್ಟು ಹಣ ನೇರವಾಗಿ ಕುಶಲಕರ್ಮಿಗಳ ಆಧಾರ್ ಲಿಂಕ್ಡ್ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ (DBT / UPI)** ತಲುಪುತ್ತದೆ (ಉದಾಹರಣೆಗೆ ₹1,20,000 ಮೌಲ್ಯದ ಬೃಹತ್ B2B ಆರ್ಡರ್‌ನಲ್ಲಿ ₹90,000 ಅಥವಾ ₹1,850 ಕಸೂತಿ ಶಾಲಿನಲ್ಲಿ ₹1,380 ನೇರ ಕೂಲಿ ಹಣ). 12% ಹಣ ಕಚ್ಚಾ ಸಾಮಗ್ರಿಗಳ ಮುಂಗಡವಾಗಿ ಲಭ್ಯವಾಗುತ್ತದೆ, 5% ಸ್ಥಳೀಯ ಸ್ವಸಹಾಯ ಸಂಘದ (SHG) ಮುಖಂಡರಿಗೆ, ಮತ್ತು ಕೇವಲ 8% ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಕಾರ್ಯಾಚರಣಾ ಶುಲ್ಕ. ಒಟ್ಟಾರೆ **92% ರಷ್ಟು ಹಣ ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳ ಕ್ಲಸ್ಟರ್‌ನಲ್ಲೇ ಉಳಿಯುತ್ತದೆ**! ಲೈವ್ ಲೆಕ್ಕಾಚಾರಕ್ಕಾಗಿ /impact ಪುಟವನ್ನು ನೋಡಿ.";
  }

  // 4. MSI / MATCH SCORING INDEX / FORMULA
  if (lower.includes("msi") || lower.includes("ಸೂತ್ರ") || lower.includes("ಫಾರ್ಮುಲಾ") || lower.includes("ಅಲ್ಗಾರಿದಮ್") || lower.includes("ಲೆಕ್ಕಾಚಾರ") || lower.includes("ಸ್ಕೋರಿಂಗ್")) {
    return "ನಮ್ಮ ಮ್ಯಾಚ್ ಸ್ಕೋರಿಂಗ್ ಇಂಡೆಕ್ಸ್ (MSI) ಸೂತ್ರ: **MSI_i = 0.45·A_i + 0.35·T_i + 0.20·L_i** (ತೂಕಗಳ ಒಟ್ಟು ಮೊತ್ತ 1.00). ಇಲ್ಲಿ **A_i** ಲಭ್ಯವಿರುವ ಮುಕ್ತ ಸಾಮರ್ಥ್ಯದ ಅನುಪಾತ (c_i / C_max), **T_i** ವಿತರಣಾ ಸಮಯದ ಹೊಂದಾಣಿಕೆ, ಮತ್ತು **L_i** ಸ್ಥಳೀಯ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಹಬ್‌ಗೆ ಇರುವ ಸಾಮೀಪ್ಯ. ನಮ್ಮ ಬೆಂಚ್‌ಮಾರ್ಕ್‌ನಲ್ಲಿ ಕುಶಲಕರ್ಮಿಗಳ ಶ್ರೇಣಿ: ಕುಶಲಕರ್ಮಿ A (0.94) > B (0.88) > C (0.81) > D (0.72).";
  }

  // 5. BULK ALLOCATION / 200 UNITS / B2B CONSOLE
  if (lower.includes("200") || lower.includes("ಬೃಹತ್") || lower.includes("ಕಾರ್ಪೊರೇಟ್") || lower.includes("ಹಂಚಿಕೆ") || lower.includes("ಆರ್ಡರ್") || lower.includes("bulk") || lower.includes("b2b")) {
    return "ನಮ್ಮ 200 ಕಸೂತಿ ಶಾಲುಗಳ ಬೆಂಚ್‌ಮಾರ್ಕ್‌ನಲ್ಲಿ (20 ದಿನಗಳ ಗಡುವು), ಸೀಕ್ವೆನ್ಷಿಯಲ್ ಗ್ರೀಡಿ ಅಲ್ಗಾರಿದಮ್ ಹೀಗೆ ಹಂಚುತ್ತದೆ: **ಕುಶಲಕರ್ಮಿ A (80) + ಕುಶಲಕರ್ಮಿ B (70) + ಕುಶಲಕರ್ಮಿ C (50) = 200 / 200 ಯುನಿಟ್‌ಗಳು (100% ಪೂರ್ಣ)**. ಜೊತೆಗೆ 50 ಯುನಿಟ್‌ಗಳು ಸ್ಟ್ಯಾಂಡ್‌ಬೈ ಬಫರ್‌ನಲ್ಲಿರುತ್ತವೆ (C ಯಲ್ಲಿ 10, D ಯಲ್ಲಿ 40). ಲೈವ್ ಪರೀಕ್ಷೆಗಾಗಿ /b2b ಕನ್ಸೋಲ್ ನೋಡಿ!";
  }

  // 6. CAPACITY SHOCK / REBALANCING / STANDBY
  if (lower.includes("ಅಡಚಣೆ") || lower.includes("ಮರುಹಂಚಿಕೆ") || lower.includes("ಸ್ಟ್ಯಾಂಡ್‌ಬೈ") || lower.includes("ಕುಸಿತ") || lower.includes("shock") || lower.includes("rebalance") || lower.includes("standby")) {
    return "ಯಾವುದಾದರೂ ಕುಶಲಕರ್ಮಿಯ ಸಾಮರ್ಥ್ಯ ದಿಢೀರ್ ಕುಸಿದಾಗ (ಉದಾ: ಕುಶಲಕರ್ಮಿ A ಅನಾರೋಗ್ಯದಿಂದ 80 ರಿಂದ 40 ಕ್ಕೆ ಇಳಿದಾಗ), ನಮ್ಮ ಡೈನಾಮಿಕ್ ಸ್ಟ್ಯಾಂಡ್‌ಬೈ ಎಂಜಿನ್ 40 ಯುನಿಟ್‌ಗಳ ಕೊರತೆಯನ್ನು ತಕ್ಷಣ ಸರಿದೂಗಿಸುತ್ತದೆ: ಕುಶಲಕರ್ಮಿ C +10 ತೆಗೆದುಕೊಳ್ಳುತ್ತಾರೆ (ಗರಿಷ್ಠ 60 ರ ಮಿತಿ), ಮತ್ತು ಸ್ಟ್ಯಾಂಡ್‌ಬೈ ಕುಶಲಕರ್ಮಿ D +30 ಯುನಿಟ್‌ಗಳನ್ನು ಭರ್ತಿ ಮಾಡುತ್ತಾರೆ. ಇದರಿಂದ 200 ಯುನಿಟ್‌ಗಳ ಕಾರ್ಪೊರೇಟ್ ಆರ್ಡರ್ ಯಾವುದೇ ವಿಳಂಬವಿಲ್ಲದೆ 100% ಪೂರೈಕೆಯಾಗುತ್ತದೆ!";
  }

  // 7. SHORTFALL DETECTION / EDGE CASE
  if (lower.includes("ಕೊರತೆ") || lower.includes("ಎಡ್ಜ್ ಕೇಸ್") || lower.includes("160") || lower.includes("shortfall")) {
    return "ಒಟ್ಟು ಕ್ಲಸ್ಟರ್ ಸಾಮರ್ಥ್ಯವು ಬೇಡಿಕೆಗಿಂತ ಕಡಿಮೆಯಾದರೆ (ಉದಾ: ಕೇವಲ 160 ಲಭ್ಯವಿದ್ದಾಗ), ಎಂಜಿನ್ ತಕ್ಷಣ **40-ಯುನಿಟ್ ಕೊರತೆ ಎಚ್ಚರಿಕೆ (Shortfall Alert)** ನೀಡುತ್ತದೆ (`Shortfall = max(0, D - Σa_i)`). ಖರೀದಿದಾರರ ಕನ್ಸೋಲ್‌ನಲ್ಲಿ 2 ಸ್ಪಷ್ಟ ಆಯ್ಕೆಗಳು ಲಭ್ಯವಾಗುತ್ತವೆ: (1) 160 ಯುನಿಟ್‌ಗಳ ಭಾಗಶಃ ಆರ್ಡರ್ ಸ್ವೀಕರಿಸುವುದು, ಅಥವಾ (2) ಪಕ್ಕದ ಕ್ಲಸ್ಟರ್‌ಗೆ ರೂಟ್ ಮಾಡಲು 6 ದಿನಗಳ ಹೆಚ್ಚುವರಿ ಕಾಲಾವಕಾಶ ನೀಡುವುದು. ಯಾವುದೇ ಸೈಲೆಂಟ್ ಡಿಫಾಲ್ಟ್ ಇರುವುದಿಲ್ಲ!";
  }

  // 8. VERNACULAR VOICE & SPEECH ONBOARDING
  if (lower.includes("ಧ್ವನಿ") || lower.includes("ಮಾತನಾಡಿ") || lower.includes("ಕನ್ನಡ") || lower.includes("ತುಳು") || lower.includes("voice") || lower.includes("speech")) {
    return "ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳು /artisan/onboard ನಲ್ಲಿ ತಮ್ಮ ಮಾತೃಭಾಷೆಯಾದ ಕನ್ನಡ (`kn-IN`) ಅಥವಾ ಕರಾವಳಿಯ ತುಳು (`tcy`) ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಬಹುದು (ಉದಾ: *\"ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಬೆಲೆ 600 ರೂಪಾಯಿ\"*). ಎಐ ತಂತ್ರಜ್ಞಾನವು ಕರಕುಶಲ ಪ್ರಕಾರ, ಸಂಖ್ಯೆ ಮತ್ತು ಬೆಲೆಯನ್ನು ತಾನಾಗಿಯೇ ಗುರುತಿಸಿ ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ. ಯಾವುದೇ ಇಂಗ್ಲಿಷ್ ಅಥವಾ ಜಿಎಸ್‌ಟಿ ಅರ್ಜಿಗಳ ಅಗತ್ಯವಿಲ್ಲ! ಜೊತೆಗೆ '80 (ಎಂಬತ್ತು)' ನಂತಹ ದ್ವಿಭಾಷಾ ಸಂಖ್ಯೆಗಳ ಪ್ರದರ್ಶನವೂ ಲಭ್ಯವಿದೆ.";
  }

  // 9. AI PHOTO SCANNER
  if (lower.includes("ಫೋಟೋ") || lower.includes("ಕ್ಯಾಮರಾ") || lower.includes("ಸ್ಕ್ಯಾನ್") || lower.includes("ಚಿತ್ರ") || lower.includes("photo") || lower.includes("camera")) {
    return "/artisan/onboard ನಲ್ಲಿರುವ ನಮ್ಮ ಮಲ್ಟಿಮೋಡಲ್ ಎಐ ಸ್ಕ್ಯಾನರ್ ಮೂಲಕ ಕುಶಲಕರ್ಮಿಗಳು ತಮ್ಮ ಕಲಾಕೃತಿಯ ಚಿತ್ರವನ್ನು ತೆಗೆಯಬಹುದು. ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ಮಾಡೆಲ್ ಕಲಾ ಪ್ರಕಾರ (ಕಸೂತಿ, ಬೀಡು, ಪಾಟರಿ, ಬಿದರಿ, ಯಕ್ಷಗಾನ), ಬಳಸಿದ ನೈಸರ್ಗಿಕ ವಸ್ತುಗಳು, ನೇಯ್ಗೆ ಶೈಲಿ ಮತ್ತು ಸೂಕ್ತ ನ್ಯಾಯಯುತ ಮೂಲ ಬೆಲೆಯನ್ನು ತಾನಾಗಿಯೇ ಗುರುತಿಸುತ್ತದೆ!";
  }

  // 10. GI CRAFT PASSPORT & HANGTAG
  if (lower.includes("ಜಿಐ") || lower.includes("ಪಾಸ್‌ಪೋರ್ಟ್") || lower.includes("ಕ್ಯೂಆರ್") || lower.includes("ಹ್ಯಾಂಗ್‌ಟ್ಯಾಗ್") || lower.includes("gi") || lower.includes("passport") || lower.includes("qr")) {
    return "ಪ್ರತಿಯೊಂದು ಅಧಿಕೃತ ಉತ್ಪನ್ನವು ಸ್ಕ್ಯಾನ್ ಮಾಡಬಹುದಾದ **GI ಕ್ರಾಫ್ಟ್ ಪಾಸ್‌ಪೋರ್ಟ್** ಮತ್ತು QR ಹ್ಯಾಂಗ್‌ಟ್ಯಾಗ್‌ನೊಂದಿಗೆ ಬರುತ್ತದೆ. ಇದರಲ್ಲಿ ಕಲೆಗಾರರ ಹೆಸರು, ಕ್ಲಸ್ಟರ್ ವಿವರ, ಶ್ರಮದ ಗಂಟೆಗಳು ಮತ್ತು ನೈಜ ಕೂಲಿ ವಿವರಗಳಿರುತ್ತವೆ. ಜೊತೆಗೆ ಕನ್ನಡ ಧ್ವನಿ ವಿವರಣೆಯೂ ಲಭ್ಯವಿದ್ದು, ನಕಲಿ ಪವರ್‌ಲೂಮ್ ವಂಚನೆಯನ್ನು ತಡೆಯುತ್ತದೆ.";
  }

  // 11. SUPPORTED CRAFTS
  if (lower.includes("ಕಲಾಕೃತಿ") || lower.includes("ವಸ್ತುಗಳು") || lower.includes("ಉತ್ಪನ್ನ") || lower.includes("ಕಸೂತಿ") || lower.includes("ಬೀಡು") || lower.includes("ಪಾಟರಿ") || lower.includes("ಬಿದರಿ") || lower.includes("ಯಕ್ಷಗಾನ") || lower.includes("craft") || lower.includes("product")) {
    return "ಕಲಾ ಸಮನ್ವಯದಲ್ಲಿ ಕರ್ನಾಟಕದ 7 ಪ್ರಮುಖ ಸಾಂಪ್ರದಾಯಿಕ ಕಲೆಗಳಿವೆ: (1) ಧಾರವಾಡ ಕಸೂತಿ ರೇಷ್ಮೆ ಶಾಲು, (2) ಉಡುಪಿ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳು, (3) ಖಾನಾಪುರ ಟೆರಾಕೋಟ ಮಡಕೆಗಳು, (4) ನವಲಗುಂದ ನವಿಲು ಜಮಖಾನ/ಶಾಲು, (5) ಬೀದರ್ ಬೆಳ್ಳಿ ಬಿದರಿ ಕಲೆ, (6) ಉಡುಪಿ ಜಿಐ ಕೈಮಗ್ಗ ಸೀರೆ, ಮತ್ತು (7) ಕರಾವಳಿ ತುಳುನಾಡಿನ ಯಕ್ಷಗಾನ ಕಿರೀಟ & ವೇಷಭೂಷಣ. /marketplace ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ!";
  }

  // 12. SHIPPING, RETURNS & LOGISTICS
  if (lower.includes("ವಿತರಣೆ") || lower.includes("ವಾಪಸಾತಿ") || lower.includes("ರವಾನೆ") || lower.includes("ಶಿಪ್ಪಿಂಗ್") || lower.includes("shipping") || lower.includes("delivery") || lower.includes("return")) {
    return "ಆರ್ಡರ್‌ಗಳನ್ನು ಸ್ಥಳೀಯ ಕ್ಲಸ್ಟರ್ ಹಬ್‌ಗಳಲ್ಲಿ ಕ್ರೋಢೀಕರಿಸಿ ಇಂಡಿಯಾ ಪೋಸ್ಟ್ ಸ್ಪೀಡ್ ಪೋಸ್ಟ್ ಮತ್ತು ಡಾಕ್ ಘರ್ ನಿರ್ಯಾತ್ ಕೇಂದ್ರ (DNK) ಮೂಲಕ ರವಾನಿಸಲಾಗುತ್ತದೆ. ಕರ್ನಾಟಕದಲ್ಲಿ 2-4 ದಿನಗಳು ಮತ್ತು ಭಾರತದಾದ್ಯಂತ 3-5 ದಿನಗಳಲ್ಲಿ ವಿತರಣೆಯಾಗುತ್ತದೆ. ಸಾಗಾಣಿಕೆ ಹಾನಿಗೆ ನಮ್ಮ **7 ದಿನಗಳ ಕರಕುಶಲ ಗ್ಯಾರಂಟಿ** ಮೂಲಕ 100% ಉಚಿತ ಮರು-ಉತ್ಪಾದನೆ ಅಥವಾ ಹಣ ಮರುಪಾವತಿ ನೀಡಲಾಗುತ್ತದೆ. ವಿವರಗಳಿಗೆ /help?tab=shipping ನೋಡಿ!";
  }

  // 13. PRIVACY & DATA SECURITY
  if (lower.includes("ಗೌಪ್ಯತೆ") || lower.includes("ಭದ್ರತೆ") || lower.includes("privacy") || lower.includes("security")) {
    return "ಕಲಾ ಸಮನ್ವಯವು 100% ಜಾಹೀರಾತು ರಹಿತವಾಗಿದೆ. ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್‌ಗಳನ್ನು ಕೇವಲ ಕರಕುಶಲ ಕಾರ್ಡ್ ರಚನೆಗೆ ಅಲ್ಪಾವಧಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ. ಕುಶಲಕರ್ಮಿಗಳ ಆಧಾರ್ ಡಿಬಿಟಿ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮತ್ತು ಯುಪಿಐ ವಿವರಗಳು ಅತ್ಯುನ್ನತ ಭದ್ರತೆಯೊಂದಿಗೆ ಎನ್‌ಕ್ರಿಪ್ಟ್ ಆಗಿದ್ದು ನೇರ ಪಾವತಿಗೆ ಮಾತ್ರ ಬಳಕೆಯಾಗುತ್ತವೆ. ವಿವರಗಳಿಗೆ /help?tab=privacy ನೋಡಿ!";
  }

  // 14. CONTACT & CUSTOMER CARE
  if (lower.includes("ಸಂಪರ್ಕ") || lower.includes("ಫೋನ್") || lower.includes("ಇಮೇಲ್") || lower.includes("ವಿಳಾಸ") || lower.includes("contact") || lower.includes("phone")) {
    return "ಕಲಾ ಸಮನ್ವಯ ಕ್ಲಸ್ಟರ್ ಸಮನ್ವಯ ಡೆಸ್ಕ್: ದೂರವಾಣಿ: **+91 91138 09951**, ಇಮೇಲ್: **info@kalasamanvaya.in**, ವಿಳಾಸ: ಹೆರಿಟೇಜ್ ಕ್ರಾಫ್ಟ್ಸ್ ಸೆಂಟರ್, ಧಾರವಾಡ ಮತ್ತು ಉಡುಪಿ ಕ್ಲಸ್ಟರ್‌ಗಳು, ಕರ್ನಾಟಕ - 580001. ಸೋಮ-ಶನಿ: 10:00 AM - 7:30 PM.";
  }

  // 15. KANNADA GENERAL FALLBACK
  return "ಕಲಾ ಸಮನ್ವಯವು (KalaSamanvaya) ಕರ್ನಾಟಕದ ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳನ್ನು ಮತ್ತು ಸಾಂಸ್ಥಿಕ ಬೃಹತ್ ಬೇಡಿಕೆಯನ್ನು (B2B & B2C) ಸಮನ್ವಯಗೊಳಿಸುವ ವೇದಿಕೆಯಾಗಿದೆ. ನಮ್ಮ ಮುಖ್ಯ ಧ್ಯೇಯ: *\"ಸಣ್ಣ ಕುಶಲಕರ್ಮಿಗಳಿಗೆ ಸಣ್ಣ ಸಾಮರ್ಥ್ಯ, ದೊಡ್ಡ ಖರೀದಿದಾರರಿಗೆ ಬೃಹತ್ ಬೇಡಿಕೆ. ನಾವು ಇವೆರಡನ್ನೂ ತಾಂತ್ರಿಕವಾಗಿ ಸಮನ್ವಯಗೊಳಿಸುತ್ತೇವೆ.\"* 75% ನೇರ ಕೂಲಿ ಹಣ (DBT), ಧಾರವಾಡ ಕಸೂತಿ ಶಾಲುಗಳು, 200 ಯುನಿಟ್ ಅಲ್ಗಾರಿದಮ್ ಅಥವಾ ಧ್ವನಿ ನೊಂದಣಿಯ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ!";
}

function getEnglishHeuristicResponse(q: string): string {
  const lower = q.toLowerCase();

  // 1. TEAM & IDENTITY
  if (lower.includes("team") || lower.includes("who built") || lower.includes("who created") || lower.includes("middleware mafia") || lower.includes("sahyadri")) {
    return "KalaSamanvaya is built by team **MIDDLEWARE MAFIA** from Sahyadri College of Engineering & Management, Mangaluru for DevHack / SYNERGIA 2026 (Problem Statement 4.2). The team members are Anoop A. (Team Leader), Muhammad Ashath, Prajna K V, and Pratheeksha K.";
  }

  // 2. CORE MISSION / WHAT IS KALASAMANVAYA
  if (lower.includes("what is kalasamanvaya") || lower.includes("about kalasamanvaya")) {
    return "KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ) is a capacity-aware, vernacular B2B & B2C coordination platform connecting Karnataka’s rural craft clusters with enterprise demand. Our core insight is: *\"Small artisans have small capacities. Larger buyers have larger requirements. We coordinate the gap.\"* It features Kannada/Tulu voice onboarding, deterministic multi-artisan quota allocation, and transparent fair-trade wage defense.";
  }

  // 3. DHARWAD INCIDENT / PROBLEM STATEMENT
  if (lower.includes("dharwad") || lower.includes("problem") || lower.includes("incident")) {
    return "In Dharwad, a corporate gifting agency needed 200 hand-embroidered Kasuti shawls in 20 days. A single master artisan only makes 30–50/month and couldn't coordinate alone, so the order was lost to a Surat powerloom mill for polyester replicas. The cluster lost ₹1,20,000 in income. KalaSamanvaya was built so no bulk order is ever lost again by algorithmically aggregating artisan cluster capacity!";
  }

  // 4. MSI / MATCH SCORING INDEX / FORMULA
  if (lower.includes("msi") || lower.includes("formula") || lower.includes("scoring") || lower.includes("algorithm")) {
    return "Our Match Scoring Index formula is: **MSI_i = 0.45·A_i + 0.35·T_i + 0.20·L_i** (weights sum to 1.00). Here, **A_i** is uncommitted capacity availability (c_i / C_max), **T_i** is turnaround deadline fit, and **L_i** is geographic proximity to regional logistics hubs. In our benchmark, artisans rank: Artisan A (0.94) > Artisan B (0.88) > Artisan C (0.81) > Artisan D (0.72).";
  }

  // 5. BULK ALLOCATION / 200 UNITS / B2B CONSOLE
  if (lower.includes("200") || lower.includes("bulk") || lower.includes("corporate") || lower.includes("allocation") || lower.includes("b2b")) {
    return "In our 200-unit Kasuti benchmark (20-day deadline), our sequential greedy engine allocates: **Artisan A (80) + Artisan B (70) + Artisan C (50) = 200 / 200 units (100% fulfilled)**, while reserving 50 units in standby buffers (10 in C, 40 in D). Test it live at /b2b!";
  }

  // 6. CAPACITY SHOCK / REBALANCING / STANDBY
  if (lower.includes("shock") || lower.includes("rebalance") || lower.includes("dropout") || lower.includes("standby")) {
    return "When an artisan suffers a capacity drop (e.g. Artisan A drops from 80 to 40 due to illness), our Dynamic Standby Engine instantly rebalances the -40 deficit: Artisan C absorbs +10 (hitting 60 max cap), and Standby Artisan D absorbs +30. The 200-unit corporate order remains 100% fulfilled without delay!";
  }

  // 7. SHORTFALL DETECTION / EDGE CASE
  if (lower.includes("shortfall") || lower.includes("edge case") || lower.includes("160")) {
    return "If total cluster capacity drops below demand (e.g., total capacity = 160 units), our engine flags an immediate **40-unit Shortfall Alert** (`Shortfall = max(0, D - Σa_i)`). The buyer console instantly surfaces two proactive options: (a) Accept 160 units partial batch, or (b) Extend delivery timeline by 6 days to route an adjacent cluster. Zero silent defaults!";
  }

  // 8. FAIR TRADE ECONOMICS / 75% WAGE / 8% FEE
  if (lower.includes("price") || lower.includes("fee") || lower.includes("percentage") || lower.includes("wage") || lower.includes("8%") || lower.includes("75%") || lower.includes("dbt") || lower.includes("payout")) {
    return "On KalaSamanvaya, **75% of every rupee goes directly to the artisan's bank account** (e.g., ₹90,000 on a ₹1,20,000 B2B order, or ₹1,380 on a ₹1,850 Kasuti shawl). 12% is disbursed upfront as a raw material advance to prevent high-interest moneylender debt, 5% supports the local SHG cluster lead, and our lean platform fee is only 8%. Overall, **92% stays directly within the rural cluster**! Explore /impact for the live simulator.";
  }

  // 9. VERNACULAR VOICE & SPEECH ONBOARDING
  if (lower.includes("voice") || lower.includes("speech") || lower.includes("kn-in")) {
    return "Rural crafters onboard at /artisan/onboard using spoken Kannada (`kn-IN`) or Coastal Tulu (`tcy`). They simply speak into their phone (e.g. *\"ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಬೆಲೆ 600 ರೂಪಾಯಿ\"*), and our AI extracts the craft type, units, and price without requiring English typing or GST forms. It also features bilingual number display like *'80 (ಎಂಬತ್ತು)'* for financial defense.";
  }

  // 10. AI PHOTO SCANNER
  if (lower.includes("photo") || lower.includes("camera") || lower.includes("scan") || lower.includes("image")) {
    return "Our Multimodal AI Craft Scanner at /artisan/onboard allows artisans to snap a picture of their handcrafted item. The vision model automatically detects the craft category (Kasuti, Beedu, Pottery, Bidriware, Yakshagana), materials, weaving technique, and fair base price!";
  }

  // 11. GI CRAFT PASSPORT & HANGTAG
  if (lower.includes("gi") || lower.includes("passport") || lower.includes("qr") || lower.includes("hangtag")) {
    return "Every authentic item comes with a verifiable **GI Craft Passport** featuring a scannable QR hangtag and spoken Kannada provenance audio narration. It displays the maker's name, cluster coordinates, labor hours, and a transparent wage breakdown, ensuring buyers receive genuine heritage instead of machine polyester fakes.";
  }

  // 12. SUPPORTED CRAFTS
  if (lower.includes("craft") || lower.includes("product") || lower.includes("kasuti") || lower.includes("beedu") || lower.includes("pottery") || lower.includes("bidri") || lower.includes("yakshagana")) {
    return "KalaSamanvaya currently features 7 authentic Karnataka craft traditions: (1) Dharwad Kasuti Silk Shawls, (2) Udupi Beedu Wildgrass Baskets, (3) Khanapur Belagavi Terracotta Pottery, (4) Navalgund Peacock Stoles, (5) Bidar Silver Inlay Bidriware, (6) Udupi GI Handloom Cotton Sarees, and (7) Coastal Tulunadu Yakshagana Regalia & Kireeta. Browse them at /marketplace!";
  }

  // 13. SHIPPING, RETURNS & LOGISTICS
  if (lower.includes("shipping") || lower.includes("delivery") || lower.includes("return") || lower.includes("india post") || lower.includes("dnk")) {
    return "Orders are consolidated at local cluster hubs (Dharwad, Udupi, Belagavi) and dispatched via India Post Speed Post and Dak Ghar Niryat Kendra (DNK). Delivery takes 2–4 days in Karnataka and 3–5 days across India. We offer a **7-Day Handcrafted Transit Safe Guarantee** with 100% free cluster remake or refund for any transit damage. Learn more at /help?tab=shipping!";
  }

  // 14. PRIVACY & DATA SECURITY
  if (lower.includes("privacy") || lower.includes("data") || lower.includes("security")) {
    return "KalaSamanvaya is 100% ad-free with zero commercial tracking. Spoken Kannada/Tulu voice recordings are processed transiently to extract craft catalogue cards and are never sold to ad brokers. Artisan Aadhaar DBT bank accounts and UPI details are encrypted and used solely for direct wage disbursements. Details at /help?tab=privacy!";
  }

  // 15. CONTACT & CUSTOMER CARE
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("address")) {
    return "You can reach the KalaSamanvaya Cluster Coordination Desk at Phone: **+91 91138 09951**, Email: **info@kalasamanvaya.in**, located at Heritage Crafts Center, Dharwad & Udupi Clusters, Karnataka - 580001. Mon-Sat: 10:00 AM - 7:30 PM.";
  }

  // 16. ENGLISH DEFAULT FALLBACK
  return "Welcome to KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ)! We connect Karnataka's master craft clusters to corporate buyers and retail patrons with guaranteed multi-artisan fulfillment, native voice onboarding (kn-IN & tcy), and 75% direct maker wages. You can ask me about our allocation algorithm, the 200-unit stress test, artisan payouts, shipping policies, or specific crafts!";
}

function getActionLink(query: string, response: string, isKannada: boolean): { label: string; href: string; icon: string } | undefined {
  const text = (query + " " + response).toLowerCase();

  if (text.includes("b2b") || text.includes("corporate") || text.includes("bulk") || text.includes("200") || text.includes("msi") || text.includes("allocation") || text.includes("rebalance") || text.includes("ಬೃಹತ್") || text.includes("ಹಂಚಿಕೆ")) {
    return {
      label: isKannada ? "B2B ಬೃಹತ್ ಕನ್ಸೋಲ್ ತೆರೆಯಿರಿ" : "Open B2B Bulk Console",
      href: "/b2b",
      icon: "b2b",
    };
  }
  if (text.includes("voice") || text.includes("onboard") || text.includes("photo") || text.includes("scanner") || text.includes("camera") || text.includes("ಧ್ವನಿ") || text.includes("ನೊಂದಣಿ") || text.includes("ಕ್ಯಾಮರಾ")) {
    return {
      label: isKannada ? "ಕುಶಲಕರ್ಮಿಗಳ ಧ್ವನಿ ನೊಂದಣಿ" : "Open Artisan Voice Portal",
      href: "/artisan/onboard",
      icon: "voice",
    };
  }
  if (text.includes("impact") || text.includes("wage") || text.includes("fee") || text.includes("8%") || text.includes("75%") || text.includes("economic") || text.includes("ಕೂಲಿ") || text.includes("ಲಾಭ")) {
    return {
      label: isKannada ? "75% ನೇರ ಕೂಲಿ ಮಾದರಿ ವೀಕ್ಷಿಸಿ" : "View Fair-Wage Model",
      href: "/impact",
      icon: "info",
    };
  }
  if (text.includes("shipping") || text.includes("return") || text.includes("privacy") || text.includes("terms") || text.includes("policy") || text.includes("help") || text.includes("ವಿತರಣೆ") || text.includes("ಗೌಪ್ಯತೆ")) {
    return {
      label: isKannada ? "ಸಹಾಯ & ನೀತಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ" : "View Customer Care & Policies",
      href: "/help",
      icon: "info",
    };
  }
  if (text.includes("inbox") || text.includes("order accept") || text.includes("work order") || text.includes("ಇನ್‌ಬಾಕ್ಸ್")) {
    return {
      label: isKannada ? "ಕುಶಲಕರ್ಮಿ ಇನ್‌ಬಾಕ್ಸ್ ತೆರೆಯಿರಿ" : "Open Artisan Inbox",
      href: "/artisan/inbox",
      icon: "shop",
    };
  }
  return {
    label: isKannada ? "ಕರಕುಶಲ ಮಳಿಗೆ ವೀಕ್ಷಿಸಿ" : "Explore Handcrafted Store",
    href: "/marketplace",
    icon: "shop",
  };
}
