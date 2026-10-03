<div align="center">

# KALASAMANVAYA (ಕಲಾ ಸಮನ್ವಯ)
### Digital Market Access & Multi-Artisan Fulfilment Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Web Speech API](https://img.shields.io/badge/Web_Speech_API-kn--IN-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![DEVHACK 2026](https://img.shields.io/badge/DEVHACK_2026-PS_4.2-green?style=for-the-badge)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**A Kannada-first platform helping local artisans showcase, price, and sell their crafts—with coordinated multi-artisan fulfilment for bulk orders.**

*DEVHACK 2026 | PS 4.2 — Digital Market Access for Local Artisans*  
**Sahyadri College of Engineering & Management, Mangaluru**

```text
Core Pipeline:
Kannada Voice Listing ──▶ Product Catalogue & Craft Story ──▶ Retail Order / Mock Checkout ──▶ Coordinated Bulk Fulfilment
```

[Live Demo](https://kalasamanvaya.vercel.app) • [PS 4.2 Alignment](#-alignment-with-ps-42-requirements) • [Architecture](#️-guiding-architectural-principle) • [Allocation Engine](#-deterministic-allocation-engine) • [Benchmark Dataset](#-demonstrated-recovery-scenario) • [Growth & Scale](#-growth-flywheel--scalability) • [Setup Guide](#-local-development-setup) • [License](#-license)

---

</div>

> **Benchmark-data notice:** Capacity, scores, locations, prices, and recovery outcomes shown in this README are prototype test data unless explicitly identified as measured pilot results. The 200-unit order is a proof-of-concept scenario, not a completed customer order.

## 📌 Executive Summary

Individual artisans operate with constrained production bandwidth, while **enterprise buyers may require bulk volumes of 200–500+ units within fixed deadlines.**

> **Core Principle:**  
> *"Speech recognition simplifies artisan onboarding; transparent craft stories justify pricing; deterministic algorithms coordinate bulk fulfilment."*

Existing marketplaces offer isolated retail listings. They fail to turn fragmented rural craft capacity into coordinated supply. **Buyers face coordination friction and may turn to standardized alternatives when handmade supply cannot reliably meet volume or deadlines.**

**KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ)** introduces a **coordinated fulfillment layer**. Instead of treating every maker as an isolated seller, our deterministic allocation engine aggregates compatible cluster capacity into a single, verifiable B2B delivery plan—backed by **capacity-update recovery** and accessible Kannada voice-assisted onboarding.

---

## 🎯 Alignment with PS 4.2 Requirements

This prototype addresses four PS 4.2 capability areas:

| Official PS 4.2 Capability Area | Implementation in KalaSamanvaya | Status |
| :--- | :--- | :---: |
| **1. Working Storefront / Catalogue Interface**<br>*(Artisans can plausibly use with minimal training)* | Clean, visual catalogue specifically customized for **Kasuti embroidery**, **Beedu handloom craft**, and **Coastal pottery**. Low cognitive load interface requiring minimal digital literacy. | `Implemented` |
| **2. Simple Listing & Order Flow**<br>*(Payment integration can be mocked)* | **Kannada voice-assisted listing (`kn-IN`)** allows rural artisans to list items verbally without typing. Streamlined checkout flow with mock payment confirmation and instant order summary. | `Implemented prototype` |
| **3. Craft-Storytelling & Pricing Support**<br>*(To communicate handmade value)* | **Craft-Story Card:** Visual maker bio, process, material, regional heritage, and pricing context to communicate handmade value (`Implemented prototype`). QR-linked digital provenance passports (`Planned roadmap`). | `Implemented prototype` / `Planned roadmap` |
| **4. Capacity-Aware Multi-Artisan Fulfillment**<br>*(Coordinated cluster supply)* | Solves the **scale mismatch** by aggregating fragmented artisan capacity into bulk fulfillment plans for enterprise buyers with dynamic capacity-update recovery. | `Implemented` |

---

## 🏛️ Guiding Architectural Principle

