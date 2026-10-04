import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the friendly, knowledgeable "Craft Concierge & Buyer Assistant" for KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ) — an authentic direct-to-artisan craft & fair-trade platform in Karnataka.

Knowledge base:
1. Crafts & Pricing:
- Dharwad Kasuti Silk Shawl: ₹1,850 retail (₹1,380 goes directly to artisan Savita Naik; 38 hours of knotless hand embroidery; GI certified).
- Udupi Beedu Wildgrass Hampers: ₹680 retail (₹510 direct to artisan Parvati Madiwala; 14 hours plaiting; coastal wildgrass).
- Khanapur Terracotta Water Jug: ₹420 retail (₹315 direct to artisan Sheena Kulal; 7 days lead time; natural cooling).
2. Business Model:
- 74.6% direct DBT wage realization for artisans (vs only 20% in traditional middleman trade).
- 8% transparent platform sustainability fee.
- 12.4% insured eco-packaging & logistics.
- 5.0% quality verification & cluster facilitation.
3. Features:
- Voice Listing: Rural artisans speak in Kannada at /artisan/onboard to list items without typing.
- B2B Corporate Gifting: Automated 200-unit quota distribution at /b2b across self-help groups with standby artisan recovery.
- Provenance Hangtags: Every product comes with a QR Craft Passport verifying artisan name, GI tag, and wage breakdown.

