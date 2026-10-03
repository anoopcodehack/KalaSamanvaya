import { NextResponse } from "next/server";
import { parseKannadaTranscript } from "@/lib/voice/kannadaKeywords";

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();
    if (!transcript) {
      return NextResponse.json({ error: "No transcript provided" }, { status: 400 });
    }

    // Heuristic structured extraction
    const extracted = parseKannadaTranscript(transcript);

    return NextResponse.json({
      success: true,
      extracted,
      source: "kn-IN Web Speech API + Rule-based Heuristic Extractor",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse transcript", details: String(error) },
      { status: 500 }
    );
  }
}