```
┌─────────────────────────────────────────────────────────────┐
│      ONE PLATFORM. TWO USER JOURNEYS. ONE CAPACITY ENGINE.  │
└─────────────────────────────────────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   [ B2B Institutional ]                 [ B2C Retail Discovery ]
   • Bulk orders (200–500 units)         • One-of-a-kind craft items
   • Multi-artisan aggregation           • Direct maker interaction
   • Deterministic allocation and        • Digital provenance certificates
     delivery planning                   • Authentic craft stories
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
    [ Regional Clusters ]                [ Speech Recognition ]
    • Kasuti demonstration data from     • Browser-based kn-IN
      Karnataka clusters                 • Heuristic field extraction
    • Coastal Pottery (DK)               • Low-literacy review flow
    • Beedu Handlooms (Udupi)
```

---

## 🔬 Deterministic Allocation Engine

The platform coordinates bulk enterprise orders through a 5-stage deterministic pipeline:

```text
[ 1. Hard Filter ] ──▶ [ 2. Match Rank ] ──▶ [ 3. Sequential Allocation ] ──▶ [ 4. Rebalance ] ──▶ [ 5. Shortfall Alert ]
```

### 1. Hard Craft Filtering
Artisans must strictly match the required craft category:
$$\text{Eligible}(i) = \begin{cases} 1 & \text{if } \text{Craft}_i = \text{Craft}_{\text{Order}} \land c_i > 0 \\ 0 & \text{otherwise} \end{cases}$$

### 2. Multi-Criteria Match Scoring
For each eligible artisan $i$, a composite match score $S_i \in [0, 1]$ is computed:

$$S_i = 0.45 \cdot (\text{Availability}) + 0.35 \cdot (\text{Turnaround}) + 0.20 \cdot (\text{Logistics})$$

* **Availability Score ($A_i$):** Ratio of current uncommitted capacity $c_i$ to overall monthly capacity $C_{\max, i}$:
  $$A_i = \frac{c_i}{C_{\max, i}}$$
* **Turnaround Fit ($T_i$):** Buffer margin between maker lead time and buyer deadline:
  $$T_i = \begin{cases} 0.60 + 0.40 \left(1 - \frac{\text{LeadTime}_i}{\text{Deadline} + 1}\right) & \text{if } \text{LeadTime}_i \le \text{Deadline} \\ \max\left(0.10, 0.50 - 0.10(\text{LeadTime}_i - \text{Deadline})\right) & \text{if } \text{LeadTime}_i > \text{Deadline} \end{cases}$$
* **Logistics Fit ($L_i$):** Proximity to regional logistics consolidation center:
  $$L_i = \max\left(0.20, 1 - \frac{\text{Distance}_i}{250\text{ km}}\right)$$

### 3. Sequential Greedy Allocation
Artisans are sorted descending by $S_i$ (ties broken by higher remaining capacity). For an order demand $D$:

$$a_i = \min(c_i, \text{Remaining Demand})$$

### 4. Dynamic Rebalance & Standby Buffers
Unallocated capacity of partially utilized artisans and zero-allocated qualifying artisans are preserved as active standby reserves. When an artisan reports a capacity drop, the engine rebalances the deficit across available cluster buffers.

### 5. Shortfall Detection Alert
If total cluster capacity is insufficient to satisfy the order quantity, the engine flags an explicit shortfall:

$$\text{Shortfall} = \max\left(0, D - \sum_{i=1}^{n} a_i\right)$$

* **Shortfall Detection Test (If Total Capacity is Reduced to 160):**
  * **Result:** `160 / 200 Allocated; 40-Unit Shortfall Detected`
  * **Action:** Shortfall flag + recommended next action: source additional cluster capacity.

---

## 📊 Demonstrated Recovery Scenario

*(Benchmark test scenario: Requirement of 200 Handcrafted Kasuti Shawls | Deadline: 20 Days)*

### Scenario: Enterprise Order for 200 Kasuti Handcrafted Units

