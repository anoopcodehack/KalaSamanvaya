import http from "node:http";
import assert from "node:assert/strict";

const BASE_URL = process.env.TEST_URL || "http://127.0.0.1:3000";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  bold: "\x1b[1m",
};

let passed = 0;
let failed = 0;

async function test(name, fn) {
  process.stdout.write(`  • ${name}... `);
  const start = Date.now();
  try {
    await fn();
    const duration = Date.now() - start;
    console.log(`${colors.green}PASSED${colors.reset} (${duration}ms)`);
    passed++;
  } catch (err) {
    const duration = Date.now() - start;
    console.log(`${colors.red}FAILED${colors.reset} (${duration}ms)`);
    console.error(`    ${colors.red}${err.message}${colors.reset}`);
    failed++;
  }
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  return res;
}

async function runAllTests() {
  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  KALASAMANVAYA (ಕಲಾ ಸಮನ್ವಯ) — COMPANY-GRADE E2E TEST SUITE   ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  Testing against: ${BASE_URL}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════${colors.reset}\n`);

  // SECTION 1: Page Routes & UI Assets
  console.log(`${colors.bold}1. Core Application Pages (HTTP 200 Verification)${colors.reset}`);
  
  await test("GET / (Landing Page with 4-into-1 Assembly)", async () => {
    const res = await request("/");
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("ಕಲಾ ಸಮನ್ವಯ") || html.includes("KalaSamanvaya"));
  });

  await test("GET /marketplace (Curated Catalogue & GI Passport)", async () => {
    const res = await request("/marketplace");
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("Kasuti") || html.includes("Beedu"));
  });

  await test("GET /artisan/onboard (Vernacular Voice & Lighting Scanner)", async () => {
    const res = await request("/artisan/onboard");
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("ಧ್ವನಿ") || html.includes("Voice"));
  });

  await test("GET /artisan/inbox (Artisan Work Order Acceptance)", async () => {
    const res = await request("/artisan/inbox");
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("ಇನ್‌ಬಾಕ್ಸ್") || html.includes("Inbox"));
  });

  await test("GET /b2b (Multi-Artisan Allocation Console)", async () => {
    const res = await request("/b2b");
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("200") && (html.includes("Allocation") || html.includes("Kasuti")));
  });

  await test("GET /impact (75/12/5/8 Fair-Trade Monetization Simulator)", async () => {
    const res = await request("/impact");
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("75%") && html.includes("8%"));
  });

  await test("GET /login (Multi-Persona Role Switcher)", async () => {
    const res = await request("/login");
    assert.equal(res.status, 200);
  });

  await test("GET /help (Cluster Customer Care & Policies)", async () => {
    const res = await request("/help");
    assert.equal(res.status, 200);
  });

  await test("GET /download-test-image.html (Low-Exposure Generator Utility)", async () => {
    const res = await request("/download-test-image.html");
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes("Low-Quality Test Photo Generator"));
  });

  // SECTION 2: B2B Deterministic Allocation & Dynamic Rebalancing Engine
  console.log(`\n${colors.bold}2. Deterministic Fulfilment Engine & Recovery Scenarios${colors.reset}`);

  await test("GET /api/allocate (200-Unit Benchmark Allocation)", async () => {
    const res = await request("/api/allocate");
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.targetQuantity, 200);
    assert.equal(data.totalAllocated, 200);
    assert.equal(data.shortfall, 0);
    assert.equal(data.isFullyFulfilled, true);
    assert.ok(data.allocations.length >= 3);
    // Verifying Savita N. (Dharwad) gets top allocation due to highest MSI score
    assert.equal(data.allocations[0].artisanId, "art-kasuti-01");
    assert.equal(data.allocations[0].allocatedUnits, 80);
  });

  await test("GET /api/allocate?scenario=shortfall (160-Unit Cluster Cap Edge Case)", async () => {
    const res = await request("/api/allocate?scenario=shortfall");
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.targetQuantity, 200);
    assert.equal(data.totalAllocated, 160);
    assert.equal(data.shortfall, 40);
    assert.equal(data.isFullyFulfilled, false);
    assert.equal(data.shortfallDetected, true);
    assert.ok(data.shortfallAlert.includes("40-Unit Shortfall Detected"));
  });

  await test("POST /api/reallocate (Artisan A Dropout Recovery Shock)", async () => {
    const res = await request("/api/reallocate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: "ORD-200-KASUTI",
        adjustments: [
          { artisanId: "art-kasuti-01", newCapacity: 40, reason: "Sudden illness capacity drop" }
        ]
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.recoverySummary.deficitCaused, 40);
    assert.equal(data.recoverySummary.deficitRecovered, 40);
    assert.equal(data.recoverySummary.isCompletelyRecovered, true);
    // Verify Artisan C absorbed buffer and Standby Artisan D was activated
    assert.ok(data.recoverySummary.transferredToArtisans.length >= 2);
  });

  // SECTION 3: Products & Orders Store / MongoDB Pipeline
  console.log(`\n${colors.bold}3. Product Catalogue & Order Management Pipeline${colors.reset}`);

  let testProductId = "";
  await test("GET /api/products (Retrieve Craft Catalogue)", async () => {
    const res = await request("/api/products");
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.products));
    assert.ok(data.products.length >= 5);
    const hasKasuti = data.products.some((p) => p.craftType === "Kasuti");
    const hasBeedu = data.products.some((p) => p.craftType === "Beedu");
    assert.ok(hasKasuti, "Must include Kasuti embroidery");
    assert.ok(hasBeedu, "Must include Beedu basketry");
  });

  await test("POST /api/products (Publish New Craft Listing)", async () => {
    const res = await request("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Handcrafted Beedu Storage Hamper",
        kannadaTitle: "ಪರೀಕ್ಷಾ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿ",
        craftType: "Beedu",
        priceINR: 450,
        quantity: 25,
        artisanName: "Janaki Poojary",
        artisanKannadaName: "ಜಾನಕಿ ಪೂಜಾರಿ",
        artisanCluster: "Udupi Coastal Guild",
        artisanDistrict: "Udupi",
        leadTimeDays: 7,
        imageUrl: "/assets/craft-beedu.jpg",
        shortDescription: "Organic coastal wild rivergrass basket",
        craftStory: "Eco-friendly handwoven Beedu craft."
      })
    });
    assert.ok(res.status === 200 || res.status === 201, `Status was ${res.status}`);
    const data = await res.json();
    assert.ok(data.success);
    assert.ok(data.product.id);
    testProductId = data.product.id;
  });

  await test("GET /api/orders (Retrieve Work Orders for Artisan Inbox)", async () => {
    const res = await request("/api/orders");
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.orders));
    assert.ok(data.orders.length > 0);
  });

  await test("POST /api/orders (Customer Place Order with DBT/UPI)", async () => {
    const createRes = await request("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: testProductId || "prod-kasuti-01",
        quantity: 2,
        buyerName: "Enterprise Patron",
        buyerPhone: "+91 98765 43210",
        deliveryDistrict: "Bengaluru Urban",
        deliveryAddress: "Indiranagar, Bengaluru",
        paymentMethod: "UPI"
      })
    });
    assert.ok(createRes.status === 200 || createRes.status === 201, `Status was ${createRes.status}`);
    const orderData = await createRes.json();
    assert.ok(orderData.success);
    assert.ok(orderData.order?.orderId || orderData.order?.id);
  });

  // SECTION 4: Vernacular Speech & Keyword Parsing Engine
  console.log(`\n${colors.bold}4. Multilingual Speech & NLP Parsing Engine${colors.reset}`);

  await test("POST /api/voice-parse (Pure Kannada: 50 Beedu Baskets)", async () => {
    const res = await request("/api/voice-parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transcript: "ನಮ್ಮಲ್ಲಿ 50 ಬೀಡು ಬುಟ್ಟಿಗಳಿವೆ ಬೆಲೆ 450 ರೂಪಾಯಿ 10 ದಿನಗಳಲ್ಲಿ ನೀಡುತ್ತೇವೆ",
        language: "kn"
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    const listing = data.extracted || data.listing;
    assert.ok(listing, "Expected extracted listing");
    assert.equal(listing.craft, "Beedu");
    assert.equal(listing.quantity, 50);
    assert.equal(listing.pricePerUnitINR, 450);
    assert.equal(listing.leadTimeDays, 10);
  });

  await test("POST /api/voice-parse (Coastal Tulu Dialect Parsing)", async () => {
    const res = await request("/api/voice-parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transcript: "ಬೀಡುದ ಬುಟ್ಟಿ 40 ಉಂಡು ಒಂಜೆಕ್ ಬೆಲೆ 450 ರುಪಾಯಿ 7 ದಿನೊಟು ಕೊರ್ಪ",
        language: "tcy"
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    const listing = data.extracted || data.listing;
    assert.ok(listing, "Expected extracted listing");
    assert.equal(listing.craft, "Beedu");
    assert.equal(listing.quantity, 40);
    assert.equal(listing.pricePerUnitINR, 450);
    assert.equal(listing.leadTimeDays, 7);
  });

  await test("POST /api/voice-parse (Kanglish Transliteration Parsing)", async () => {
    const res = await request("/api/voice-parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transcript: "nammalli 80 kasuti shalugalive 600 rupayi 15 days",
        language: "kn"
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    const listing = data.extracted || data.listing;
    assert.ok(listing, "Expected extracted listing");
    assert.equal(listing.craft, "Kasuti");
    assert.equal(listing.quantity, 80);
    assert.equal(listing.pricePerUnitINR, 600);
  });

  await test("GET /api/tts (Kannada Speech Stream Audio Output)", async () => {
    const res = await request("/api/tts?lang=kn&text=ನಮಸ್ಕಾರ%20ಕಲಾ%20ಸಮನ್ವಯ");
    assert.equal(res.status, 200);
    const contentType = res.headers.get("content-type");
    assert.ok(contentType.includes("audio/mpeg"), `Expected audio/mpeg, got ${contentType}`);
    const buffer = await res.arrayBuffer();
    assert.ok(buffer.byteLength > 1000, `Expected audio buffer > 1KB, got ${buffer.byteLength} bytes`);
  });

  await test("POST /api/chat (Vernacular AI Craft Assistant)", async () => {
    const res = await request("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "What is Kasuti embroidery?",
        language: "en"
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.reply || data.response, "Expected reply from assistant");
  });

  // SUMMARY REPORT
  console.log(`\n${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}  TEST RESULTS SUMMARY:${colors.reset}`);
  console.log(`  Total Executed: ${passed + failed}`);
  console.log(`  ${colors.green}Passed: ${passed}${colors.reset}`);
  if (failed > 0) {
    console.log(`  ${colors.red}Failed: ${failed}${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`  ${colors.bold}${colors.green}ALL ${passed} TESTS PASSED (100% SUCCESS RATE)!${colors.reset}`);
    console.log(`${colors.bold}${colors.cyan}══════════════════════════════════════════════════════════════${colors.reset}\n`);
  }
}

runAllTests().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exit(1);
});
