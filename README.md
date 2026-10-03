<div align="center">

# KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ)
### Enterprise Multi-Artisan Fulfillment Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Web Speech API](https://img.shields.io/badge/Web_Speech_API-kn--IN-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![DEVHACK 2026](https://img.shields.io/badge/DEVHACK_2026-PS_4.2-green?style=for-the-badge)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Coordinating Fragmented Artisan Capacity into Deterministic B2B Fulfillment Plans**

*DEVHACK 2026 — Problem Statement 4.2: Digital Market Access for Local Artisans*  
**Sahyadri College of Engineering & Management, Mangaluru**

[Live Demo](https://kalasamanvaya.vercel.app) • [Architecture](#-system-architecture) • [Algorithm & Math](#-deterministic-allocation-engine) • [Verified Dataset](#-demonstrated-recovery-scenario) • [Setup Guide](#-local-development-setup) • [License](#-license)

---

</div>

## 📌 Executive Summary

Individual artisans operate with constrained production bandwidth, while enterprise clients (corporate gifting, hospitality, academic institutions, events) require bulk volumes ranging from **200 to 500+ units** with guaranteed lead times.

> **Core Thesis:**  
> *"Small artisans have small capacities. Larger buyers have larger requirements. We coordinate the gap."*

Existing digital marketplaces focus strictly on individual catalog discovery. When an enterprise buyer needs 200 authentic handcrafted Kasuti shawls or terracotta pottery sets, single-artisan stores fail due to supply bottlenecks. Buyers face intense coordination friction or resort to machine-made substitutes.

**KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ)** introduces a **coordinated fulfillment layer**. Instead of treating every maker as an isolated seller, our deterministic allocation engine aggregates compatible cluster capacity into a single, verifiable B2B delivery plan—backed by dynamic dropout recovery and accessible Kannada voice-assisted onboarding.

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
   • Deterministic SLA & delivery        • Digital provenance certificates
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
        ┌─────────────────────────────────────────────┐
        │  CAPACITY-AWARE MULTI-ARTISAN ALLOCATOR     │
        │  • Hard Craft Compatibility Filtering       │
        │  • Deterministic Scoring: Sᵢ = f(A, T, L)   │
        │  • Sequential Greedy Order Partitioning     │
        │  • Dynamic Dropout & Capacity Recovery      │
        └─────────────────────────────────────────────┘
                               ▲
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
    [ Regional Clusters ]                [ Speech Recognition ]
    • Kasuti (Dharwad/Udupi)             • Browser-based kn-IN
    • Coastal Pottery (DK)               • Heuristic field extraction
    • Beedu Handlooms (Udupi)            • Low-literacy review flow
