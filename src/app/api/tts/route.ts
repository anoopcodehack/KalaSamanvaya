import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function chunkText(text: string, maxLen = 160): string[] {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= maxLen) return [clean];

  const chunks: string[] = [];
  const sentences = clean.split(/(?<=[.!?।॥\n])\s+/);
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).trim().length <= maxLen) {
      current = (current + " " + sentence).trim();
    } else {
      if (current) chunks.push(current);
      if (sentence.length <= maxLen) {
        current = sentence;
      } else {
        const words = sentence.split(" ");
        let subChunk = "";
        for (const word of words) {
          if ((subChunk + " " + word).trim().length <= maxLen) {
            subChunk = (subChunk + " " + word).trim();
          } else {
            if (subChunk) chunks.push(subChunk);
            subChunk = word;
          }
        }
        current = subChunk;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks.slice(0, 5); // Up to 5 chunks (~800 characters)
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const lang = searchParams.get("lang") || "kn";

    if (!text.trim()) {
      return NextResponse.json({ error: "Text parameter is required" }, { status: 400 });
    }

    const targetLang = lang === "kn" ? "kn" : "en-IN";
    const chunks = chunkText(text);

    const buffers: Buffer[] = [];
    for (const chunk of chunks) {
      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${targetLang}&q=${encodeURIComponent(chunk)}`;
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

      const ab = await res.arrayBuffer();
      buffers.push(Buffer.from(ab));
    }

    const mergedAudio = Buffer.concat(buffers);

    return new NextResponse(mergedAudio, {
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
