import { NextResponse } from "next/server";
import { parseKannadaTranscript } from "@/lib/voice/kannadaKeywords";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "KalaSamanvaya Voice Parsing Engine",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transcript, audioBase64, mimeType } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    const isGeminiAvailable = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 10;

    // SCENARIO 1: Direct Audio Recording passed with Gemini API Key
    if (audioBase64 && isGeminiAvailable) {
      try {
        const cleanBase64 = audioBase64.replace(/^data:audio\/\w+;base64,/, "");
        const audioMime = mimeType || "audio/webm";

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      inlineData: {
                        mimeType: audioMime,
                        data: cleanBase64,
                      },
                    },
                    {
                      text: `You are an AI assistant for KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ), a digital marketplace for rural Karnataka artisans.
Listen to this voice recording (spoken in Kannada or Indian English).
1. Transcribe the spoken text in "rawTranscript".
2. Extract the craft name, quantity, price per unit in INR, and turnaround days.

Return ONLY a valid JSON object matching this schema without markdown code blocks:
{
  "rawTranscript": "spoken text in Kannada or English",
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ",
  "itemName": "Authentic Handcrafted item title",
  "quantity": number,
  "pricePerUnitINR": number,
  "totalValueINR": number,
  "material": "Authentic cluster material",
  "leadTimeDays": number,
  "confidence": 0.98
}`,
                    },
                  ],
                },
              ],
            }),
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
              source: "Google Gemini 1.5 Flash Multimodal Audio Transcriber",
            });
          }
        }
      } catch (err) {
        console.warn("Direct audio Gemini transcription failed, falling back to text:", err);
      }
    }

    // SCENARIO 2: Transcript text passed with Gemini API Key
    if (transcript && isGeminiAvailable) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an AI assistant for KalaSamanvaya. Parse this rural artisan transcript: "${transcript}"
Extract into pure JSON without code fences:
{
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ",
  "itemName": "Descriptive Item Title",
  "quantity": number,
  "pricePerUnitINR": number,
  "totalValueINR": number,
  "material": "Authentic Craft Materials",
  "leadTimeDays": number,
  "rawTranscript": "${transcript}",
  "confidence": 0.98
}`,
                    },
                  ],
                },
              ],
            }),
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
        console.warn("Gemini transcript parsing failed, using heuristic:", err);
      }
    }

    // SCENARIO 3: Rule-Based Bilingual Heuristic Fallback
    if (!transcript || !transcript.trim()) {
      return NextResponse.json(
        { error: "No speech recognized. Please speak closer to the mic or select a 1-click preset." },
        { status: 400 }
      );
    }

    const extracted = parseKannadaTranscript(transcript);

    return NextResponse.json({
      success: true,
      extracted,
      source: "kn-IN Web Speech API + Enhanced Rule-based Heuristic Extractor",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process audio or transcript", details: String(error) },
      { status: 500 }
    );
  }
}
