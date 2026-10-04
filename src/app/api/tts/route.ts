import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const lang = searchParams.get("lang") || "kn";

    if (!text.trim()) {
      return NextResponse.json({ error: "Text parameter is required" }, { status: 400 });
    }

    // Google Translate TTS endpoint supporting native Kannada (kn) and Indian English (en)
    const targetLang = lang === "kn" ? "kn" : "en-IN";
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${targetLang}&q=${encodeURIComponent(text.slice(0, 200))}`;

    const res = await fetch(googleTtsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch TTS audio", status: res.status },
        { status: res.status }
      );
    }

    const audioBuffer = await res.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "TTS generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