| Artisan | Location Cluster | Match Score | Registered Capacity | Initial Allocation | Standby Buffer | Recovery Allocation (A drops 80 → 40) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Artisan A (Savita N.)** | Dharwad Central | **0.94** | 80 | **80 units** | 0 | **40 units** *(Capacity drop)* |
| **Artisan B (Manjula P.)** | Kalghatgi Sangha | **0.88** | 70 | **70 units** | 0 | **70 units** *(Unchanged)* |
| **Artisan C (Girija K.)** | Udupi demonstration cluster | **0.81** | 60 | **50 units** | 10 units | **60 units** *(Absorbs +10 buffer)* |
| **Artisan D (Renuka B.)** | Navalgund Group | **0.72** | 40 | **0 units** | 40 units | **30 units** *(Activated from standby)* |
| **Total** | — | — | **250** | **200 / 200 Fulfilled** | **50 units** | **200 / 200 Re-fulfilled** |

```
Initial Execution:   80 + 70 + 50            = 200 / 200 (100% Fulfilled)
Capacity Disruption: Artisan A capacity reduces from 80 to 40 (-40 deficit)
Dynamic Rebalance:   A(40) + B(70) + C(60) + D(30) = 200 / 200 (Deficit fully recovered)
```

---

## 🎙️ Kannada Voice-Assisted Onboarding (`kn-IN`)

To eliminate digital literacy barriers, artisans register their inventory using browser-based voice input:

```
[ Spoken Kannada Audio ]
       │  "ನನ್ನ ಬಳಿ 50 ಕಸೂತಿ ಸೀರೆಗಳಿವೆ, ಒಂದಕ್ಕೆ 1600 ರೂಪಾಯಿ..."
       ▼
[ Web Speech API (kn-IN) ]
       │  Real-time streaming transcript
       ▼
[ Structured Extraction ]
       │  Heuristic structured extraction with optional LLM fallback
       ▼
[ Visual Review Modal ]
       │  Large tap targets, vernacular preview, one-touch confirmation
       ▼
[ Cluster Inventory Registry ]
```

* **No Typing Friction:** Transcribes native Kannada speech directly within Chromium-based browsers.
* **Extraction Fields:** Identifies craft type (ಕಸೂತಿ / ಮಡಿಕೆ / ಬೀಡು), available units, price in INR, and turnaround time.
* **Human-in-the-Loop Review:** Artisan reviews numeric values on high-contrast cards before publishing.
* **Standalone Execution:** Speech recognition and heuristic extraction work without an LLM API; the LLM parser is optional when configured.

---

## 🏷️ System Verification Matrix

All technical claims within this repository are categorized into verified tiers matching prototype status and future roadmap:

| Feature | Correct Status | Operational Reality |
| :--- | :---: | :--- |
| **Multi-artisan allocation** | `Implemented` | Deterministic score calculation ($S_i$) and sequential allocation execute in pure TypeScript within the repository. |
| **Capacity-update rebalancing** | `Implemented` | Recalculates allocation after a capacity update and routes available standby capacity in the prototype. |
| **Kannada voice UI** | `Implemented prototype` | Built using the browser-based Web Speech API with language tag `kn-IN` and heuristic extraction. |
| **200-unit scenario** | `Demonstrated benchmark scenario` | Benchmark test data used to prove algorithmic correctness for a 200-unit Kasuti fulfillment order. |
| **Provenance/QR** | `Planned roadmap` | Digital Provenance Passports linking each product to maker bio and cluster heritage to support artisan pricing. |
| **Artisan verification** | `Pilot target` | Identity and craft verification planned during onboarding for field pilot. |
| **50+ maker expansion** | `Pilot target` | Planned 90-day onboarding milestone across Karnataka artisan clusters. |
| **Transparent artisan payout model** | `Pilot target` | Maximize transparent artisan earnings through clearly itemized platform and fulfillment costs. |

---

