import { NextResponse } from "next/server";
import { parseKannadaTranscript } from "@/lib/voice/kannadaKeywords";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();
    if (!transcript) {
      return NextResponse.json({ error: "No transcript provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API key is present in environment, query Gemini for deep multimodal extraction
    if (apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 10) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI assistant for KalaSamanvaya, parsing rural Indian artisan craft listings from spoken Kannada or Indian English.
Transcript: "${transcript}"

Extract into pure JSON without code fence:
{
  "craft": "Kasuti" or "Beedu" or "Pottery" or "Bidriware" or "Channapatna Toys",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" or "ಬೀಡು ಬುಟ್ಟಿ" or "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" or "ಬಿದ್ರಿ ಕಲೆ" or "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ",
  "itemName": "Descriptive Item Name in English",
  "quantity": number,
  "pricePerUnitINR": number,
  "totalValueINR": number,
  "material": "Authentic Materials",
  "leadTimeDays": number,
  "rawTranscript": "${transcript}",
  "confidence": 0.98
}`
                    }
                  ]
                }
              ]
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          if (parsed.craft && parsed.quantity && parsed.pricePerUnitINR) {
            return NextResponse.json({
              success: true,
              extracted: parsed,
              source: "Google Gemini 1.5 Flash AI Engine",
            });
          }
        }
      } catch (err) {
        console.warn("Gemini API parsing fallback to heuristic:", err);
      }
    }

    // Heuristic structured extraction fallback
    const extracted = parseKannadaTranscript(transcript);

    return NextResponse.json({
      success: true,
      extracted,
      source: "kn-IN Web Speech API + Enhanced Rule-based Heuristic Extractor",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse transcript", details: String(error) },
      { status: 500 }
    );
  }
}