```

---

## 🔬 Deterministic Allocation Engine

The allocation engine operates deterministically to eliminate unpredictability for enterprise procurement teams.

### 1. Hard Craft Filtering
Artisans must strictly match the required craft category:
$$\text{Eligible}(i) = \begin{cases} 1 & \text{if } \text{Craft}_i = \text{Craft}_{\text{Order}} \land c_i > 0 \\ 0 & \text{otherwise} \end{cases}$$

### 2. Multi-Criteria Match Scoring
For each eligible artisan $i$, a composite score $S_i \in [0, 1]$ is computed using three deterministic parameters:

$$S_i = 0.45 \cdot A_i + 0.35 \cdot T_i + 0.20 \cdot L_i$$

* **Availability Score ($A_i$):** Ratio of current available capacity $c_i$ to overall monthly capacity $C_{\max, i}$:
  $$A_i = \frac{c_i}{C_{\max, i}}$$
* **Turnaround Fit ($T_i$):** Buffer margin between maker lead time and buyer deadline:
  $$T_i = \begin{cases} 0.60 + 0.40 \left(1 - \frac{\text{LeadTime}_i}{\text{Deadline} + 1}\right) & \text{if } \text{LeadTime}_i \le \text{Deadline} \\ \max\left(0.10, 0.50 - 0.10(\text{LeadTime}_i - \text{Deadline})\right) & \text{if } \text{LeadTime}_i > \text{Deadline} \end{cases}$$
* **Location Fit ($L_i$):** Proximity to regional logistics consolidation center:
  $$L_i = \max\left(0.20, 1 - \frac{\text{Distance}_i}{250\text{ km}}\right)$$

### 3. Sequential Greedy Allocation
Artisans are sorted descending by $S_i$ (ties broken by higher remaining capacity). For an order demand $D$:

$$a_i = \min\left(c_i, \max\left(0, D - \sum_{j=1}^{i-1} a_j\right)\right)$$

### 4. Shortfall Detection & Standby Buffers
* **Shortfall Calculation:**
  $$\text{Shortfall} = \max\left(0, D - \sum_{i=1}^{n} a_i\right)$$
  *Example:* If available capacity is only 160 units for a 200-unit requirement, the system reports: **`160/200 allocated; 40-unit shortfall detected`**.
* **Standby Buffer:** Unallocated capacity of partially utilized artisans and zero-allocated qualifying artisans are preserved as active standby reserves.

---

## 📊 Demonstrated Recovery Scenario

*(Verified test scenario matching MVP code, seed dataset, and video demonstration)*

### Scenario: Enterprise Order for 200 Kasuti Handcrafted Units

| Artisan | Location Cluster | Match Score | Registered Capacity | Initial Allocation | Standby Buffer | Recovery Allocation (A drops 80 → 40) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Artisan A (Savita N.)** | Dharwad Central | **0.94** | 80 | **80 units** | 0 | **40 units** *(Capacity drop)* |
| **Artisan B (Manjula P.)** | Kalghatgi Sangha | **0.88** | 70 | **70 units** | 0 | **70 units** *(Unchanged)* |
| **Artisan C (Girija K.)** | Coastal Kasuti (Udupi) | **0.81** | 60 | **50 units** | 10 units | **60 units** *(Absorbs +10 buffer)* |
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
       │  Heuristic pattern matcher with fallback LLM parser
       ▼
[ Visual Review Modal ]
       │  Large tap targets, vernacular preview, one-touch confirmation
       ▼
[ Cluster Inventory Registry ]
```

* **No Typing Friction:** Transcribes native Kannada speech directly within Chromium-based browsers.
* **Extraction Fields:** Identifies craft type (ಕಸೂತಿ / ಮಡಿಕೆ / ಬೀಡು), available units, price in INR, and turnaround time.
* **Human-in-the-Loop Review:** Artisan reviews numeric values on high-contrast cards before publishing.

---

## 🏷️ Truth-Safe Classification Matrix

In accordance with strict hackathon evaluation ethics, all claims in this repository are categorized into three verified levels:

| System Dimension | Label | Operational Reality |
| :--- | :---: | :--- |
| **Multi-Artisan Allocation Algorithm** | `Implemented` | Deterministic score calculation ($S_i$) and sequential allocation execute in pure TypeScript within the repository. |
| **Dynamic Dropout Recovery** | `Implemented` | Rebalance recalculation handles capacity updates and standby re-routing in real-time. |
| **Kannada Voice UI** | `Implemented` | Built using the browser-based Web Speech API with language tag `kn-IN` and heuristic extraction. |
| **Slide 4 Cluster Scenario** | `Demonstrated Scenario` | Benchmark test data used to prove algorithmic correctness for a 200-unit Kasuti fulfillment order. |
| **Middleman Disintermediation** | `Pilot Target` | Maximize transparent artisan payouts by eliminating predatory middleman markups during pilot deployment. |
| **Cluster Expansion (50+ Makers)** | `Pilot Target` | Planned 90-day post-hackathon onboarding milestone across Dakshina Kannada, Udupi, and Dharwad. |

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
│   │   │   ├── kannadaKeywords.ts # Vernacular dictionary for Kasuti, Pottery, Beedu
│   │   │   └── geminiExtractor.ts # Fallback LLM structured extraction prompt
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
  "deliveryDeadlineDays": 30,
  "destinationDistrict": "Bengaluru",
  "budgetPerUnitINR": 1600
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

## 👥 Team & Submission Details

* **Hackathon:** DEVHACK 2026
* **Problem Statement:** PS 4.2 — Digital Market Access for Local Artisans
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
  <sub>KalaSamanvaya • Coordinated Supply Chain Infrastructure for Indian Artisans</sub>
</div>
