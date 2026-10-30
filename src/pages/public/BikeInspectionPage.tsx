import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, FileText, Bike, Sparkles, Award } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const BikeInspectionPage: React.FC = () => {
  const bikeSections = [
    {
      title: 'Chassis, Frame & Fork Stem Alignment',
      points: '25 Points',
      desc: 'Inspection of steering head races, fork stanchion bend or pitting, swingarm bushing play, main frame weld integrity, and frame misalignment from past wipeouts or crashes.'
    },
    {
      title: 'Engine, Carburetor / FI & Compression',
      points: '30 Points',
      desc: 'Cold start exhaust smoke analysis (blue oil burning vs black soot), engine compression feel, valve tappet noise, clutch drag, and transmission false neutral check.'
    },
    {
      title: 'Braking Systems & Discs / Drum Runout',
      points: '20 Points',
      desc: 'Brake lever free-play, hydraulic line age and cracks, disc rotor warpage and thickness measurement, ABS ring teeth integrity, and pad friction material depth.'
    },
    {
      title: 'Chain, Sprockets & Drive Assembly',
      points: '15 Points',
      desc: 'Drive chain slack measurement, chain link binding / frozen O-rings, rear sprocket teeth shark-fin wear, and belt/pulley wear on scooters and electric bikes.'
    },
    {
      title: 'Suspension, Wheels & Tyre DOT Health',
      points: '20 Points',
      desc: 'Front fork seal oil leakage, rear monoshock / dual shock damping rebound, alloy wheel rim bend inspection, spoke tension on spoked rims, tyre manufacturing date and tread.'
    },
    {
      title: 'Electricals, Battery & Dynamic Ride Test',
      points: '15 Points',
      desc: 'Battery cranking voltage, charging stator / RR unit test, all indicators/horns, switchgear feel, and dynamic ride test for hands-free straight-line tracking and wobble.'
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
              <Bike className="w-3.5 h-3.5 text-emerald-300" /> Two-Wheeler Pre-Purchase Audit
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              120+ Point Used Bike & Scooter Inspection
            </h1>
            
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Ensure your used Royal Enfield, sports bike, commuter, or EV scooter is crash-free, mechanically sound, and worth every rupee. Our two-wheeler specialists inspect chassis alignment, engine health, and electricals on-site.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/book/vehicle">
                <Button variant="white" size="lg" className="px-7 font-extrabold shadow-lg" rightIcon={<ArrowRight className="w-4 h-4 ml-1 text-[#154D3F]" />}>
                  Book Bike Inspection (From ₹999)
                </Button>
              </Link>
              <Link to="/sample-report">
                <Button variant="glass" size="lg" className="px-6 font-bold" leftIcon={<FileText className="w-4 h-4 mr-1 text-emerald-300" />}>
                  View Sample Report
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
                <span><strong>Chassis Alignment</strong> Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>From <strong>₹999 Only</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: High-tech Visual Diagnostic Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#0B211B] shadow-2xl group">
              <img 
                src="/images/bike-hero.jpg" 
                alt="SahiVahan Certified Pre-Purchase Bike Inspection Diagnostics" 
                className="w-full h-[300px] sm:h-[360px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700" 
              />
              {/* Subtle Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A261F]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Top Telemetry Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <div className="bg-black/60 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-white tracking-wide">Fork & Frame Laser Check</span>
                </div>
                <div className="bg-emerald-950/80 backdrop-blur-md border border-emerald-400/30 px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-300 font-semibold">
                  0.0° True Align
                </div>
              </div>

              {/* Floating Bottom Telemetry Cards */}
              <div className="absolute bottom-3 left-3 right-3 space-y-2 pointer-events-none">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-black/75 backdrop-blur-md border border-white/15 rounded-xl p-2.5 shadow-lg">
                    <span className="text-slate-400 text-[10px] block font-medium">Compression</span>
                    <span className="text-emerald-300 font-bold font-mono">145 PSI • Healthy</span>
                  </div>
                  <div className="bg-black/75 backdrop-blur-md border border-white/15 rounded-xl p-2.5 shadow-lg">
                    <span className="text-slate-400 text-[10px] block font-medium">Drive Assembly</span>
                    <span className="text-white font-bold font-mono">82% Sprocket Life</span>
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
          <Badge variant="teal">120+ Audit Points</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Checklist Modules & Coverage
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Designed specifically for Indian road conditions and two-wheeler dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bikeSections.map((sec, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo space-y-3 hover:border-[#154D3F]/40 dark:hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 border border-[#CBEAD8] dark:border-emerald-600/30 uppercase tracking-wider">
                  {sec.points}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center">
                  <Bike className="w-4 h-4" />
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
            <span>Bike Inspection Inclusions</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> On-site physical check at seller's doorstep or meeting point
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> Chassis straightness & front fork rake alignment verification
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> Compression feel, cold start smoke, and clutch slip check
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> Drive chain slack, sprocket wear & swingarm play test
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> Dynamic test ride for straight-line tracking & braking stability
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#154D3F] dark:text-emerald-400 font-bold">✓</span> 25+ timestamped photographs and indicative repair estimates
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
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> No internal engine cylinder head or crankcase stripping
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> Stunt riding, high-speed circuit testing, or wheelies are strictly prohibited
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> No guarantee against latent electrical faults in aftermarket modifications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold">✕</span> Traffic challan and hypothecation status must be verified on Parivahan
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom CTA Card */}
      <div className="text-center bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] rounded-3xl p-8 sm:p-10 shadow-donezo space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Book Your Two-Wheeler Inspection
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Starting at only ₹999 + 18% GST for standard motorcycles and electric scooters.
        </p>
        <div className="pt-2">
          <Link to="/book/vehicle">
            <Button variant="primary" size="lg" className="px-8 font-bold">
              Book Bike Inspection Now
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