Behavior:
- If the user writes in Kannada, reply warmly and fluently in pure, natural Kannada.
- If the user writes in English, reply in friendly, professional English.
- Keep answers concise (2-4 sentences max), informative, and inviting.
- Suggest links where appropriate: /marketplace (shop), /artisan/onboard (voice portal), /b2b (corporate orders), /impact (fair-trade model).`;

export async function GET() {
  return NextResponse.json({ status: "online", service: "KalaSamanvaya Craft Concierge AI" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body.message || "").trim();

    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isGeminiAvailable = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 10;

    let botResponse = "";

    if (isGeminiAvailable) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: `${SYSTEM_PROMPT}\n\nBuyer Question: "${userMessage}"\nHelpful, concise answer:` }
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
            botResponse = textPart.text.trim();
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini chat fallback:", geminiErr);
      }
    }

    // Heuristic Fallback if Gemini unavailable or failed
    if (!botResponse) {
      botResponse = getHeuristicResponse(userMessage);
    }

    // Determine relevant action link
    const actionLink = getActionLink(userMessage, botResponse);

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

function getHeuristicResponse(q: string): string {
  const lower = q.toLowerCase();

  // Kannada Queries
  if (lower.includes("ಬೆಲೆ") || lower.includes("ರೂಪಾಯಿ") || lower.includes("ಖರ್ಚು")) {
    return "ಕಲಾ ಸಮನ್ವಯದಲ್ಲಿ ಶೇಕಡಾ 75 ಕ್ಕೂ ಹೆಚ್ಚು ನೇರ ಕೂಲಿ ಹಣ (₹1,850 ರಲ್ಲಿ ₹1,380) ನೇರವಾಗಿ ಕುಶಲಕರ್ಮಿ ಮಹಿಳೆಯರ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಆಗುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಕಸೂತಿ ಶಾಲಿಗೆ 38 ಗಂಟೆಗಳ ಕರಕುಶಲ ಸೂಕ್ಷ್ಮ ಶ್ರಮ ಬೇಕಾಗುತ್ತದೆ.";
  }
  if (lower.includes("ಕಸೂತಿ") || lower.includes("ಧಾರವಾಡ")) {
    return "ಧಾರವಾಡ ಕಸೂತಿ 7ನೇ ಶತಮಾನದ ಚಾಲುಕ್ಯರ ಕಾಲದ ವಿಶ್ವಪ್ರಸಿದ್ಧ ಭೌಗೋಳಿಕ ಮಾನ್ಯತೆ (GI) ಪಡೆದ ಸೂಜಿ ಕಲೆಯಾಗಿದೆ. ಗವಂತಿ ಮತ್ತು ಮುರ್ಗಿ ಹೊಲಿಗೆಗಳಿಂದ ಗಂಟುಗಳಿಲ್ಲದೆ ಎರಡೂ ಬದಿ ಸಮನಾಗಿ ಕಾಣುವಂತೆ ಇದನ್ನು ನೇಯಲಾಗುತ್ತದೆ.";
  }
  if (lower.includes("ಆರ್ಡರ್") || lower.includes("ಖರೀದಿ") || lower.includes("ಡೆಲಿವರಿ")) {
    return "ನಿಮ್ಮ ಇಷ್ಟದ ಕರಕುಶಲ ವಸ್ತುಗಳನ್ನು ನಮ್ಮ ಮಳಿಗೆಯಲ್ಲಿ (Shop) 1-ಕ್ಲಿಕ್ ಮೂಲಕ ಯುಪಿಐ ಪಾವತಿ ಮಾಡಿ ಖರೀದಿಸಬಹುದು. 5-7 ದಿನಗಳಲ್ಲಿ ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವಾಗಿ ನಿಮ್ಮ ಮನೆಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.";
  }
  if (lower.includes("ಬೃಹತ್") || lower.includes("ಸಂಸ್ಥೆ") || lower.includes("ಉಡುಗೊರೆ")) {
    return "200 ಕ್ಕೂ ಹೆಚ್ಚು ಕಾರ್ಪೊರೇಟ್ ಉಡುಗೊರೆಗಳಿಗಾಗಿ ನಮ್ಮ ಬಿ2ಬಿ ಮಲ್ಟಿ-ಕ್ಲಸ್ಟರ್ ಕನ್ಸೋಲ್ ಬಳಸಿ. ಹಲವು ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳಿಗೆ ಸಮನಾಗಿ ಆರ್ಡರ್ ಹಂಚಿ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ವಿತರಿಸಲಾಗುತ್ತದೆ.";
  }
  if (lower.includes("ಧ್ವನಿ") || lower.includes("ನೊಂದಣಿ") || lower.includes("ಕುಶಲಕರ್ಮಿ")) {
    return "ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳು ಯಾವುದೇ ಇಂಗ್ಲಿಷ್ ಟೈಪಿಂಗ್ ಇಲ್ಲದೆ /artisan/onboard ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕನ್ನಡದಲ್ಲೇ ಸರಳವಾಗಿ ಮಾತನಾಡಿ ತಮ್ಮ ಸರಕುಗಳನ್ನು ನೊಂದಾಯಿಸಬಹುದು.";
  }

  // English Queries
  if (lower.includes("price") || lower.includes("cost") || lower.includes("1850") || lower.includes("why")) {
    return "At KalaSamanvaya, 75%+ of the price (₹1,380 out of ₹1,850) goes directly to the master artisan woman's bank account. A traditional Kasuti shawl requires 38 hours of counted-thread needlework without knots, compared to a synthetic factory print.";
  }
  if (lower.includes("order") || lower.includes("delivery") || lower.includes("ship") || lower.includes("track")) {
    return "All orders ship across India within 5-7 business days with plastic-free terracotta packaging and transit insurance. Every piece includes a verifiable QR Craft Passport honoring the maker.";
  }
  if (lower.includes("bulk") || lower.includes("corporate") || lower.includes("gift") || lower.includes("200")) {
    return "For corporate gifting (200+ units), our Coordinated Multi-Cluster Fulfillment Engine pools quotas across self-help groups (e.g. 80 Dharwad + 70 Kalghatgi + 50 Udupi) with automated standby buffer protection.";
  }
  if (lower.includes("voice") || lower.includes("onboard") || lower.includes("artisan") || lower.includes("rural")) {
    return "Rural makers use our zero-typing Voice Portal (/artisan/onboard). They simply speak in native Kannada, and our Google Gemini engine extracts craft type, quantity, and price automatically.";
  }

  return "Welcome to KalaSamanvaya! We connect master artisans of Karnataka directly to conscious buyers and corporate patrons with 100% fair wages and GI provenance. How can I help you explore today?";
}

function getActionLink(query: string, response: string): { label: string; href: string; icon: string } | undefined {
  const text = (query + " " + response).toLowerCase();

  if (text.includes("corporate") || text.includes("bulk") || text.includes("200") || text.includes("b2b") || text.includes("ಬೃಹತ್")) {
    return { label: "Open B2B Bulk Console", href: "/b2b", icon: "b2b" };
  }
  if (text.includes("voice") || text.includes("onboard") || text.includes("ಧ್ವನಿ") || text.includes("ನೊಂದಣಿ")) {
    return { label: "Open Artisan Voice Portal", href: "/artisan/onboard", icon: "voice" };
  }
  if (text.includes("impact") || text.includes("wage") || text.includes("fee") || text.includes("8%")) {
    return { label: "View Fair-Wage Model", href: "/impact", icon: "info" };
  }
  return { label: "Explore Handcrafted Store", href: "/marketplace", icon: "shop" };
}
