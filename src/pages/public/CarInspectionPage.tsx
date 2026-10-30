import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, XCircle, Gauge, Cpu, Disc, Wrench, ArrowRight, FileText, Car } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const CarInspectionPage: React.FC = () => {
  const inspectionSections = [
    {
      title: 'Chassis, Apron & Body Frame Structure',
      points: '35 Points',
      desc: 'Deep inspection of radiator core support, A/B/C pillars, rocker panels, strut towers, firewall, floor pan, and rear quarter seams to ensure OEM spot welds and zero accidental deformation.'
    },
    {
      title: 'Engine, Turbo, Transmission & Powertrain',
      points: '45 Points',
      desc: 'Cold start, idle stability, engine blow-by check, valve cover weeping, turbo boost plumbing, coolant contamination, clutch bite, and automatic / DCT gearbox response.'
    },
    {
      title: 'Ultrasonic Paint Depth Measurement',
      points: '20 Panels',
      desc: 'Digital micron readings on fenders, doors, bonnet, roof, and boot lid to identify concealed accident body filler, blend lines, and total panel replacements.'
    },
    {
      title: 'OBD-II Computer Diagnostic Scan',
      points: 'Real-time Scan',
      desc: 'Electronic interrogation of Engine Control Unit (ECU), Airbag/SRS, ABS/ESC modules to retrieve active and stored fault codes, readiness monitors, and freeze-frame sensor data.'
    },
    {
      title: 'Suspension, Steering, Brakes & Tyres',
      points: '40 Points',
      desc: 'Strut leakage, lower arm ball joints, tie rod play, steering rack backlash, brake rotor lip thickness, brake pad life in mm, and tyre tread depth + DOT date codes.'
    },
    {
      title: 'Interior, Electrics & Climate Control',
      points: '35 Points',
      desc: 'Air conditioning vent temperature test, seat belt retractor lock check, sunroof drain inspection, electrical switchgear, infotainment, instrument cluster warning lamps.'
    },
    {
      title: 'Dynamic Road Test (Tracking & Brakes)',
      points: '25 Points',
      desc: 'On-road evaluation of straight-line tracking, high-speed braking shudder, suspension clunks over rough surfaces, clutch slippage, and transmission upshift/downshift smoothness.'
    }
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero (Donezo Signature Forest Green Container) */}
      <div className="bg-gradient-to-br from-[#0F382E] via-[#154D3F] to-[#0A261F] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Car className="w-3.5 h-3.5 text-emerald-300" /> Comprehensive 4-Wheeler Diagnostic Audit
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              200+ Point Pre-Purchase Used Car Inspection
            </h1>
            
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Don't trust an unverified seller's words. SahiVahan sends an experienced automotive diagnostic specialist to the vehicle's location equipped with ultrasonic paint gauges, professional OBD scanners, and mechanical diagnostic tools.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/book/vehicle">
                <Button variant="white" size="lg" className="px-7 font-extrabold shadow-lg" rightIcon={<ArrowRight className="w-4 h-4 ml-1 text-[#154D3F]" />}>
                  Book Car Inspection (From ₹1,999)
                </Button>
              </Link>
              <Link to="/sample-report">
                <Button variant="glass" size="lg" className="px-6 font-bold" leftIcon={<FileText className="w-4 h-4 mr-1 text-emerald-300" />}>
                  View Sample Car Report
                </Button>
              </Link>
            </div>

            {/* Mini Trust Stats Strip */}
            <div className="pt-4 border-t border-emerald-800/40 flex flex-wrap items-center gap-6 text-xs text-emerald-100/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Doorstep in <strong>2 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span><strong>100% Unbiased</strong> (Zero Dealer Cut)</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-300" />
                <span><strong>Digital Dossier</strong> in 60 Mins</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-tech Visual Diagnostic Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#0B211B] shadow-2xl group">
              <img 
                src="/images/car-hero.jpg" 
                alt="SahiVahan Certified Pre-Purchase Car Inspection Diagnostics" 
                className="w-full h-[300px] sm:h-[360px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Subtle Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A261F]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Top Telemetry Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <div className="bg-black/60 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-white tracking-wide">OBD-II Live Telemetry</span>
                </div>
                <div className="bg-emerald-950/80 backdrop-blur-md border border-emerald-400/30 px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-300 font-semibold">
                  0 Fault Codes
                </div>
              </div>

              {/* Floating Bottom Telemetry Cards */}
              <div className="absolute bottom-3 left-3 right-3 space-y-2 pointer-events-none">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-black/75 backdrop-blur-md border border-white/15 rounded-xl p-2.5 shadow-lg">
                    <span className="text-slate-400 text-[10px] block font-medium">Paint Depth</span>
                    <span className="text-emerald-300 font-bold font-mono">112 µm • OEM Spec</span>
                  </div>
                  <div className="bg-black/75 backdrop-blur-md border border-white/15 rounded-xl p-2.5 shadow-lg">
                    <span className="text-slate-400 text-[10px] block font-medium">Chassis Apron</span>
                    <span className="text-white font-bold font-mono">100% Original Seams</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scope Sections */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="teal">200+ Diagnostic Points</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Inspection Covers
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Every critical component is graded: Good, Average, Poor, Critical, or Not Inspected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {inspectionSections.map((sec, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo space-y-3 hover:border-[#154D3F]/40 dark:hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 border border-[#CBEAD8] dark:border-emerald-600/30 uppercase tracking-wider">
                  {sec.points}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                {sec.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {sec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Inclusions vs Limitations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Inclusions Card */}
        <div className="rounded-3xl p-6 sm:p-7 bg-[#E8F5EE]/60 dark:bg-[#154D3F]/20 border border-[#CBEAD8] dark:border-emerald-600/30 space-y-4">
          <div className="flex items-center gap-2 text-[#154D3F] dark:text-emerald-300 font-extrabold text-base">
            <CheckCircle2 className="w-5 h-5 text-[#154D3F] dark:text-emerald-400" />
            <span>Inspection Inclusions</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> On-site doorstep arrival by verified technician at seller location
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> Full 20-panel ultrasonic paint depth readings with micron log
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> OBD-II electronic diagnostic scan for ECU, ABS, SRS fault codes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> Structural A/B/C pillar, apron, and chassis accident inspection
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> Dynamic test drive checking transmission, steering rack, and brakes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> 40+ timestamped HD photographs and indicative repair estimates
            </li>
          </ul>
        </div>

        {/* Limitations Card */}
        <div className="rounded-3xl p-6 sm:p-7 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-base">
            <XCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>Inspection Limitations</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> No destructive engine disassembly, transmission drop, or oil pan removal
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> High-speed race track testing or illegal speed runs are not performed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> Internal gearbox wear without active DTC codes or slippage cannot be predicted
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> Legal title, RTO hypothecation, and challan history must be verified via Parivahan
            </li>
          </ul>
        </div>

      </div>

      {/* Comprehensive In-Depth Diagnostic Article / Masterclass */}
      <article className="bg-white dark:bg-[#12181E] border border-slate-200/90 dark:border-[#1E262E] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-donezo space-y-10">
        
        {/* Article Header & Meta */}
        <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#E8F5EE] dark:bg-emerald-950/60 text-[#154D3F] dark:text-emerald-300 border border-[#CBEAD8] dark:border-emerald-800 uppercase tracking-wider">
              Diagnostic Masterclass & Investigation Guide
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              • 9 Min Read • By SahiVahan Master Technical Guild • October 2026
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            The Definitive Pre-Purchase Used Car Inspection Guide: How to Spot Accidental Structural Trauma, Odometer Fraud & Concealed Flood Damage
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
            Buying a pre-owned vehicle in India is one of the highest-stakes consumer transactions you will undertake. Behind high-gloss detailing, fresh tyre shine, and showroom promises often lie concealed flood waterlines, compromised crumple zones from heavy front collisions, and cleared Check Engine warning lights. This forensic guide details the exact scientific checkpoints every smart buyer must demand before transferring funds.
          </p>
        </div>

        {/* Article Body Content */}
        <div className="space-y-10 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          
          {/* Section 1: Structural Integrity & Spot Welds */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Structural Frame & Spot Weld Forensics: Why Outer Panels Lie
              </h3>
            </div>
            
            <p>
              Outer body panels (bumpers, fenders, bonnet) are essentially bolt-on cosmetic skins. What truly determines vehicle safety and market value is the monocoque chassis structure — specifically the front radiator core apron, strut suspension towers, A-pillars, B-pillars, and rear quarter weld seams.
            </p>
            <p>
              Automotive assembly plants use automated robotic resistance spot welding to fuse chassis panels. Factory spot welds are perfectly round, spaced exactly 30mm to 45mm apart, and sealed with robotic laser sealant beads. In contrast, local repair shops and collision centers rely on manual gas or MIG spot welding. These manual welds leave irregular heat-scorched edges, uneven indentations, and hand-applied silicone seam sealant.
            </p>
            
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
              <strong>Forensic Red Flag:</strong> If the spot welds under the rubber door weatherstripping are missing or smoothed over with body filler, the vehicle has suffered a severe T-bone or rollover accident. In a future collision, the pillar will collapse instead of absorbing impact forces.
            </div>
          </section>

          {/* Section 2: Ultrasonic Paint Depth Gauge (Microns) */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Ultrasonic Micron Gauging: Detecting Concealed Putty & Panel Replacement
              </h3>
            </div>

            <p>
              Human eyes cannot measure paint coating thickness, but an ultrasonic digital paint meter measuring in microns (µm) reveals a vehicle’s entire repair history in seconds. Here is the scientific calibration standard applied across certified inspections:
            </p>

            {/* Micron Scale Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Micron Reading (µm)</th>
                    <th className="p-3">Diagnostic Status</th>
                    <th className="p-3">Forensic Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="bg-white dark:bg-[#12181E]">
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">80 – 140 µm</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">OEM Factory Paint</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">Original robotically baked primer, basecoat, and clearcoat. Zero accident history.</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-[#0A0E12]">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">150 – 250 µm</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Repainted / Clearcoated</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">Panel was resprayed to cover scratches or minor scrapes. Structurally safe.</td>
                  </tr>
                  <tr className="bg-white dark:bg-[#12181E]">
                    <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">260 – 500 µm</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">Body Filler (Bondo/Putty)</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">Significant dent pulled out with polyester filler underneath the paint.</td>
                  </tr>
                  <tr className="bg-red-50/40 dark:bg-red-950/20">
                    <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400">&gt; 500 µm (Up to 1500+)</td>
                    <td className="p-3 font-bold text-red-700 dark:text-red-300">Severe Collision Reconstruction</td>
                    <td className="p-3 text-red-600 dark:text-red-400 font-medium">Extreme trauma. Heavy sheet metal deformity packed with body filler. Walk away.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: OBD-II CAN-Bus Computer Diagnostics */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                OBD-II CAN-Bus Computer Diagnostics: Bypassing Dashboard Tricks
              </h3>
            </div>

            <p>
              Dealers frequently clear Check Engine warning lights (MIL) by disconnecting the 12V battery terminal or using a cheap ₹500 Bluetooth scanner 20 minutes before a buyer arrives. To an untrained buyer, the dashboard looks pristine.
            </p>
            <p>
              SahiVahan specialists plug professional bi-directional diagnostic scanners into the OBD-II port to interrogate the Controller Area Network (CAN-Bus). Our scan interrogates three critical electronic vectors:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Vector A</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Readiness Monitors</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Reveals whether the catalytic converter, EVAP, and oxygen sensors have completed their self-diagnostic drive cycles. If marked "Not Ready", fault codes were deliberately wiped recently.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Vector B</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Freeze-Frame Telemetry</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Freezes engine parameters (RPM, coolant temperature, injector pulse width) at the exact millisecond a fault code triggered, proving intermittent misfires or transmission overheating.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Vector C</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">Multi-ECU Odometer Cross-Check</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Unscrupulous sellers roll back the instrument cluster odometer. But genuine mileage remains etched in the ABS module, Transmission TCU, and airbag deployment logs.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Modern Powertrain Risks - Turbos & Dual-Clutch Gearboxes */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Modern Powertrain Pitfalls: Turbo Blow-by & Dual-Clutch (DCT/DSG) Shudder
              </h3>
            </div>

            <p>
              With modern direct-injection turbocharged petrols (TSI, TGDi, EcoBoost) and automated gearboxes dominating used sales, traditional checks like kicking tyres or listening to idle are dangerously inadequate.
            </p>
            <p>
              <strong>1. The Crankcase Blow-by Test:</strong> On a warm engine at idle, our specialist loosens the oil filler cap. If pressurized exhaust gases vigorously lift the cap and emit white/blue puffs, combustion chamber blow-by is occurring. This indicates worn piston compression rings or cylinder wall scoring — requiring an engine overhaul costing ₹1,50,000+.
            </p>
            <p>
              <strong>2. Dual-Clutch (DCT / DSG / DCA) Crawl Analysis:</strong> Dry dual-clutch transmissions (like VW DQ200 or Hyundai 7DCT) suffer severe heat degradation in Indian stop-and-go traffic. During our dynamic road test, the specialist conducts slow 5 km/h low-speed crawls and steep ramp starts to identify micro-shudders, delayed second gear clutch handoffs, and mechatronic solenoid lag.
            </p>
          </section>

          {/* Section 5: Flood Damage Forensics */}
          <section className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                05
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Flood & Water Damage Forensics: Spotting the Concealed Waterline
              </h3>
            </div>

            <p>
              Following monsoon flooding in cities like Chennai, Mumbai, and Bengaluru, flooded vehicles are chemically cleaned, re-scented, and sold in secondary markets. While detailing removes visible surface mud, water invariably leaves permanent forensic traces:
            </p>

            <ul className="space-y-2 text-xs list-disc pl-5">
              <li><strong>Seat Rail & Spring Corrosion:</strong> Factory seat rails and under-seat springs are bare unpainted steel. Submersion causes oxidation and orange rust flakes within days.</li>
              <li><strong>Silt in Wiring Looms:</strong> Pulling the lower door sill plastic reveals the main body wiring harness. Silt and water mineral sediment remain trapped inside the protective split-loom tubing forever.</li>
              <li><strong>Fully Extended Seatbelt Webbing:</strong> When seatbelts are extracted completely to their mechanical stop, a tide watermark is frequently visible at the 2.5-meter mark where wet webbing sat coiled in the B-pillar retractor.</li>
              <li><strong>Green Copper Oxide on Connectors:</strong> Electronic terminal pins in the fuse box and footwell BCM develop green copper carbonate crusting, causing phantom electrical shorts weeks after purchase.</li>
            </ul>
          </section>

          {/* Section 6: SahiVahan 3-Tier Decision Matrix */}
          <section className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>The Buyer's 3-Tier Decision Matrix</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <span className="font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide block">
                  🟢 Green Flag (Proceed)
                </span>
                <p className="text-emerald-900/90 dark:text-emerald-200/90 leading-relaxed">
                  Paint 80-140 µm, no structural weld rework, clean OBD-II monitors, smooth gear shifts, zero crankcase blow-by. Buy with total peace of mind.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1.5">
                <span className="font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wide block">
                  🟡 Amber Flag (Negotiation Weapon)
                </span>
                <p className="text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                  Tyres nearing 2mm tread, minor bumper respray, brake pads at 30%, mild strut weeping. Use our itemized repair estimate to deduct ₹25,000 – ₹50,000 from the asking price.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-800 space-y-1.5">
                <span className="font-extrabold text-red-800 dark:text-red-300 uppercase tracking-wide block">
                  🔴 Red Flag (Walk Away Immediately)
                </span>
                <p className="text-red-900/90 dark:text-red-200/90 leading-relaxed">
                  Apron or pillar spot weld trauma, heavy body filler &gt; 500 µm, airbag fault code or deployed sensor, rust in fuse box, DCT clutch slip. Do not buy under any discount.
                </p>
              </div>
            </div>
          </section>

          {/* Expert Technical Signoff */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div>
              <span>Published by <strong>SahiVahan Automotive Engineering Desk</strong></span>
              <span className="block text-[11px] text-slate-400">Peer-reviewed by Certified Master Automotive Diagnosticians</span>
            </div>
            <Link to="/book/vehicle" className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 hover:underline">
              Schedule Your 200+ Point Audit →
            </Link>
          </div>

        </div>
      </article>

      {/* Bottom CTA Card */}
      <div className="text-center bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] rounded-3xl p-8 sm:p-10 shadow-donezo space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Book Your Pre-Purchase Car Inspection
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Starting at only ₹1,999 + 18% GST for standard hatchbacks and sedans. Complete digital report delivered within 60 minutes of physical inspection.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link to="/book/vehicle">
            <Button variant="primary" size="lg" className="px-8 font-bold shadow-lg">
              Book Car Inspection Now
            </Button>
          </Link>
          <Link to="/sample-report">
            <Button variant="outline" size="lg" className="px-6 font-bold">
              Explore Live Sample Report
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
