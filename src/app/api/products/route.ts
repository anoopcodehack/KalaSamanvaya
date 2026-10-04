import { NextResponse } from "next/server";
import { getAllProducts, addProduct } from "@/lib/db/store";
import { ArtisanProduct } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const craft = searchParams.get("craft");
    const query = searchParams.get("q");

    let products = await getAllProducts();

    if (craft && craft !== "ALL") {
      products = products.filter((p) => p.craftType.toLowerCase() === craft.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.kannadaTitle.includes(q) ||
          p.artisanName.toLowerCase().includes(q) ||
          p.artisanCluster.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.priceINR || !body.craftType) {
      return NextResponse.json(
        { error: "Missing required fields: title, priceINR, craftType" },
        { status: 400 }
      );
    }

    const price = Number(body.priceINR);
    const artisanPayout = Math.round(price * 0.75);
    const rawMaterials = Math.round(price * 0.18);
    const packagingLogistics = Math.round(price * 0.07);

    const newProduct: ArtisanProduct = {
      id: `prod-${Date.now().toString().slice(-6)}`,
      title: body.title,
      kannadaTitle: body.kannadaTitle || body.title,
      craftType: body.craftType,
      categoryLabel: body.categoryLabel || `${body.craftType} Craft`,
      priceINR: price,
      compareAtPriceINR: Math.round(price * 1.3),
      rating: 5.0,
      reviewsCount: 1,
      badge: "Limited Artisan Batch",
      artisanName: body.artisanName || "Shantavva Hosamani",
      artisanKannadaName: body.artisanKannadaName || "ಶಾಂತವ್ವ ಹೊಸಮನಿ",
      artisanCluster: body.artisanCluster || "Hubballi Rural SHG",
      artisanDistrict: body.artisanDistrict || "Dharwad",
      leadTimeDays: Number(body.leadTimeDays) || 14,
      stockAvailable: Number(body.quantity) || 10,
      imageUrl:
        body.imageUrl ||
        "/assets/craft-kasuti.jpg",
      shortDescription:
        body.shortDescription ||
        `Directly handcrafted by ${body.artisanName || "local artisan"} with authentic rural techniques.`,
      craftStory:
        body.craftStory ||
        "Every piece is individually handcrafted in traditional rural artisan clusters in Karnataka. 75% of your purchase directly supports the artisan's household livelihood.",
      breakdown: {
        handcraftHours: Number(body.handcraftHours) || 24,
        artisanDirectPayoutINR: artisanPayout,
        rawMaterialsINR: rawMaterials,
        clusterPackagingLogisticsINR: packagingLogistics,
        platformCoordinationFeeINR: 0,
        powerloomMachinePrintCompareINR: Math.round(price * 0.4),
        powerloomMachineMinutes: 5,
        artisanSharePercent: 75,
        materialsUsed: body.materialsUsed || "Natural hand-spun threads & dyes",
        techniqueName: body.techniqueName || "Traditional handloom craft",
        regionalHeritageNote: "Certified handmade craft from local Karnataka artisan collectives.",
      },
      tags: [body.craftType, "Handmade", "FairPrice"],
    };

    const saved = await addProduct(newProduct);

    return NextResponse.json({
      success: true,
      message: "Artisan product listed successfully in live marketplace catalogue",
      product: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product listing", details: String(error) },
      { status: 500 }
    );
  }
}