## 📁 Repository Directory Structure

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
│   │   ├── b2b/page.tsx           # B2B Bulk Order Allocation & Dynamic Recovery Console
│   │   ├── artisan/onboard/page.tsx # Kannada voice listing interface (kn-IN)
│   │   ├── marketplace/page.tsx   # B2C Retail Discovery catalog
│   │   ├── provenance/[id]/page.tsx # QR-verifiable authenticity passport
│   │   └── api/
│   │       ├── allocate/route.ts  # Deterministic matching & greedy allocation endpoint
│   │       ├── reallocate/route.ts# Dynamic dropout rebalance simulator endpoint
│   │       └── voice-parse/route.ts# Kannada transcript parsing endpoint
│   │
│   ├── components/                # Modular UI Components
│   │   ├── b2b/                   # Allocation graph, shortfall alert, recovery simulator
│   │   ├── voice/                 # Web Speech API recorder & structured review modal
│   │   ├── marketplace/           # Product cards, craft filters, provenance badges
│   │   ├── shared/                # Navbar, Footer, Language toggle
│   │   └── ui/                    # Reusable button, card, badge primitives
│   │
│   ├── lib/                       # Algorithmic Core & Utility Layer
│   │   ├── engine/                # Core Fulfillment Engine
│   │   │   ├── types.ts           # Type definitions (Artisan, Order, AllocationResult)
│   │   │   ├── scoring.ts         # Match score calculation: Sᵢ = 0.45·Aᵢ + 0.35·Tᵢ + 0.20·Lᵢ
│   │   │   ├── allocator.ts       # Greedy sequential allocator & shortfall detector
│   │   │   └── recalculator.ts    # Rebalancing engine for capacity drops & standby buffers
│   │   ├── voice/                 # Regional Kannada Language Helpers
│   │   │   └── kannadaKeywords.ts # Vernacular dictionary & heuristic parser for Kasuti, Pottery, Beedu
│   │   ├── db/                    # Data Layer
│   │   │   └── mockData.ts        # Golden dataset (Artisans A, B, C, D with verified scores)
│   │   └── utils.ts               # Currency formatting (INR) & classname merger
│   │
│   └── styles/
│       └── globals.css            # Tailwind directives & artisan design tokens
│
└── public/
    └── assets/                    # Craft imagery, cluster photography, and brand assets
```

---

## 🔌 API Reference

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

### 💡 Illustrative Unit Economics (B2B Bulk Order)

* **200-Unit Enterprise Order × ₹600 Average Unit Value** = ₹1,20,000 GMV
* **Proposed 4% Platform Coordination Fee** = ₹4,800 Platform Revenue
* **Primary (B2B Bulk Fulfilment):** Proposed 3–5% platform coordination fee on completed multi-artisan orders.
* **Secondary (B2C Retail Storefront):** Proposed 5–8% transactional fee on individual retail sales via the artisan showcase.

### 2. Recalculate on Dropout
**`POST /api/reallocate`**

Triggers dynamic recovery when an active maker encounters a capacity constraint.

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

## 🔄 Growth Flywheel & Scalability

```text
Voice Onboarding ──▶ Direct Catalogue Sales ──▶ Coordinated Bulk Capacity ──▶ Higher Rural Inflow ──▶ Cluster Retention
```

* **From Discovery to Coordination:** Ordinary storefronts connect 1 buyer to 1 seller. KalaSamanvaya gives artisans a direct storefront AND coordinates 1 enterprise order across $N$ participating makers.
* **Craft-Agnostic Core Engine:** The fulfillment algorithm operates on 4 standardized inputs: `[Craft Type] + [Capacity] + [Turnaround] + [Location]`. Extensible to Channapatna toys, Kinnal crafts, and Ilkal weaving post-pilot.
* **Operational Data Advantage:** Aggregating structured cluster capacity data through active platform operations creates a dependable fulfillment asset that standard marketplaces lack.

---

## 💻 Local Development Setup

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **Package Manager:** npm or yarn
* **Supported Browser:** Google Chrome, Microsoft Edge (for Web Speech `kn-IN` support)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/KalaSamanvaya.git
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

## 👥 Team Details

* **Project:** DEVHACK 2026 — PS 4.2: Digital Market Access for Local Artisans
* **Institution:** Sahyadri College of Engineering & Management, Mangaluru
* **Team Members:**
  * **Anoop A.** 
  * *[Member 2]* 
  * *[Member 3]*
  * *[Member 4]* 

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>"We are not replacing the artisan. We are making fragmented artisan capacity enterprise-ready."</sub><br>
  <sub>KalaSamanvaya • Coordinated Supply Chain Infrastructure for Indian Artisans</sub>
</div>
