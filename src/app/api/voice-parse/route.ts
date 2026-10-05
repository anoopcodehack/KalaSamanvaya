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
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
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
                      text: `You are an AI speech transcriber and assistant for KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ), a Karnataka craft platform.
Listen to this voice recording spoken in Kannada, Indian English, or Kanglish.
1. Transcribe the exact spoken words into "rawTranscript".
2. If this is a craft listing (e.g., "80 kasuti shawls 600 rupees"), also extract craft, quantity, and price. If it is a general question or message, transcribe it and set quantity to 1.

Return ONLY a valid JSON object matching this schema without markdown code blocks:
{
  "rawTranscript": "exact words spoken in Kannada or English",
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys" | "Udupi Sarees" | "Yakshagana Regalia" | "Belagavi Terracotta" | "General",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ" | "ಉಡುಪಿ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ" | "ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ" | "ಸಾಮಾನ್ಯ",
  "itemName": "Title or summary of speech",
  "quantity": 1,
  "pricePerUnitINR": 0,
  "totalValueINR": 0,
  "material": "Authentic cluster material",
  "leadTimeDays": 7,
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
          let parsed: any = {};
          try {
            parsed = JSON.parse(cleaned);
          } catch (_) {
            parsed = { rawTranscript: cleaned };
          }
          if (parsed && (parsed.rawTranscript || parsed.itemName)) {
            return NextResponse.json({
              success: true,
              extracted: {
                ...parsed,
                rawTranscript: parsed.rawTranscript || rawText,
              },
              source: "Google Gemini Multimodal Audio Transcriber",
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
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
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
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys" | "Udupi Sarees" | "Yakshagana Regalia" | "Belagavi Terracotta",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ" | "ಉಡುಪಿ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ" | "ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ",
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
          const rawText = data?.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text || "";
          const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
          let parsed: any = {};
          try {
            parsed = JSON.parse(cleaned);
          } catch (_) {
            parsed = { rawTranscript: cleaned };
          }
          if (parsed && (parsed.rawTranscript || parsed.itemName || parsed.craft)) {
            return NextResponse.json({
              success: true,
              extracted: {
                ...parsed,
                rawTranscript: parsed.rawTranscript || transcript,
              },
              source: "Google Gemini AI Engine",
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
