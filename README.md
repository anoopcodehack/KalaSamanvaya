<div align="center">

# KALASAMANVAYA (ಕಲಾ ಸಮನ್ವಯ)
### Digital Market Access & Multi-Artisan Fulfilment Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Compatible%20%7C%20Memory%20Fallback-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vernacular Speech](https://img.shields.io/badge/Vernacular_Speech-kn--IN%20(Tulu%20Roadmap)-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![DEVHACK 2026](https://img.shields.io/badge/DEVHACK_2026-PS_4.2-green?style=for-the-badge)](https://github.com)
[![Team](https://img.shields.io/badge/Team-MIDDLEWARE_MAFIA-purple?style=for-the-badge)](#team)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**A simple platform for local artisans to showcase, price, and sell their crafts—powered by a coordinated multi-artisan fulfilment engine for bulk orders.**

*Track 4: Tourism, Travel & Creative Economy | DEVHACK 2026*  
*PS 4.2 — Digital Market Access for Local Artisans (Kasuti Embroidery, Beedu Craft & Coastal Heritage)*  
**Team: MIDDLEWARE MAFIA**  
**Sahyadri College of Engineering & Management, Mangaluru**

```text
End-to-End User Journey & Differentiator:
[1. Voice/Camera Listing] ──▶ [2. Curated Storefront] ──▶ [3. "Why This Price?"] ──▶ [4. Mock Checkout] ──▶ [5. Artisan Audio Inbox]
                                                                                               │
                                                                 ┌─────────────────────────────┴────────────────────────────┐
                                                                 ▼                                                          ▼
                                                    [ Retail 1-to-1 Payout ]                 [ 200+ Unit Bulk Allocation Engine (MSI) ]
```

[Live Demo](https://kala-samanvaya.vercel.app) • [PS 4.2 Alignment](#alignment-with-ps-42-requirements) • [Architecture](#system-architecture) • [Allocation Engine](#deterministic-allocation-engine) • [Benchmark Scenario](#benchmark-recovery-scenario) • [Feature Matrix](#system-feature-matrix) • [API Specification](#api-specification) • [Getting Started](#local-development-setup) • [Team](#team) • [License](#license)

---

</div>

> **Benchmark-data notice:** Capacity, scores, locations, prices, and recovery outcomes shown in this README are prototype test data unless explicitly identified as measured pilot results. The 200-unit order is a proof-of-concept scenario, not a completed customer order.

## Overview

Individual artisans operate with constrained production bandwidth, while **enterprise buyers may require bulk volumes of 200–500+ units within fixed deadlines.**

> **The Core Insight:**  
> *"Small artisans have small capacities. Larger buyers have bulk requirements. We coordinate the gap."*

> **Core Principle:**  
> *"Speech recognition simplifies artisan onboarding; transparent craft stories justify pricing; deterministic algorithms coordinate bulk fulfilment."*

Existing marketplaces solve discovery (1-to-1 retail). Our platform solves coordinated multi-artisan fulfilment (N-to-1 bulk demand). **Buyers face coordination friction and may turn to standardized alternatives when handmade supply cannot reliably meet volume or deadlines.**

**KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ)** introduces a **coordinated fulfilment layer**. Instead of treating every maker as an isolated seller, our deterministic allocation engine aggregates compatible cluster capacity into a single, verifiable B2B delivery plan—backed by **capacity-update recovery**, **MongoDB-compatible persistence with in-memory fallback for the demo**, and accessible Kannada voice-assisted onboarding.

---

## Alignment with PS 4.2 Requirements

This prototype directly satisfies the exact deliverables specified in **Track 4 PS 4.2**:

| PS 4.2 Hackathon Deliverable | Implementation in KalaSamanvaya | Status |
| :--- | :--- | :---: |
| **Deliverable 1: Working Storefront / Catalogue Interface**<br>*(Artisans can plausibly use with minimal training)* | • **Storefront (`/marketplace`):** Filterable by authentic **Kasuti embroidery**, **Beedu basketry & craft**, **Udupi Handloom**, and **Khanapur coastal pottery** with bilingual search.<br>• **Artisan Portal (`/artisan/onboard`):** Current MVP: Kannada (`kn-IN`) voice onboarding. Prototype photo-scan flow with demo-mode craft data. Production vision verification is planned. Hardware luminance calibration balances exposure for low-light village rooms. | `Working MVP` |
| **Deliverable 2: Simple Listing & Order Flow**<br>*(Payment integration can be mocked)* | • **Listing:** Spoken Kannada voice or camera photo $\rightarrow$ automated craft, price & lead time extraction $\rightarrow$ 1-tap publish with MongoDB-compatible persistence and in-memory fallback for the demo.<br>• **Order & Payout:** Simulated UPI & Direct Bank Transfer (DBT) mock checkout modal.<br>• **Artisan Inbox (`/artisan/inbox`):** Rural SHG cluster receives orders in Kannada with 1-tap dispatch confirmation. | `Working MVP` |
| **Deliverable 3: Craft-Storytelling or Provenance to Support Pricing**<br>*(To communicate handmade value & justify price)* | • **"Why This Price?" Modal:** Transparent breakdown showing 38 hours of counted needlework = ₹1,380 direct wage (75%), materials, cluster logistics, and platform fee—justifying why authentic craft costs more than factory fakes.<br>• **Provenance Card:** Prototype provenance card using demonstration craft metadata. Official GI verification and QR certification are roadmap features. | `Working MVP` |
| **Enterprise Moat 1: Capacity-Aware Multi-Artisan Fulfilment**<br>*(Coordinated cluster supply for bulk orders)* | Solves the **scale mismatch** by aggregating fragmented artisan capacity into bulk allocation plans for enterprise buyers (e.g. 200 units across cluster makers) with simulated capacity shock rebalancing on `/b2b`. | `Working MVP / benchmark tested` |
| **Enterprise Moat 2: Fair-Trade Monetization Simulator**<br>*(Economic viability & transparency)* | **Fair-Trade Impact Simulator (`/impact`):** Interactive model demonstrating the **illustrative 75/12/5/8 allocation model** (**92% illustrative community-retention scenario**; not a measured pilot result) vs 40–60% traditional middleman cuts. | `Simulated benchmark` |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│    ONE PLATFORM. TWO USER JOURNEYS. ONE FULFILMENT ENGINE.  │
└─────────────────────────────────────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   [ B2B Institutional ]                 [ B2C Retail Discovery ]
   • Bulk orders (200–500 units)         • One-of-a-kind craft items
   • Multi-artisan aggregation           • Direct maker interaction
   • Deterministic allocation and        • Craft stories and pricing context
     delivery planning                   • Transparent craft showcase
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
        ┌─────────────────────────────────────────────┐
        │  CAPACITY-AWARE MULTI-ARTISAN ALLOCATOR     │
        │  • Hard Craft Compatibility Filtering       │
        │  • Deterministic Scoring: Sᵢ = f(A, T, L)   │
        │  • Sequential Greedy Order Partitioning     │
        │  • Capacity-update rebalancing and standby  │
        │    recovery                                 │
        └─────────────────────────────────────────────┘
                               ▲
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
    [ Regional Clusters ]                [ Speech & Vernacular ]
    • Kasuti demonstration data from     • Current MVP: Kannada (kn-IN)
      Karnataka clusters                 • Tulu planned for future release
    • Coastal Pottery (DK)               • Heuristic keyword fallback
    • Beedu Handlooms (Udupi)            • Bilingual numbers (80 / ಎಂಬತ್ತು)
```

---

## Deterministic Allocation Engine

The platform coordinates bulk enterprise orders through a 5-stage deterministic pipeline:

```text
[ 1. Hard Filter ] ──▶ [ 2. Match Rank ] ──▶ [ 3. Sequential Allocation ] ──▶ [ 4. Rebalance ] ──▶ [ 5. Shortfall Alert ]
```

### 1. Hard Craft Filtering

Artisans must strictly match the required craft category:

```math
\text{Eligible}(i) = \begin{cases} 1 & \text{if } \text{Craft}_i = \text{Craft}_{\text{Order}} \land c_i > 0 \\ 0 & \text{otherwise} \end{cases}
```

### 2. Multi-Criteria Match Scoring

For each eligible artisan $i$, a composite match score $S_i \in [0, 1]$ is computed:

```math
S_i = 0.45 \cdot (\text{Availability}) + 0.35 \cdot (\text{Turnaround}) + 0.20 \cdot (\text{Logistics})
```

* **Availability Score ($A_i$):** Ratio of current uncommitted capacity $c_i$ to overall monthly capacity $C_{\max, i}$:
```math
A_i = \frac{c_i}{C_{\max, i}}
```
* **Turnaround Fit ($T_i$):** Buffer margin between maker lead time and buyer deadline:
```math
T_i = \begin{cases} 0.60 + 0.40 \left(1 - \frac{\text{LeadTime}_i}{\text{Deadline} + 1}\right) & \text{if } \text{LeadTime}_i \le \text{Deadline} \\ \max\left(0.10, 0.50 - 0.10(\text{LeadTime}_i - \text{Deadline})\right) & \text{if } \text{LeadTime}_i > \text{Deadline} \end{cases}
```
* **Logistics Fit ($L_i$):** Proximity to regional logistics consolidation center:
```math
L_i = \max\left(0.20, 1 - \frac{\text{Distance}_i}{250\text{ km}}\right)
```

### 3. Sequential Greedy Allocation

Artisans are sorted descending by $S_i$ (ties broken by higher remaining capacity). For an order demand $D$:

```math
a_i = \min(c_i, \text{Remaining Demand})
```

### 4. Capacity-Update Rebalancing & Standby Buffers

Unallocated capacity of partially utilized artisans and zero-allocated qualifying artisans are preserved as active standby reserves. When an artisan reports a capacity drop, the engine rebalances the deficit across available cluster buffers.

### 5. Shortfall Detection Alert

If total cluster capacity is insufficient to satisfy the order quantity, the engine flags an explicit shortfall:

```math
\text{Shortfall} = \max\left(0, D - \sum_{i=1}^{n} a_i\right)
```

* **Shortfall Detection Test (If Total Capacity is Reduced to 160):**
  * **Result:** `160 / 200 Allocated; 40-Unit Shortfall Detected`
  * **Action:** Shortfall flag + recommended next action: source additional cluster capacity.

---

## Benchmark Recovery Scenario

*(Benchmark test scenario: Requirement of 200 Handcrafted Kasuti Shawls | Deadline: 20 Days)*

### Scenario: Enterprise Order for 200 Kasuti Handcrafted Units

| Artisan | Location Cluster | Match Score | Registered Capacity | Initial Allocation | Standby Buffer | Recovery Allocation (A drops 80 → 40) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Artisan A (Savita N.)** | Dharwad Central | **0.87** | 80 | **80 units** | 0 | **40 units** *(Capacity drop)* |
| **Artisan B (Manjula P.)** | Kalghatgi Sangha | **0.85** | 70 | **70 units** | 0 | **70 units** *(Unchanged)* |
| **Artisan C (Girija K.)** | Udupi demonstration cluster | **0.82** | 60 | **50 units** | 10 units | **60 units** *(Absorbs +10 buffer)* |
| **Artisan D (Renuka B.)** | Navalgund Group | **0.69** | 40 | **0 units** | 40 units | **30 units** *(Activated from standby)* |
| **Total** | — | — | **250** | **200 / 200 Allocated** | **50 units** | **200 / 200 Reallocated in benchmark** |

```
Initial Execution:   80 + 70 + 50            = 200 / 200 Allocated (100% Benchmark Allocation)
Capacity Disruption: Artisan A capacity reduces from 80 to 40 (-40 deficit)
Capacity Recovery:   A(40) + B(70) + C(60) + D(30) = 200 / 200 Reallocated (Deficit fully recovered in benchmark)
```

---

## Multimodal Artisan Onboarding (Voice + Photo)

To eliminate digital-literacy and typing barriers, artisans can register products via two complementary channels on `/artisan/onboard`:

```text
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     SPOKEN KANNADA VOICE        │       │       PHOTO SCANNER FLOW        │
│ "ನನ್ನ ಬಳಿ 50 ಕಸೂತಿ ಸೀರೆಗಳಿವೆ..." │       │   Mobile camera / image upload  │
│  "50 Kasuti sarees available.." │       │   Demo-mode craft recognition   │
└────────────────┬────────────────┘       └────────────────┬────────────────┘
                 │ Web Speech API (kn-IN)                  │ Demo-mode craft presets
                 ▼                                         ▼ with luminance balance
┌───────────────────────────────────────────────────────────────────────────┐
│                      AUTOMATED STRUCTURED EXTRACTION                      │
│      • Craft Type (Kasuti, Beedu, Pottery)   • Available Batch Units      │
│      • Suggested Artisan Price (INR)         • Production Lead Days       │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                     VERNACULAR HIGH-CONTRAST REVIEW                       │
│    Artisan inspects and confirms pre-filled numeric values in one tap.    │
│    Bilingual Number Display: "80 (ಎಂಬತ್ತು)" & "₹48,000 (ನಲವತ್ತೆಂಟು ಸಾವಿರ)"  │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      ▼
                      [ Cluster Inventory Registry ]
```

* **Current MVP: Kannada (kn-IN) voice onboarding.** Artisans speak in natural Kannada to populate craft type, quantity, price, and lead time via Web Speech API (`kn-IN`) with rule-based fallback keywords (`kannadaKeywords.ts`). Tulu support is planned for a future release.
* **Bilingual Number Defense (`kannadaNumbers.ts`):** Low-literacy artisans are vulnerable to numeric deception or typographical errors. The system renders all production quotas, unit prices, and settlement totals in both digits and native spoken Kannada words (e.g., `80 (ಎಂಬತ್ತು)`, `₹48,000 (ನಲವತ್ತೆಂಟು ಸಾವಿರ ರೂ.)`).
* **Photo Scanner:** Prototype photo-scan flow with demo-mode craft data. Production vision verification is planned.
* **Hardware-Aware Luminance & Exposure Calibration:** Rural craftswomen often photograph works in dimly lit village rooms. KalaSamanvaya calculates real-time canvas pixel luminance ($avg < 112$). When low lighting is detected, it offers a 1-click **`[ Calibrate Lighting ]`** (`[ ಬೆಳಕು ಹೊಂದಿಸಿ ]`) button that balances exposure, lifts deep room shadows, and clarifies authentic thread/wood grains without artificial distortion. Includes a 1-click `[ Dim Photo Demo ]` trigger and a standalone test utility (`/download-test-image.html`) for live evaluation.
* **Human-in-the-Loop Review:** Visual vernacular preview ensures the artisan retains full control before committing quantities.

---

## System Feature Matrix

| Feature | Correct status | Operational Reality |
| :--- | :---: | :--- |
| **Marketplace/storefront** | `Working MVP` | Responsive product catalogue showcasing authentic maker profiles, craft items, and retail pricing. |
| **Mock checkout** | `Working MVP` | Simulated UPI & Direct Bank Transfer (DBT) mock checkout modal with order reference generation. |
| **Artisan inbox** | `Working MVP` | Visual Kannada interface for rural artisans to review and accept cluster production commitments with audio readout. |
| **Kannada voice parsing** | `Working prototype with fallback` | Web Speech API (`kn-IN`) voice recognition with Gemini audio parsing and deterministic rule-based keyword extraction fallback. |
| **Allocation engine** | `Working MVP / benchmark tested` | Deterministic score calculation ($S_i$) and sequential allocation execute in pure TypeScript within the repository. |
| **Rebalancing** | `Working MVP / simulated capacity shock` | Recalculates allocation after a capacity update and routes available standby capacity in the benchmark. |
| **Shortfall detection** | `Working MVP` | Explicitly flags deficits when aggregate cluster capacity is below order demand (e.g. 160-unit cluster cap edge case). |
| **Photo scanner** | `Demo-mode prototype` | Prototype photo-scan flow with demo-mode craft data and hardware luminance/exposure calibration. |
| **Tulu support** | `Roadmap` | Planned for a future release; preliminary dialect phonetic heuristics in exploratory phase. |
| **Official GI verification** | `Roadmap` | Prototype provenance card using demonstration craft metadata. Official GI verification and QR certification are roadmap features. |
| **Physical QC hub** | `Planned workflow` | Regional hub consolidation model for physical quality inspection, aggregation, and standardized packaging. |
| **DBT/escrow payout** | `Roadmap` | Direct Bank Transfer / Razorpay escrow split planned for Phase 2 post-pilot. |
| **Logistics/ONDC integration** | `Roadmap` | Open Network for Digital Commerce (ONDC Beckn protocol) & India Post Dak Ghar Niryat Kendra (DNK) export integration planned. |
| **MongoDB Atlas** | `Conditional` | MongoDB-compatible persistence with in-memory fallback for the demo. |

---

## Repository Structure

```text
d:/KalaSamanvaya/
├── README.md                      # Architecture, mathematical specification & setup guide
├── package.json                   # Dependencies (Next.js 14, React 18, Tailwind, Lucide)
├── tsconfig.json                  # Strict TypeScript compiler options & path aliases (@/*)
├── next.config.mjs                # Next.js bundler settings & remote image patterns
├── tailwind.config.ts             # Artisanal color palette (terracotta, ochre, clay, sand)
├── postcss.config.mjs             # Tailwind CSS PostCSS plugin configuration
├── .env.example                   # Environment configuration template
├── .gitignore                     # Git ignore rules for node_modules and builds
│
├── src/
│   ├── app/                       # Next.js App Router (pages and API handlers)
│   │   ├── layout.tsx             # Root layout with shared navigation & brand footer
│   │   ├── page.tsx               # Landing page highlighting problem, solution & entry points
│   │   ├── b2b/page.tsx           # B2B Bulk Order Allocation & Capacity Recovery Console
│   │   ├── help/page.tsx          # Customer Care & Cluster Policies (Shipping, Privacy, Terms, Bulk)
│   │   ├── impact/page.tsx        # Fair-Trade Monetization & Supply Chain Simulator (8% fee)
│   │   ├── login/page.tsx         # Multi-Persona Role Switcher (Artisan, Buyer, Admin)
│   │   ├── marketplace/page.tsx   # B2C Retail Discovery & GI Craft Passport Showcase
│   │   ├── artisan/
│   │   │   ├── onboard/page.tsx   # Spoken Kannada Voice Listing & Prototype Photo Scanner
│   │   │   └── inbox/page.tsx     # Rural Artisan Order Acceptance & Work Order Inbox
│   │   └── api/
│   │       ├── allocate/route.ts  # Deterministic matching & greedy allocation endpoint
│   │       ├── reallocate/route.ts# Capacity-update rebalance simulator endpoint
│   │       ├── orders/route.ts    # Work orders & allocation acceptance endpoint
│   │       ├── products/route.ts  # Cluster craft catalogue endpoint
│   │       ├── voice-parse/route.ts# Kannada transcript parsing & keyword extraction endpoint
│   │       ├── craft-vision/route.ts# Craft recognition & lighting calibration endpoint
│   │       ├── chat/route.ts      # Conversational vernacular assistant endpoint
│   │       └── tts/route.ts       # Kannada speech audio narration endpoint
│   │
│   ├── components/                # Modular UI Components
│   │   ├── layout/                # Persistent chrome
│   │   │   ├── Navbar.tsx         # Adaptive navigation with role badges & language links
│   │   │   └── Footer.tsx         # Traditional textured footer with authentic branding
│   │   ├── home/                  # Homepage Showcases
│   │   │   └── SpinningAssemblyShowcase.tsx # Scroll-triggered 4-into-1 quadrant craft assembly
│   │   ├── b2b/                   # Allocation graph, batch rebalancing, shortfall alerts
│   │   │   └── AllocationGraph.tsx# Visual cluster allocation & standby capacity breakdown
│   │   ├── impact/                # Fair-Trade Monetization & Supply Chain Simulator
│   │   │   └── FairTradeSimulatorCard.tsx # 3-way economics calculator (75% wage / 8% platform fee)
│   │   ├── voice/                 # Multimodal Vernacular Inputs
│   │   │   ├── KannadaVoiceRecorder.tsx # Web Speech API recorder (kn-IN)
│   │   │   └── AiPhotoCraftScanner.tsx  # Camera scanner with demo presets & exposure calibration
│   │   ├── marketplace/           # Storefront Modals & Showcase
│   │   │   ├── ProductCard.tsx    # Craft listing card with GI tag & pricing preview
│   │   │   ├── CraftPassportModal.tsx # Prototype Provenance Card with demonstration metadata
│   │   │   ├── WhyThisPriceModal.tsx  # "Why This Price?" hand labor & cost breakdown
│   │   │   ├── FairWageShieldModal.tsx# Fair wage pledge & artisan compensation modal
│   │   │   └── MockCheckoutModal.tsx  # Low-friction retail checkout demo
│   │   └── shared/                # Heritage UI Accents
│   │       ├── FolkArtBanner.tsx  # Traditional Karnataka border motif banners
│   │       ├── FolkArtBorder.tsx  # Decorative tribal and terracotta dividers
│   │       ├── CraftChatBot.tsx   # Multilingual vernacular assistant widget
│   │       ├── ScrollReveal.tsx   # Micro-interaction viewport animations
│   │       └── TiltCard.tsx       # Interactive perspective hover cards
│   │
│   ├── lib/                       # Algorithmic Core & Utility Layer
│   │   ├── engine/                # Core Fulfilment Engine
│   │   │   ├── types.ts           # Type definitions (Artisan, Order, AllocationResult)
│   │   │   ├── scoring.ts         # Match score calculation: Sᵢ = 0.45·Aᵢ + 0.35·Tᵢ + 0.20·Lᵢ
│   │   │   ├── allocator.ts       # Greedy sequential allocator & shortfall detector
│   │   │   └── recalculator.ts    # Rebalancing engine for capacity drops & standby buffers
│   │   ├── voice/                 # Vernacular Language Helpers
│   │   │   ├── kannadaKeywords.ts # Kannada craft dictionary & heuristic fallback parser
│   │   │   ├── kannadaNumbers.ts  # Bilingual digits & spoken Kannada number translation
│   │   │   └── playSpeech.ts      # Native Web Speech synthesis player
│   │   ├── db/                    # Data Layer
│   │   │   ├── mongodb.ts         # MongoDB-compatible client pool & memory fallback
│   │   │   ├── models.ts          # MongoDB schemas (Product, Order, Artisan)
│   │   │   ├── mockData.ts        # Benchmark dataset with seeded scores (Artisans A, B, C, D)
│   │   │   ├── products.ts        # Pre-seeded Karnataka crafts catalogue
│   │   │   └── store.ts           # Client-side state synchronization
│   │   └── utils.ts               # Currency formatting (INR) & classname merger
│   │
│   └── styles/
│       └── globals.css            # Tailwind directives & artisan design tokens
│
└── public/
    ├── download-test-image.html   # Standalone low-light test photo generator
    └── assets/                    # Craft imagery, cluster photography, and brand assets
```

---

## API Specification

### 1. Execute Allocation
**`POST /api/allocate`**

Computes deterministic order allocation across registered cluster makers.

```json
// Request Body
{
  "orderId": "ORD-2026-KASUTI",
  "craft": "Kasuti",
  "requiredQuantity": 200,
  "deliveryDeadlineDays": 20,
  "destinationDistrict": "Bengaluru",
  "budgetPerUnitINR": 600
}

// Response (200 OK)
{
  "orderId": "ORD-2026-KASUTI",
  "craftRequested": "Kasuti",
  "targetQuantity": 200,
  "totalAllocated": 200,
  "shortfall": 0,
  "isFullyFulfilled": true,
  "allocations": [
    { "artisanId": "art-kasuti-01", "artisanName": "Savita Naik", "allocatedUnits": 80 },
    { "artisanId": "art-kasuti-02", "artisanName": "Manjula Patil", "allocatedUnits": 70 },
    { "artisanId": "art-kasuti-03", "artisanName": "Girija Kulkarni", "allocatedUnits": 50 }
  ],
  "standbyArtisans": [
    { "artisanId": "art-kasuti-03", "unallocatedCapacity": 10 },
    { "artisanId": "art-kasuti-04", "unallocatedCapacity": 40 }
  ]
}
```

### Illustrative Unit Economics (75/12/5/8 Model)

> **Notice:** These calculations represent an **illustrative 75/12/5/8 allocation model** and a **92% illustrative community-retention scenario**, not a measured pilot result.

* **Illustrative 200-Unit Kasuti Benchmark × ₹600 Unit Value** = ₹1,20,000 GMV
* **75% Illustrative Direct Artisan Wage:** ₹90,000 (₹450/unit allocated directly to participating makers)
* **12% Illustrative Upfront Raw Material Advance:** ₹14,400 (₹72/unit allocated for upfront inputs)
* **5% Illustrative SHG Cluster Coordination:** ₹6,000 (₹30/unit for regional quality check and packaging)
* **8% Platform Coordination Fee:** ₹9,600 (₹48/unit for software coordination and infrastructure)
* **Total Illustrative Community Retention:** **92% (₹1,10,400)** vs traditional 40–60% middleman cuts.
* **Interactive Simulator:** Visit `/impact` (or test inside `/b2b`) to dynamically toggle between **Enterprise B2B (200 units)** and **Retail Storefront (5 units)** for instant 3-way supply chain benchmarks.
* **Dual Revenue Model:**
  * **Primary (B2B Bulk Orders):** 8% platform coordination fee on completed multi-artisan orders (zero fees for artisans).
  * **Secondary (B2C Retail Storefront):** 8% platform fee on catalogue transactions.

### 2. Recalculate on Dropout
**`POST /api/reallocate`**

Triggers capacity recovery when an active maker encounters a capacity constraint.

```json
// Request Body
{
  "orderId": "ORD-2026-KASUTI",
  "adjustments": [
    { "artisanId": "art-kasuti-01", "newCapacity": 40, "reason": "Illness / capacity reduction" }
  ]
}

// Response (200 OK)
{
  "recoverySummary": {
    "deficitCaused": 40,
    "deficitRecovered": 40,
    "isCompletelyRecovered": true,
    "transferredToArtisans": [
      { "artisanId": "art-kasuti-03", "addedUnits": 10 },
      { "artisanId": "art-kasuti-04", "addedUnits": 30 }
    ]
  }
}
```

---

## Growth Flywheel & Scalability

```text
Voice Onboarding ──▶ Direct Catalogue Sales ──▶ Coordinated Bulk Capacity ──▶ Higher Rural Inflow ──▶ Cluster Retention
```

* **From Discovery to Coordination:** Ordinary storefronts connect 1 buyer to 1 seller. KalaSamanvaya gives artisans a direct storefront AND coordinates 1 enterprise order across $N$ participating makers.
* **Craft-Agnostic Core Engine:** The fulfilment algorithm operates on 4 standardized inputs: `[Craft Type] + [Capacity] + [Turnaround] + [Location]`. Extensible to Channapatna toys, Kinnal crafts, and Ilkal weaving post-pilot.
* **Operational Data Advantage:** Aggregating structured cluster capacity data through active platform operations creates a dependable fulfilment asset that standard marketplaces lack.

---

## Local Development Setup

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **Package Manager:** npm or yarn
* **Supported Browser:** Google Chrome, Microsoft Edge (for Web Speech `kn-IN` support)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anoopcodehack/KalaSamanvaya.git
   cd KalaSamanvaya
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start local development server:**
   ```bash
   npm run dev
   ```

5. **Access application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Team — MIDDLEWARE MAFIA

* **Hackathon:** DEVHACK 2026 — Problem Statement 4.2: Digital Market Access for Local Artisans
* **Institution:** Sahyadri College of Engineering & Management, Mangaluru
* **Team Members**
* **ANOOP - A** 
* **MUHAMMAD ASHATH** 
* **PRAJNA K V** 
* **PRATHEEKSHA K** 
 

---

## License

This project is open-source and licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>"We are not replacing the artisan. We are making fragmented artisan capacity enterprise-ready."</sub><br>
  <sub>KalaSamanvaya • Coordinated Supply Chain Infrastructure for Indian Artisans</sub>
</div>
