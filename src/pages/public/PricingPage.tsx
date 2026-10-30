import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle, 
  Sparkles, 
  Car, 
  Bike, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  FileText, 
  Gauge, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Award,
  Zap,
  TrendingDown,
  Layers
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { calculateInspectionPrice } from '../../api/mockData';

interface PackageItem {
  id: string;
  name: string;
  category: 'car' | 'bike';
  type: string;
  subtitle: string;
  popularVehicleExamples: string[];
  base: string;
  baseNumber: number;
  totalWithTax: string;
  points: string;
  specialistGrade: string;
  turnaround: string;
  idealFor: string;
  popular?: boolean;
  tag?: string;
  features: string[];
  missingFeatures?: string[];
  complexityParam: 'standard' | 'complex' | 'luxury_or_specialist';
}

export const PricingPage: React.FC = () => {
  // Vehicle segment switcher: 'car' | 'bike' | 'all'
  const [activeTab, setActiveTab] = useState<'car' | 'bike'>('car');
  
  // Feature comparison matrix toggle
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Live calculator state
  const [calcType, setCalcType] = useState<'car' | 'bike'>('car');
  const [calcComplexity, setCalcComplexity] = useState<'standard' | 'complex' | 'luxury_or_specialist'>('standard');
  const [calcPincode, setCalcPincode] = useState<string>('560001');

  const liveCalculation = calculateInspectionPrice({
    vehicleType: calcType,
    complexity: calcComplexity,
    pincode: calcPincode
  });

  // Sync calculator type when tab switches
  const handleTabChange = (tab: 'car' | 'bike') => {
    setActiveTab(tab);
    setCalcType(tab);
    if (tab === 'bike' && calcComplexity === 'luxury_or_specialist') {
      // keep or reset if needed
    }
  };

  // Car Packages
  const carPackages: PackageItem[] = [
    {
      id: 'car-standard',
      name: 'Standard Car Inspection',
      category: 'car',
      type: 'Hatchbacks & Compact Sedans',
      subtitle: 'Naturally aspirated petrol / manual & AMT',
      popularVehicleExamples: ['Swift', 'Baleno', 'i20', 'Amaze', 'WagonR', 'Tiago', 'Dzire', 'Punch'],
      base: '₹1,999',
      baseNumber: 1999,
      totalWithTax: '₹2,358.82',
      points: '200+ Points',
      specialistGrade: 'Certified Diagnostic Technician',
      turnaround: 'Instant Report in 60 Mins',
      idealFor: 'City runabouts, first-time car buyers & economy hatchbacks',
      popular: false,
      tag: 'BEST VALUE FOR HATCHBACKS',
      complexityParam: 'standard',
      features: [
        'Complete chassis, aprons & pillar structural OEM weld check',
        'Ultrasonic digital paint depth gauge scan on all 20+ panels',
        'OBD-II live ECU computer scan for powertrain & ABS fault codes',
        'Engine cold start, idle hunting, blow-by & cooling pressure test',
        'Suspension struts, steering rack play, brakes & tyre DOT dates',
        '30-minute structured real-world road test with inspector',
        '40+ high-resolution photos with defect callouts',
        'Tamper-evident cryptographically signed digital dossier'
      ],
      missingFeatures: [
        'Dual-Clutch / Automatic thermal & creep diagnostics',
        'Turbocharger boost plumbing & intercooler inspection',
        'EV / Hybrid traction battery health audit',
        'ADAS camera & radar calibration scan'
      ]
    },
    {
      id: 'car-complex',
      name: 'SUV & Complex Car Inspection',
      category: 'car',
      type: 'Mid-size SUVs, Turbo & DCT / EV',
      subtitle: 'High-torque turbos, dual-clutch, AWD & electric powertrains',
      popularVehicleExamples: ['Creta', 'Seltos', 'Nexon', 'Brezza', 'XUV700', 'Harrier', 'Compass', 'Thar', 'Nexon EV'],
      base: '₹2,499',
      baseNumber: 2499,
      totalWithTax: '₹2,948.82',
      points: '220+ Points',
      specialistGrade: 'Senior Powertrain & Systems Diagnostician',
      turnaround: 'Instant Report in 60 Mins',
      idealFor: 'Mid-size SUVs, turbocharged engines, dual-clutch automatics & EVs',
      popular: true,
      tag: 'MOST BOOKED · RECOMMENDED',
      complexityParam: 'complex',
      features: [
        'All Standard 200+ Car Inspection checks included',
        'Dual-Clutch / Automatic gearbox thermal stress & clutch creep test',
        'Turbocharger boost pressure delivery & intercooler integrity check',
        'EV / Hybrid high-voltage traction battery State-of-Health (SoH) diagnostics',
        'Advanced ADAS camera & radar sensor alignment verification',
        'All-Wheel Drive (AWD/4x4) transfer case & diff lock operational audit',
        'Panoramic sunroof tracks, compression seals & drain tube leak check',
        '50+ annotated HD photos & instant WhatsApp delivery'
      ],
      missingFeatures: [
        'Multi-bus deep European OBD interrogation',
        'Air suspension compressor & valve block cycle analysis'
      ]
    },
    {
      id: 'car-luxury',
      name: 'Luxury Car Inspection',
      category: 'car',
      type: 'German & European Marques',
      subtitle: 'Multi-bus electronics, air suspensions & premium imports',
      popularVehicleExamples: ['Mercedes C/E-Class', 'BMW 3/5/X-Series', 'Audi A4/A6/Q-Series', 'Jaguar', 'Volvo', 'Porsche'],
      base: '₹3,499',
      baseNumber: 3499,
      totalWithTax: '₹4,128.82',
      points: '250+ Points',
      specialistGrade: 'Master Diagnostic Engineer (European Specialist)',
      turnaround: 'Priority Delivery in 60 Mins',
      idealFor: 'High-end German, European, and luxury imported performance vehicles',
      popular: false,
      tag: 'FLAGSHIP · GERMAN SPECIALIST',
      complexityParam: 'luxury_or_specialist',
      features: [
        'Inspected exclusively by Senior Master Diagnostic Engineers',
        'Air suspension compressor duty cycle, ride-height & valve block test',
        'Multi-module deep European OBD scan across all ECUs & comfort modules',
        'Electronic parking brake caliper actuator & dynamic chassis test',
        'Factory micron paint thickness benchmark comparison against OEM spec',
        'Interior Nappa leather upholstery, memory seat motors & switchgear audit',
        'Full 60+ photo evidence gallery with component-level indicative repair ranges',
        'Master Specialist direct 15-minute phone consultation debrief'
      ]
    }
  ];

  // Bike & Scooter Packages
  const bikePackages: PackageItem[] = [
    {
      id: 'bike-commuter',
      name: 'Standard Commuter & Scooter',
      category: 'bike',
      type: 'Economy Commuters & Scooters',
      subtitle: 'Up to 160cc single-cylinder & automatic CVTs',
      popularVehicleExamples: ['Activa 6G/125', 'Jupiter', 'Access 125', 'Splendor Plus', 'Pulsar 125/150', 'Shine', 'Raider'],
      base: '₹999',
      baseNumber: 999,
      totalWithTax: '₹1,178.82',
      points: '120+ Points',
      specialistGrade: 'Certified Two-Wheeler Technician',
      turnaround: 'Instant On-Site Report Delivery',
      idealFor: 'Daily city commuting scooters and commuter motorcycles',
      popular: false,
      tag: 'AFFORDABLE COMMUTER AUDIT',
      complexityParam: 'standard',
      features: [
        'Chassis straightness & steering head race / headstock bearing check',
        'Cold start smoke diagnosis (blue oil burning vs black rich soot)',
        'Engine compression feel, valve tappet noise & clutch lever drag',
        'Front fork seal oil leakage & rear shock absorber rebound damping',
        'Brake rotor runout, pad thickness, drum lever play & cable condition',
        'Drive chain slack measurement, O-ring binding & sprocket teeth wear',
        'Variator belt wear & centrifugal clutch shoe inspection on scooters',
        'Hands-free straight-line tracking & braking wobble dynamic test ride'
      ],
      missingFeatures: [
        'Liquid cooling radiator fins & electric fan thermal cycling',
        'Trellis frame welds & subframe crash alignment',
        'Smart EV battery pack BMS diagnostics'
      ]
    },
    {
      id: 'bike-premium',
      name: 'Premium Motorcycle & EV Scooter',
      category: 'bike',
      type: 'Modern Classics, Cruisers, Sports & Smart EVs',
      subtitle: '200cc–450cc performance singles, cruisers & electric scooters',
      popularVehicleExamples: ['RE Classic 350', 'Hunter 350', 'Himalayan 450', 'KTM Duke/RC 200/390', 'R15 V4', 'Ather 450X', 'Ola S1 Pro'],
      base: '₹1,499',
      baseNumber: 1499,
      totalWithTax: '₹1,768.82',
      points: '150+ Points',
      specialistGrade: 'Senior Motorcycle & EV Systems Specialist',
      turnaround: 'Instant Delivery in 60 Mins',
      idealFor: 'Royal Enfield cruisers, KTM performance bikes, liquid-cooled singles & smart EVs',
      popular: true,
      tag: 'MOST POPULAR FOR TWO-WHEELERS',
      complexityParam: 'complex',
      features: [
        'All Standard 120+ Commuter inspection checks included',
        'Stator coil charging output & regulator-rectifier (RR unit) electrical audit',
        'Trellis frame weld joints, subframe alignment & swingarm pivot play check',
        'Slipper clutch slip under torque & quickshifter up/down response',
        'Liquid cooling radiator fin integrity, coolant level & electric fan cycle test',
        'Smart EV traction battery pack State-of-Health (SoH) & regenerative braking',
        'Dual-channel ABS pump cycling & hydraulic brake line pressure test',
        '35+ timestamped HD photographs with annotated mechanical callouts'
      ],
      missingFeatures: [
        'Multi-cylinder throttle body synchronization',
        'USD fork stanchion micron runout inspection'
      ]
    },
    {
      id: 'bike-superbike',
      name: 'Superbike & Multi-Cylinder',
      category: 'bike',
      type: 'Parallel-Twins, Inline-4s & Imported Superbikes',
      subtitle: '650cc+ multi-cylinder, big cruisers & exotic superbikes',
      popularVehicleExamples: ['RE Interceptor 650', 'Kawasaki Ninja 650/ZX', 'Triumph Bonneville/Triple', 'Harley-Davidson', 'Ducati', 'BMW Motorrad'],
      base: '₹2,499',
      baseNumber: 2499,
      totalWithTax: '₹2,948.82',
      points: '180+ Points',
      specialistGrade: 'Master Superbike Diagnostician',
      turnaround: 'Instant Delivery in 60 Mins',
      idealFor: 'Twin-cylinder, high displacement (650cc+), and imported superbikes',
      popular: false,
      tag: 'FLAGSHIP · SUPERBIKE SPECIALIST',
      complexityParam: 'luxury_or_specialist',
      features: [
        'Inspected exclusively by Master Superbike Diagnosticians',
        'Multi-cylinder throttle body synchronization & vacuum balance check',
        'Inverted (USD) fork stanchion micron runout & damping adjuster test',
        'Monoshock remote reservoir gas charge & pre-load mechanical audit',
        'Exhaust manifold header pipe heat discoloration & catalytic converter test',
        'Cornering ABS, lean-sensitive traction control & ride-by-wire modes',
        'OEM replacement parts & wear items pricing estimate breakdown',
        '50+ high-resolution photo evidence archive & direct specialist phone brief'
      ]
    }
  ];

  const displayedPackages = activeTab === 'car' ? carPackages : bikePackages;

  // Comparison matrix items
  const carMatrixFeatures = [
    { name: 'Ultrasonic Paint Depth Measurement (Microns)', standard: true, complex: true, luxury: true },
    { name: 'Structural Chassis, Pillar & Apron Weld Check', standard: true, complex: true, luxury: true },
    { name: 'OBD-II Live Computer Diagnostic ECU Scan', standard: 'Powertrain & ABS', complex: 'All Standard + Gateway', luxury: 'Deep Multi-Bus European Scan' },
    { name: 'Engine Cold Start, Blow-by & Cooling Pressure', standard: true, complex: true, luxury: true },
    { name: 'Dual-Clutch / Automatic Gearbox Creep & Thermal Test', standard: false, complex: true, luxury: true },
    { name: 'Turbocharger Boost Pressure & Intercooler Plumbing', standard: false, complex: true, luxury: true },
    { name: 'EV / Hybrid Traction Battery State-of-Health (SoH)', standard: false, complex: true, luxury: true },
    { name: 'ADAS Radar & Camera Sensor Alignment Verification', standard: false, complex: true, luxury: true },
    { name: 'Air Suspension Compressor & Electronic Valve Block', standard: false, complex: false, luxury: true },
    { name: 'Electronic Parking Brake & Dynamic Stability System', standard: false, complex: false, luxury: true },
    { name: 'Master Diagnostician Direct Phone Consultation', standard: false, complex: false, luxury: true },
    { name: 'Inspection Photo Dossier', standard: '40+ HD Photos', complex: '50+ Annotated HD Photos', luxury: '60+ Master HD Evidence' },
    { name: 'Report Turnaround Guarantee', standard: '60 Mins', complex: '60 Mins', luxury: '60 Mins' }
  ];

  const bikeMatrixFeatures = [
    { name: 'Chassis Straightness & Steering Head Race Check', standard: true, complex: true, luxury: true },
    { name: 'Cold Start Smoke Analysis & Compression Feel', standard: true, complex: true, luxury: true },
    { name: 'Brake Disc Rotor Runout & Pad Wear Measurement', standard: true, complex: true, luxury: true },
    { name: 'Drive Chain Slack & Sprocket Teeth Shark-Fin Wear', standard: true, complex: true, luxury: true },
    { name: 'Hands-Free Straight-Line Tracking Ride Test', standard: true, complex: true, luxury: true },
    { name: 'Stator Coil & Regulator-Rectifier Electrical Test', standard: false, complex: true, luxury: true },
    { name: 'Trellis Frame Welds & Subframe Crash Alignment', standard: false, complex: true, luxury: true },
    { name: 'Liquid Cooling Radiator & Electric Fan Thermal Test', standard: false, complex: true, luxury: true },
    { name: 'Smart EV Traction Battery State-of-Health (SoH)', standard: false, complex: true, luxury: true },
    { name: 'Multi-Cylinder Throttle Body Vacuum Synchronization', standard: false, complex: false, luxury: true },
    { name: 'Inverted (USD) Fork Stanchion Micron Runout Test', standard: false, complex: false, luxury: true },
    { name: 'Inspection Photo Dossier', standard: '25+ Photos', complex: '35+ Annotated Photos', luxury: '50+ Master Archive' }
  ];

  const cancellationTiers = [
    { stage: 'Before Specialist Assigned', fee: '₹0 (100% Refund)', notes: 'Full refund processed immediately to original payment method without questions' },
    { stage: 'Specialist Assigned (> 12h before slot)', fee: '₹150 processing fee', notes: 'Remainder refunded automatically; covers dispatch calendar lock' },
    { stage: 'Specialist Assigned (< 12h before slot)', fee: '₹300 reservation retainer', notes: 'Remainder refunded; compensates technician reserved travel window' },
    { stage: 'Specialist En Route or Arrived on site', fee: '50% call-out allowance', notes: 'Compensates specialist doorstep transit, fuel and attendance time' },
    { stage: 'Inspection Started', fee: 'Non-refundable (0% refund)', notes: 'Inspection labor, physical measurements, and diagnostic scanning are active' },
  ];

  const faqs = [
    {
      q: 'Are there any hidden doorstep visit or travel charges?',
      a: 'Zero hidden surprises. The base price includes on-site specialist doorstep travel across standard metropolitan zones. Only in far-flung peripheral rural sectors is a nominal ₹150 travel surcharge applied, which is always calculated transparently upfront before payment.'
    },
    {
      q: 'How does the pricing differ between Cars and Bikes?',
      a: 'Cars require 200–250 diagnostic checkpoints including ultrasonic paint depth gauges, OBD-II ECU computers, and chassis aprons, starting at ₹1,999. Bikes & Scooters undergo specialized 120–180 checkpoints focusing on fork alignment, frame laser trueness, drive sprockets, and engine compression, starting at just ₹999.'
    },
    {
      q: 'Why should I pick the SUV / Complex Car tier over Standard?',
      a: 'If your car has a Turbocharger, Dual-Clutch / Automatic transmission (DCT/DSG/AT), 4x4/AWD, or an Electric / Hybrid powertrain (like Creta, Seltos, Nexon, Harrier, XUV700), it requires specialized high-torque tests and EV battery health scans. The Standard tier is calibrated for naturally aspirated hatchbacks (Swift, Baleno, i20).'
    },
    {
      q: 'Can I get a formal GST Tax Invoice to claim input credit?',
      a: 'Yes, 100%. All our prices transparently reflect 18% GST. During checkout, you can enter your registered Company Name and GSTIN to receive an automated B2B tax invoice for tax deductions.'
    },
    {
      q: 'What if the seller cancels or refuses the inspection at the last minute?',
      a: 'If the seller refuses to provide access or cancels before the specialist begins work, you are protected by our stage-based cancellation policy. If the specialist has not left for the venue, you receive a prompt refund or can reassign the slot to another vehicle without re-paying.'
    },
    {
      q: 'Do I need to be physically present at the vehicle location?',
      a: 'No. Over 65% of SahiVahan customers order inspections remotely while sitting at home or at work. Our specialist arrives at the seller\'s doorstep, conducts the full audit, calls you for a live debrief, and delivers the cryptographic PDF report with 40-60+ HD photos directly to your WhatsApp and email.'
    }
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* ================= 1. PAGE HEADER ================= */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="teal" className="px-4 py-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-[#154D3F] dark:text-emerald-400" />
          Transparent Pricing · Zero Hidden Surprises · 100% Independent
        </Badge>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Clear, Upfront Inspection Pricing
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Doorstep vehicle diagnostics with <strong className="text-slate-900 dark:text-white">zero dealer commissions</strong>. 
          Pricing is configured strictly by engineering complexity, diagnostic equipment depth, and vehicle type.
        </p>

        {/* Value Proposition Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" />
            100% Unbiased & Independent
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <Clock className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" />
            60-Min Report On WhatsApp
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <Gauge className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" />
            Digital Paint & OBD Scanners
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" />
            Doorstep On-Site Specialist
          </span>
        </div>
      </div>

      {/* ================= 2. VEHICLE CATEGORY SEGMENT SWITCHER ================= */}
      <div className="max-w-2xl mx-auto">
        <div className="p-1.5 bg-[#F0F4F2] dark:bg-[#0E151A] rounded-2xl sm:rounded-full border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 shadow-inner">
          <button
            onClick={() => handleTabChange('car')}
            className={`flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl sm:rounded-full font-extrabold text-sm transition-all duration-300 ${
              activeTab === 'car'
                ? 'bg-[#154D3F] text-white shadow-lg shadow-[#154D3F]/30 scale-[1.01]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Car className={`w-4 h-4 ${activeTab === 'car' ? 'text-emerald-300' : 'text-slate-500'}`} />
            <span>Cars (4-Wheelers)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              activeTab === 'car' 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
              3 Packages · From ₹1,999
            </span>
          </button>

          <button
            onClick={() => handleTabChange('bike')}
            className={`flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl sm:rounded-full font-extrabold text-sm transition-all duration-300 ${
              activeTab === 'bike'
                ? 'bg-[#154D3F] text-white shadow-lg shadow-[#154D3F]/30 scale-[1.01]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Bike className={`w-4 h-4 ${activeTab === 'bike' ? 'text-emerald-300' : 'text-slate-500'}`} />
            <span>Bikes & Scooters (2-Wheelers)</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              activeTab === 'bike' 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
              3 Packages · From ₹999
            </span>
          </button>
        </div>

        {/* Category Description Banner */}
        <div className="mt-4 text-center">
          {activeTab === 'car' ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing <strong>4-Wheeler Car Inspections</strong> with ultrasonic paint depth measurement, multi-ECU OBD scanning, and frame weld analysis.
            </p>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing <strong>2-Wheeler Motorcycle & Scooter Inspections</strong> with headstock bearing check, fork seal leaks, compression test, and straight-line tracking.
            </p>
          )}
        </div>
      </div>

      {/* ================= 3. PACKAGE CARDS (3-COLUMN HIGH HIERARCHY GRID) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {displayedPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12181E] border flex flex-col justify-between relative transition-all duration-300 ${
              pkg.popular
                ? 'border-[#154D3F] dark:border-emerald-500 shadow-2xl ring-2 ring-[#154D3F]/25 dark:ring-emerald-500/20 md:-translate-y-2'
                : 'border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg'
            }`}
          >
            {/* Top Ribbon for Highlighted Tier */}
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-[#154D3F] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md border border-emerald-400/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  {pkg.tag}
                </span>
              </div>
            )}

            {!pkg.popular && pkg.tag && (
              <div className="mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                  {pkg.tag}
                </span>
              </div>
            )}

            <div className="space-y-5">
              {/* Card Title & Vehicle Subtitle */}
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight">
                  {pkg.name}
                </h3>
                <div className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 mt-1">
                  {pkg.type}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {pkg.subtitle}
                </div>
              </div>

              {/* Price & GST Breakdown Section */}
              <div className="border-t border-b border-slate-100 dark:border-slate-800/80 py-4 space-y-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {pkg.base}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">+ 18% GST</span>
                </div>
                
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Total payable: <strong className="text-slate-900 dark:text-white text-sm">{pkg.totalWithTax}</strong> (all taxes included)
                </div>

                {/* Badges strip: Diagnostic Points + Specialist Grade */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 border border-[#CBEAD8] dark:border-emerald-600/30 uppercase tracking-wider">
                    {pkg.points}
                  </span>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {pkg.turnaround}
                  </span>
                </div>
              </div>

              {/* Real World Vehicle Models Pills */}
              <div className="bg-slate-50 dark:bg-[#0A0E12] rounded-2xl p-3 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Common vehicles in this tier</span>
                  <span className="text-[9px] text-[#154D3F] dark:text-emerald-400">Verified</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {pkg.popularVehicleExamples.map((model, mIdx) => (
                    <span 
                      key={mIdx}
                      className="text-[11px] font-semibold bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              {/* What's Included Feature List */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  What's Inspected:
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#E8F5EE] dark:bg-[#154D3F]/40 flex items-center justify-center shrink-0 mt-0.5 border border-[#CBEAD8] dark:border-emerald-600/30">
                        <Check className="w-2.5 h-2.5 text-[#154D3F] dark:text-emerald-400" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <Link to={`/book/vehicle?type=${pkg.category}&complexity=${pkg.complexityParam}`}>
                <Button
                  variant={pkg.popular ? 'primary' : 'outline'}
                  size="md"
                  className="w-full justify-center shadow-md py-3 text-xs"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                >
                  Book {pkg.name.split(' ')[0]} Inspection
                </Button>
              </Link>
              <div className="text-center mt-2">
                <span className="text-[11px] text-slate-400">
                  Zero advance deposit required for initial slot
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= 4. VALUE ANALYSIS / COST AVOIDANCE BANNER ================= */}
      <div className="bg-gradient-to-r from-[#0F382E] via-[#154D3F] to-[#0A261F] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-800/40 max-w-5xl mx-auto">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-white/10">
              <TrendingDown className="w-3.5 h-3.5" /> Proven Buyer Savings
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Why an Inspection Saves You ₹45,000 to ₹1,20,000+
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              In India, over 37% of inspected used vehicles have concealed accident repainting, structural deformities, or pending transmission failures masked by dealers. SahiVahan provides the documented evidence you need to negotiate steep price cuts or walk away from high-risk money pits.
            </p>
          </div>

          <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center space-y-2">
            <div className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">Average Buyer ROI</div>
            <div className="text-3xl font-black text-white">18.5x</div>
            <div className="text-[11px] text-emerald-100/80">Every ₹1 spent on SahiVahan saves ~₹18.50 in unbudgeted repair bills</div>
          </div>
        </div>
      </div>

      {/* ================= 5. INTERACTIVE FEATURE COMPARISON MATRIX ================= */}
      <div className="bg-white dark:bg-[#12181E] rounded-3xl border border-[#E5E9EB] dark:border-[#1E262E] p-6 sm:p-8 shadow-donezo max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#154D3F] dark:text-emerald-400" />
              <span>Side-by-Side Diagnostic Check Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Compare exact diagnostic tooling and verification depths across all 3 tiers
            </p>
          </div>

          <button
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>{showMatrix ? 'Hide Full Comparison' : 'Expand Full Comparison Matrix'}</span>
            {showMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showMatrix && (
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4 w-1/2">Diagnostic Test & Checkpoint</th>
                  <th className="py-3 px-3 text-center">
                    {activeTab === 'car' ? 'Standard (₹1,999)' : 'Commuter (₹999)'}
                  </th>
                  <th className="py-3 px-3 text-center bg-[#E8F5EE]/40 dark:bg-[#154D3F]/10 text-[#154D3F] dark:text-emerald-400 rounded-t-lg">
                    {activeTab === 'car' ? 'SUV & Complex (₹2,499)' : 'Premium Bike (₹1,499)'}
                  </th>
                  <th className="py-3 pl-3 text-center">
                    {activeTab === 'car' ? 'Luxury Marque (₹3,499)' : 'Superbike (₹2,499)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {(activeTab === 'car' ? carMatrixFeatures : bikeMatrixFeatures).map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">{row.name}</td>
                    
                    {/* Standard */}
                    <td className="py-3 px-3 text-center">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? (
                          <Check className="w-4 h-4 text-[#154D3F] dark:text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600 font-bold">—</span>
                        )
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">{row.standard}</span>
                      )}
                    </td>

                    {/* Complex / Premium */}
                    <td className="py-3 px-3 text-center bg-[#E8F5EE]/30 dark:bg-[#154D3F]/10">
                      {typeof row.complex === 'boolean' ? (
                        row.complex ? (
                          <Check className="w-4 h-4 text-[#154D3F] dark:text-emerald-400 mx-auto font-bold" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600 font-bold">—</span>
                        )
                      ) : (
                        <span className="text-[11px] font-bold text-[#154D3F] dark:text-emerald-300">{row.complex}</span>
                      )}
                    </td>

                    {/* Luxury / Superbike */}
                    <td className="py-3 pl-3 text-center">
                      {typeof row.luxury === 'boolean' ? (
                        row.luxury ? (
                          <Check className="w-4 h-4 text-[#154D3F] dark:text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600 font-bold">—</span>
                        )
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">{row.luxury}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= 6. INTERACTIVE LIVE PRICE ESTIMATOR ================= */}
      <div className="bg-white dark:bg-[#12181E] rounded-3xl border border-[#E5E9EB] dark:border-[#1E262E] p-6 sm:p-8 shadow-donezo max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#154D3F] dark:text-emerald-400" />
              <span>Live On-Site Price Estimator</span>
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Enter vehicle classification and location to see the exact real-time tax breakdown
            </p>
          </div>
          <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 border border-[#CBEAD8] dark:border-emerald-600/30">
            Real-Time Fee Calculator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Vehicle Type
            </label>
            <select
              value={calcType}
              onChange={(e) => {
                const val = e.target.value as 'car' | 'bike';
                setCalcType(val);
                setActiveTab(val);
              }}
              className="w-full px-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#0A0E12] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#154D3F]"
            >
              <option value="car">Car (4-Wheeler)</option>
              <option value="bike">Bike / Scooter (2-Wheeler)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Complexity Classification
            </label>
            <select
              value={calcComplexity}
              onChange={(e) => setCalcComplexity(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#0A0E12] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#154D3F]"
            >
              {calcType === 'car' ? (
                <>
                  <option value="standard">Standard (Hatchback / Compact Sedan)</option>
                  <option value="complex">Complex (SUV, Turbo, DCT, EV, AWD)</option>
                  <option value="luxury_or_specialist">Luxury (German / European Marque)</option>
                </>
              ) : (
                <>
                  <option value="standard">Standard Commuter & Scooter (≤160cc)</option>
                  <option value="complex">Premium Motorcycle & EV Scooter (200-450cc)</option>
                  <option value="luxury_or_specialist">Superbike & Multi-Cylinder (650cc+)</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Inspection Pincode
            </label>
            <input
              type="text"
              maxLength={6}
              value={calcPincode}
              onChange={(e) => setCalcPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 560001"
              className="w-full px-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#0A0E12] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#154D3F]"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Outer peripheral zones incur nominal ₹150 travel fee
            </span>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-[#F4F6F8] dark:bg-[#0A0E12] rounded-2xl p-5 border border-[#E5E9EB] dark:border-[#1E262E]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[11px] text-slate-400">Base Price</div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">₹{liveCalculation.basePrice}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Complexity Multiplier</div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">₹{liveCalculation.complexitySurcharge}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Travel Zone Fee</div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {liveCalculation.travelZoneFee > 0 ? `₹${liveCalculation.travelZoneFee}` : '₹0 (Standard Metro)'}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">GST (18%)</div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">₹{liveCalculation.gstAmount.toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Final Payable Amount (Doorstep Visit + Full Report)
              </div>
              <div className="text-2xl font-black text-[#154D3F] dark:text-emerald-400">
                ₹{liveCalculation.totalPayableAmount.toFixed(2)}
              </div>
            </div>
            <Link to={`/book/vehicle?type=${calcType}&complexity=${calcComplexity}`}>
              <Button variant="primary" size="md" className="px-6 shadow-md" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
                Lock This Price & Book
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 7. STAGE-BASED CANCELLATION POLICY ================= */}
      <div className="bg-white dark:bg-[#12181E] rounded-3xl border border-[#E5E9EB] dark:border-[#1E262E] p-6 sm:p-8 shadow-donezo max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base">
          <AlertCircle className="w-5 h-5 text-[#154D3F] dark:text-emerald-400" />
          <span>Stage-Based Transparent Cancellation Policy</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          We understand seller plans shift unexpectedly. SahiVahan maintains a fair, time-based cancellation schedule protecting both your refund and the reserved specialist's travel calendar.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="py-2.5 pr-4">Cancellation Stage</th>
                <th className="py-2.5 px-4">Fee Structure</th>
                <th className="py-2.5 pl-4">Refund Method & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {cancellationTiers.map((t, idx) => (
                <tr key={idx}>
                  <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">{t.stage}</td>
                  <td className="py-3 px-4 font-semibold text-[#154D3F] dark:text-emerald-400">{t.fee}</td>
                  <td className="py-3 pl-4 text-slate-500 dark:text-slate-400">{t.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= 8. FREQUENTLY ASKED QUESTIONS (ACCORDION) ================= */}
      <div className="bg-white dark:bg-[#12181E] rounded-3xl border border-[#E5E9EB] dark:border-[#1E262E] p-6 sm:p-8 shadow-donezo max-w-4xl mx-auto space-y-5">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base">
          <HelpCircle className="w-5 h-5 text-[#154D3F] dark:text-emerald-400" />
          <span>Frequently Asked Questions About Pricing</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Everything you need to know about our fees, report delivery, and inspection guarantees.
        </p>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#154D3F] dark:group-hover:text-emerald-400 transition-colors">
                  {faq.q}
                </span>
                <span className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#E8F5EE] group-hover:text-[#154D3F] dark:group-hover:bg-[#154D3F]/40 dark:group-hover:text-emerald-300 transition-colors shrink-0">
                  {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              
              {openFaq === idx && (
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed pr-6">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= 9. BOTTOM CONVERSION CTA BANNER ================= */}
      <div className="text-center max-w-2xl mx-auto space-y-4 pt-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Ready to verify your next vehicle?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Takes under 2 minutes to book. Our specialist visits the vehicle location anywhere across your city.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to={`/book/vehicle?type=${activeTab}`}>
            <Button variant="primary" size="lg" className="px-8 font-black shadow-lg" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
              Book {activeTab === 'car' ? 'Car' : 'Bike'} Inspection Now
            </Button>
          </Link>
          <Link to="/sample-report">
            <Button variant="outline" size="lg" className="px-6 font-bold" leftIcon={<FileText className="w-4 h-4 mr-1 text-[#154D3F]" />}>
              View Sample Report Dossier
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
