# SahiVahan — Customer Portal (`sahivahan-customer-portal`)

> **"Sahi Gaadi. Sahi Faisla."**  
> India's premier digital marketplace for booking certified, unbiased pre-purchase inspections for used cars and motorcycles.

### 🌐 Live Production URL
👉 **[https://sahivahan.netlify.app/](https://sahivahan.netlify.app/)**

---

## 🌐 Live Deployments & Ecosystem Links

| Application | Live Deployed URL | Target Users |
| :--- | :--- | :--- |
| **Customer Portal** (Current) | **[sahivahan.netlify.app](https://sahivahan.netlify.app/)** | Used Car & Bike Buyers across India |
| **Specialist Field App** | **[sahivahan-spl.netlify.app/specialist/dashboard](https://sahivahan-spl.netlify.app/specialist/dashboard)** | Certified Automotive Mechanics & Field Technicians |
| **Admin Command Center** | **[sahivahan-adminportal.netlify.app/admin/dashboard](https://sahivahan-adminportal.netlify.app/admin/dashboard)** | Dispatchers, QA Auditors, Fleet Managers, Finance Controllers |

---

## 📌 Overview

The **Customer Portal** is the consumer-facing web application of the SahiVahan ecosystem. It empowers used-car and used-bike buyers across India to book certified on-site mechanical inspections, track specialist field visits in real-time through a 7-stage live timeline, access interactive 200+ point digital vehicle health reports, and receive itemized repair cost estimates before committing to a vehicle purchase.

---

## 🚀 Key Features

### 1. High-Converting Discovery & Public Pages
- **Vehicle-Specific Landing Pages**: Dedicated hubs for Used Car Pre-Purchase Inspection (`/car-inspection`) and Used Bike Pre-Purchase Inspection (`/bike-inspection`).
- **Interactive Sample Report**: Public interactive showcase (`/sample-report`) previewing a comprehensive inspection report with 200+ checkpoints, defect photographs, and health score calculations.
- **Transparent Pricing Calculator**: Real-time pricing calculator (`/pricing`) detailing base fees, complexity tiers, travel distance allowances, and GST.
- **City Hubs**: SEO-optimized landing pages (`/cities/:city`) for major metropolitan areas including Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, and Chennai.
- **Automotive Advisory Blog**: Rich articles and used-vehicle buying guides (`/blog` and `/blog/:slug`).
- **Specialist Onboarding Hub**: Informational portal for technicians interested in joining the SahiVahan fleet (`/become-specialist`).
- **Comprehensive Legal Disclaimers**: Transparent Terms of Service (`/terms`), Privacy Policy (`/privacy`), 5-Stage Cancellation Policy (`/cancellation-policy`), and Inspection Limitations & Non-Invasive Scope (`/inspection-limitations`).

---

### 2. 4-Step Instant Booking Funnel
1. **Step 1: Vehicle & Complexity Selection (`/book/vehicle`)**
   - Vehicle type toggle (Car vs. Bike).
   - Brand, Model, Year, Fuel Type (Petrol, Diesel, CNG, Electric), and Transmission selection.
   - Dynamic complexity detection:
     - **Standard**: Hatchbacks, standard sedans, commuter bikes (₹0 surcharge).
     - **Complex**: Dual-clutch (DCT), Turbocharged, 4x4, AWD, Performance bikes (+₹499 surcharge).
     - **Luxury / EV**: German luxury marques (BMW, Mercedes, Audi), Electric Vehicles (+₹999 surcharge).
2. **Step 2: Location & Slot Scheduling (`/book/location`)**
   - Instant Pincode validation against active metro service zones.
   - Address, landmark, seller contact info, and inspection access instructions.
   - Appointment date and time window selector (Morning, Afternoon, Evening).
3. **Step 3: Itemized Review & Cancellation Terms (`/book/review`)**
   - Transparent cost breakdown: Base Fee + Complexity Surcharge + Travel Distance Fee + 18% GST.
   - Clear display of the 5-tier cancellation refund schedule before payment.
4. **Step 4: Secure Checkout (`/checkout`)**
   - Simulated payment gateway supporting UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Pay on Inspection options.
5. **Confirmation (`/booking/:id/confirmation`)**
   - Unique alphanumeric booking reference (e.g., `SV-2024-8821`), calendar event integration, and immediate tracking redirection.

---

### 3. Customer Self-Service & Real-Time Inspection Tracking
- **7-Stage Live Tracking Pipeline (`/account/bookings/:id`)**:
  1. `Booking Confirmed` — Order placed and payment verified.
  2. `Specialist Assigned` — Certified technician allocated with profile, badge, and contact.
  3. `Specialist Dispatched` — Field specialist en route to seller location.
  4. `Arrived on Site` — Mandatory 3-point geotagged verification confirmed.
  5. `Inspection in Progress` — 200+ point multi-system diagnostics underway.
  6. `Report Being Generated` — Data aggregation, score calculation, and QA verification.
  7. `Inspection Complete` — Instant access to digital report and PDF download.
- **Interactive Vehicle Health Report Viewer (`/account/bookings/:id/report`)**:
  - **Algorithmic Health Score (0-100)**: Visual speedometer gauge indicating overall vehicle condition.
  - **Final Recommendation**: Clear purchase advice (*Recommended*, *Negotiate Repair Costs*, or *Walk Away*).
  - **6 Inspection System Modules**:
    1. Body & Exterior Paint (paint depth gauge readings, dent/scratch mapping, panel replacements).
    2. Engine, Transmission & Diagnostics (OBD error codes, fluid leaks, clutch bite, exhaust smoke).
    3. Steering, Brakes & Suspension (pad wear, rotor grooves, strut damping, pull/vibrations).
    4. Electricals & Air Conditioning (compressor cooling test, infotainment, sensor checks).
    5. Interior & Cabin (upholstery, seatbelts, flood watermark inspection).
    6. Underbody & Frame (chassis rails, rust, subframe impact signs).
  - **Severity Filters**: Filter checkpoints by *Critical Defect*, *Major Concern*, *Minor Wear*, or *Good Condition*.
  - **Estimated Repair Costs**: Min/Max parts and labor cost projections with urgency flags.
  - **Downloadable PDF Export**: Print-ready, branded inspection dossier.
- **Rating, Feedback & Disputes (`/account/bookings/:id/feedback`)**:
  - Specialist punctuality, technical depth, and behavior ratings.
  - Customer Net Promoter Score (NPS) and dispute escalation triggering immediate 48-hour escrow holds.

---

## 🛠 Tech Stack & Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://react.dev/) | Component-driven UI architecture with hooks |
| **Bundler / Tooling** | [Vite 5](https://vitejs.dev/) | Blazing fast ESM builds and HMR |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict static typing across models and props |
| **Styling** | [TailwindCSS 3](https://tailwindcss.com/) | Custom "Trust & Tech" design tokens |
| **Routing** | [React Router v6](https://reactrouter.com/) | Data router with layouts and child route nesting |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, accessible iconography |
| **State Management** | React Context API | `BookingContext`, `AuthContext`, `ThemeContext` |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) | Client-side query caching and state synchronization |

---

## 🎨 Design System & Theme

The customer application is styled with SahiVahan's **Trust & Tech** theme:
- **Primary Color**: Deep Forest Green (`#154D3F`) evoking trust, verification, and engineering precision.
- **Accent Emerald**: `#10B981` indicating healthy components and positive scores.
- **Alert Colors**: Amber (`#B45309`) for advisory notes, Crimson (`#B91C1C`) for critical mechanical defects.
- **Neutral Canvas**: Crisp white cards (`#FFFFFF`) on light slate backgrounds (`#F4F6F8`) with dark mode support (`#0A0E12`).
- **Typography**: `Plus Jakarta Sans` for clean readability, paired with `JetBrains Mono` for chassis/VIN references and pricing calculations.

---

## 📁 Project Directory Structure

```text
apps/customer-portal/
├── index.html                  # HTML entry point with meta tags & fonts
├── package.json                # Project dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Custom theme tokens & color palette
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration (Port 3000)
├── public/                     # Static assets, logos, and icons
└── src/
    ├── App.tsx                 # Root component with providers
    ├── main.tsx                # React DOM entry point
    ├── index.css               # Global Tailwind directives & custom utilities
    ├── api/                    # Mock data generators & unit tests
    │   ├── mockData.ts         # Sample active bookings & inspection reports
    │   ├── pricing.test.ts     # Pricing engine validation
    │   └── pricing_rules.test.js # Standalone Node.js test suite (17 tests)
    ├── components/
    │   ├── common/             # Reusable UI components (Buttons, Badges, Modals, Cards)
    │   └── layout/             # MainLayout, Header with navigation, Footer
    ├── data/
    │   ├── blogData.ts         # Automotive advisory blog posts
    │   ├── pincodeData.ts      # Active service pincodes and metro zones
    │   └── vehicleCatalog.ts   # Comprehensive car & bike database with complexity tiers
    ├── pages/
    │   ├── account/            # BookingsListPage, BookingDetailPage, ReportViewPage, FeedbackPage, SupportPage, ProfilePage
    │   ├── auth/               # LoginPage (Customer login & registration)
    │   ├── blog/               # BlogListPage, BlogPostPage
    │   ├── booking/            # VehicleStepPage, LocationStepPage, ReviewStepPage, CheckoutPage, BookingConfirmationPage
    │   ├── legal/              # TermsPage, PrivacyPage, CancellationPolicyPage, InspectionLimitationsPage
    │   └── public/             # HomePage, CarInspectionPage, BikeInspectionPage, HowItWorksPage, PricingPage, SampleReportPage, CityHubPage, BecomeSpecialistPage, AboutPage, ContactPage, FaqPage
    ├── router/
    │   └── index.tsx           # Complete React Router v6 definitions
    ├── store/
    │   ├── AuthContext.tsx     # Customer authentication state
    │   ├── BookingContext.tsx  # End-to-end booking funnel & state persistence
    │   └── ThemeContext.tsx    # Light/Dark mode state
    ├── types/                  # TypeScript interface definitions (Bookings, Reports, Vehicles)
    └── utils/                  # Price calculations, currency formatters, date helpers
```

---

## 🛣 Route Inventory

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Hero section, vehicle selector, USP breakdown, customer testimonials |
| `/car-inspection` | `CarInspectionPage` | Car inspection benefits, 200+ checkpoint scope, sample defects |
| `/bike-inspection` | `BikeInspectionPage` | Motorcycle & scooter inspection scope, frame and suspension checks |
| `/pricing` | `PricingPage` | Interactive pricing matrix and complexity calculator |
| `/sample-report` | `SampleReportPage` | Interactive preview of a certified digital inspection report |
| `/cities/:city` | `CityHubPage` | Dynamic local hubs (Delhi NCR, Mumbai, Bangalore, etc.) |
| `/how-it-works` | `HowItWorksPage` | Step-by-step breakdown of the pre-purchase inspection workflow |
| `/become-specialist` | `BecomeSpecialistPage` | Mechanic technician recruitment and onboarding information |
| `/blog` | `BlogListPage` | Pre-purchase car inspection guides and used-car tips |
| `/blog/:slug` | `BlogPostPage` | In-depth automotive buying guides |
| `/about` | `AboutPage` | SahiVahan mission, leadership, and quality standards |
| `/contact` | `ContactPage` | Customer support channels, email, and office locations |
| `/faq` | `FaqPage` | Frequently asked questions regarding inspections and refunds |
| `/terms` | `TermsPage` | SahiVahan terms and customer service agreement |
| `/privacy` | `PrivacyPage` | Data protection and privacy policy |
| `/cancellation-policy` | `CancellationPolicyPage` | 5-stage cancellation and refund percentage schedule |
| `/inspection-limitations` | `InspectionLimitationsPage`| Non-invasive inspection boundary and warranty disclaimers |
| `/book/vehicle` | `VehicleStepPage` | **Funnel Step 1**: Vehicle type, model, and complexity calculation |
| `/book/location` | `LocationStepPage` | **Funnel Step 2**: Location pincode, address, seller details, slot |
| `/book/review` | `ReviewStepPage` | **Funnel Step 3**: Transparent cost breakdown and terms review |
| `/checkout` | `CheckoutPage` | **Funnel Step 4**: Payment method selection and execution |
| `/booking/:id/confirmation` | `BookingConfirmationPage` | Booking confirmation receipt and initial status |
| `/account/bookings` | `BookingsListPage` | Customer dashboard listing active and past inspection bookings |
| `/account/bookings/:id` | `BookingDetailPage` | 7-stage live tracking, specialist info, and visit evidence |
| `/account/bookings/:id/report` | `ReportViewPage` | 200+ point interactive report, severity filters, repair estimates |
| `/account/bookings/:id/feedback`| `FeedbackPage` | Post-inspection review, technician rating, and NPS |
| `/account/support` | `SupportPage` | Helpdesk ticketing and customer dispute initiation |
| `/account/profile` | `ProfilePage` | Customer details, saved locations, and preferences |
| `/login` | `LoginPage` | Phone OTP / email login and account switching |

---

## 💻 Development & Running Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation
From the root of the monorepo or from this directory:
```bash
cd apps/customer-portal
npm install
```

### Start Development Server
```bash
npm run dev
```
The application will be accessible at:
👉 **`http://127.0.0.1:3000/`**

### Build for Production
```bash
npm run build
```
Generates an optimized, tree-shaken static production bundle in `dist/`.

### Preview Production Build
```bash
npm run preview
```

### Netlify Deployment Configuration (SPA Reload Fix)
This Single Page Application uses client-side routing via React Router v6. To prevent `404 Not Found` errors when users refresh or reload nested routes like `/blog`, `/pricing`, or `/book/vehicle`, the project includes:
1. `public/_redirects`: Contains `/*  /index.html  200` which Vite copies into `dist/_redirects` during build.
2. `netlify.toml`: Contains the Netlify build settings and catch-all redirect rule to `/index.html`.

### Run Automated Pricing & Cancellation Policy Test Suite
```bash
node src/api/pricing_rules.test.js
```
Executes 17 comprehensive unit tests verifying:
- Base pricing calculations (Car ₹1,999 vs. Bike ₹999).
- Complexity surcharges (Standard ₹0, Complex ₹500, Luxury/EV ₹1,000).
- GST (18%) computations.
- Outer metro travel surcharges.
- 5-stage cancellation refund percentages:
  - Stage 1 (Before Specialist Assigned): 100% Full Refund.
  - Stage 2 (Specialist Assigned): 100% minus ₹150 processing fee.
  - Stage 3 (Specialist Arrived on Site): 50% call-out fee retained.
  - Stage 4 (Inspection Started / Completed): 0% refund (report delivered).

---

## 🔗 Related Applications in SahiVahan
- [Specialist Field App](https://sahivahan-spl.netlify.app/specialist/dashboard) — Technician mobile-first web app for field check-in and 200+ point checklist execution.
- [Admin Command Center](https://sahivahan-adminportal.netlify.app/admin/dashboard) — Operations dispatch, QA audits, specialist KYC vetting, and escrow finance deck.
