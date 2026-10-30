import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Car,
  Bike,
  CheckCircle,
  FileSearch,
  Cpu,
  Gauge,
  Disc,
  ArrowRight,
  Star,
  MapPin,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Award,
  Sparkles,
  CheckCircle2,
  Sliders,
  Check,
  Search,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { getMakesByType, getModelsByMake } from '../../data/vehicleCatalog';
import { SERVICE_CITIES } from '../../api/mockData';
import { useBooking } from '../../store/BookingContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { updateDraftVehicle } = useBooking();
  const [selectedType, setSelectedType] = useState<'car' | 'bike'>('car');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [searchPincode, setSearchPincode] = useState<string>('');
  const [pincodeResult, setPincodeResult] = useState<{ serviceable: boolean; city?: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const availableMakes = getMakesByType(selectedType);
  const availableModels = selectedMake ? getModelsByMake(selectedType, selectedMake) : [];

  const handleQuickBook = () => {
    if (selectedMake) {
      const chosenMakeObj = availableMakes.find((m) => m.name === selectedMake || m.id === selectedMake);
      const makeName = chosenMakeObj ? chosenMakeObj.name : selectedMake;
      const modelName = selectedModel || (availableModels.length > 0 ? availableModels[0].name : (selectedType === 'car' ? 'Creta' : 'Classic 350'));
      const variants = chosenMakeObj ? chosenMakeObj.models.find(m => m.name === modelName)?.variants || [] : [];
      const firstVar = variants[0];

      updateDraftVehicle({
        type: selectedType,
        make: makeName,
        model: modelName,
        variant: firstVar ? firstVar.name : (selectedType === 'car' ? '1.5 Petrol EX' : 'Halcyon Series'),
        manufacturingYear: 2022,
        fuelType: firstVar ? firstVar.fuelType : 'Petrol',
        transmission: firstVar ? firstVar.transmission : 'Manual',
        complexity: firstVar ? firstVar.complexity : (selectedType === 'car' ? 'complex' : 'standard')
      });
    }
    navigate('/book/vehicle');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPincode || searchPincode.length < 6) return;

    let foundCity: string | undefined;
    for (const city of SERVICE_CITIES) {
      if (city.supportedPincodes.includes(searchPincode.trim())) {
        foundCity = city.name;
        break;
      }
    }

    if (foundCity) {
      setPincodeResult({ serviceable: true, city: foundCity });
    } else {
      setPincodeResult({ serviceable: false });
    }
  };

  const faqs = [
    {
      q: 'Why should I get an independent pre-purchase inspection?',
      a: 'Used cars and bikes frequently carry hidden accident damage, welded chassis frames, flooded electricals, or tampered odometers that a casual test drive cannot reveal. SahiVahan provides an objective, 200+ point engineering assessment and OBD-II electronic diagnostic scan so you know exactly what you are paying for.'
    },
    {
      q: 'Does SahiVahan give a guarantee or warranty on the vehicle?',
      a: 'SahiVahan is an independent on-site inspection service, not an insurer or warranty provider. Our specialist assesses the observable condition of the vehicle at the time of appointment. We provide indicative repair cost estimates and defects observed to empower your price negotiation.'
    },
    {
      q: 'How quickly is the inspection report delivered?',
      a: 'The complete digital report is delivered immediately to your account the moment our specialist completes and submits the checklist on-site. There is no waiting for manual report approvals.'
    },
    {
      q: 'What if the seller is uncooperative or refuses the inspection?',
      a: 'We always recommend confirming with the seller beforehand. If our specialist arrives at the vehicle and the seller denies permission or is unreachable, the specialist captures geotagged arrival evidence. Under our policy, you are offered a free reschedule within 48 hours or cancellation with a minimal call-out allowance deduction.'
    },
    {
      q: 'Are your inspection specialists certified?',
      a: 'Yes. All SahiVahan specialists are rigorously vetted automotive engineers and former authorized service center master technicians equipped with ultrasonic paint depth gauges, professional OBD-II diagnostic scanners, and specialized toolsets.'
    }
  ];

  const popularCarQuickPicks = [
    { make: 'Maruti Suzuki', model: 'Swift' },
    { make: 'Hyundai', model: 'Creta' },
    { make: 'Tata Motors', model: 'Nexon' },
    { make: 'Mahindra', model: 'XUV700' },
    { make: 'Maruti Suzuki', model: 'Baleno' },
  ];

  const popularBikeQuickPicks = [
    { make: 'Royal Enfield', model: 'Classic 350' },
    { make: 'Honda 2-Wheelers', model: 'Activa 6G / 125' },
    { make: 'Royal Enfield', model: 'Himalayan 450' },
    { make: 'KTM', model: 'Duke 390' },
    { make: 'Ather Energy', model: '450X Gen 3' },
  ];

  const handleQuickSelectVehicle = (make: string, model: string) => {
    setSelectedMake(make);
    setSelectedModel(model);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION (Donezo Forest Green Signature Container with Radial Lighting) */}
      <section className="pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#071F18] via-[#103D32] to-[#051712] text-white p-7 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden border border-emerald-800/50">
          
          {/* Subtle Ambient Radial Lighting & High-Tech Grid Pattern */}
          <div className="absolute top-0 right-1/4 w-[520px] h-[520px] bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[420px] h-[420px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Headline, Trust Tags, Live Badge, Dual CTA */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Sahi Gaadi. Sahi Faisla. · 100% Unbiased Diagnostics</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Never Buy a Used Car or Bike <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-100 to-white">Without Inspection</span>
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
                Book certified automotive diagnostic engineers for on-site 200+ point pre-purchase evaluations. We uncover hidden accident damages, welded frames, odometer fraud, and provide quantified repair estimates before you pay.
              </p>

              {/* Key Trust Stats (Donezo Style Frosted Glass Cards) */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-emerald-400/30 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-white">200+</div>
                  <div className="text-[11px] text-emerald-200/80 font-medium mt-0.5">Diagnostic Points</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-emerald-400/30 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-emerald-300">100%</div>
                  <div className="text-[11px] text-emerald-200/80 font-medium mt-0.5">Zero Dealer Ties</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-emerald-400/30 transition-colors">
                  <div className="text-xl sm:text-2xl font-black text-amber-300">4.9 ★</div>
                  <div className="text-[11px] text-emerald-200/80 font-medium mt-0.5">25,000+ Verified</div>
                </div>
              </div>

              {/* Action Buttons & Real-Time Availability Bar */}
              <div className="space-y-3.5 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Link to={`/book/vehicle?type=${selectedType}`}>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-black text-sm bg-white text-[#154D3F] hover:bg-emerald-50 shadow-xl shadow-black/30 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group"
                    >
                      <span>Book Doorstep Inspection</span>
                      <span className="text-[11px] font-extrabold bg-[#E8F5EE] text-[#154D3F] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        From {selectedType === 'car' ? '₹1,999' : '₹999'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#154D3F] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>

                  <Link to="/sample-report">
                    <Button 
                      variant="glass" 
                      size="lg" 
                      className="font-bold hover:scale-105 active:scale-95 px-6 py-3.5 text-sm" 
                      leftIcon={<FileSearch className="w-4 h-4 text-emerald-300 mr-1.5" />}
                    >
                      View Sample Report
                    </Button>
                  </Link>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Doorstep Specialists on-call now across Bangalore, Mumbai, Delhi-NCR, Hyderabad & Pune</span>
                </div>
              </div>

            </div>

            {/* Right Column: Floating Quick-Booking Widget with High-Contrast CTA */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-[#12181E] rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 dark:border-[#1E262E] text-slate-900 dark:text-white transition-all relative">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Quick Diagnostic Booking
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Specialist visits seller anywhere in your city
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Instant Slot
                  </span>
                </div>

                {/* Car vs Bike Tactile Selector */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-1 bg-[#F4F6F8] dark:bg-[#0A0E12] rounded-full border border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('car');
                      setSelectedMake('');
                      setSelectedModel('');
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-bold transition-all ${
                      selectedType === 'car'
                        ? 'bg-[#154D3F] text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Car Inspection</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedType('bike');
                      setSelectedMake('');
                      setSelectedModel('');
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-xs font-bold transition-all ${
                      selectedType === 'bike'
                        ? 'bg-[#154D3F] text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Bike className="w-3.5 h-3.5" />
                    <span>Bike Inspection</span>
                  </button>
                </div>

                {/* Quick Model Tap Chips */}
                <div className="mt-3.5 pt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Popular {selectedType === 'car' ? 'Cars' : 'Bikes'}</span>
                    <span className="text-[9px] text-[#154D3F] dark:text-emerald-400 font-bold">1-Tap Select</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedType === 'car' ? popularCarQuickPicks : popularBikeQuickPicks).map((item, idx) => {
                      const isSelected = selectedMake === item.make && selectedModel === item.model;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuickSelectVehicle(item.make, item.model)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-[#154D3F] text-white border-[#154D3F]'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#154D3F] dark:hover:border-emerald-500'
                          }`}
                        >
                          {item.model}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Make & Model Dropdowns */}
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Select Vehicle Brand / Make
                    </label>
                    <select
                      value={selectedMake}
                      onChange={(e) => {
                        setSelectedMake(e.target.value);
                        setSelectedModel('');
                      }}
                      className="w-full px-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#0A0E12] border border-[#E5E9EB] dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#154D3F] focus:ring-1 focus:ring-[#154D3F]"
                    >
                      <option value="">-- Choose Brand / OEM --</option>
                      {availableMakes.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedMake && (
                    <div className="animate-fadeIn">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Select Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F4F6F8] dark:bg-[#0A0E12] border border-[#E5E9EB] dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#154D3F] focus:ring-1 focus:ring-[#154D3F]"
                      >
                        <option value="">-- Choose Model --</option>
                        {availableModels.map((mod) => (
                          <option key={mod.name} value={mod.name}>
                            {mod.name} ({mod.bodyType})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Pricing Teaser Pill */}
                  <div className="bg-[#E8F5EE] dark:bg-[#154D3F]/30 border border-[#CBEAD8] dark:border-emerald-600/30 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#154D3F] dark:text-emerald-300 font-bold uppercase tracking-wider">
                        Starting Diagnostic Fee
                      </div>
                      <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {selectedType === 'car' ? '₹1,999' : '₹999'}
                        <span className="text-[10px] font-normal text-slate-500 ml-1">+ 18% GST</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-[#154D3F] dark:text-emerald-300 font-bold leading-tight">
                      Includes {selectedType === 'car' ? '200+' : '120+'} Checkpoints<br />
                      & On-Site Master Scan
                    </div>
                  </div>

                  {/* HIGH-CONVERTING EYE-CATCHING PRIMARY CTA BUTTON */}
                  <button
                    type="button"
                    onClick={handleQuickBook}
                    className="w-full relative group overflow-hidden rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.015] active:scale-[0.985] shadow-xl shadow-[#154D3F]/25 hover:shadow-2xl hover:shadow-emerald-600/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 mt-2"
                  >
                    {/* Pulsating Gradient Aura Ring */}
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity blur-[1px]" />
                    
                    {/* Inner Rich Elevated Surface */}
                    <div className="relative px-5 py-4 rounded-[14px] bg-gradient-to-r from-[#0C3026] via-[#124B3C] to-[#0A8754] group-hover:from-[#0E382C] group-hover:via-[#165C4A] group-hover:to-[#0EA266] text-white flex items-center justify-between transition-all duration-200">
                      <div className="text-left space-y-0.5">
                        <div className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5">
                          <span>Continue to Booking Details</span>
                          <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1.5 transition-transform duration-200 shrink-0" />
                        </div>
                        <div className="text-[11px] text-emerald-200 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                          <span>Lock doorstep slot · Zero advance payment required</span>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-[#0C3026] group-hover:scale-110 transition-all duration-200 shrink-0 ml-3">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </button>

                  {/* Trust Micro-Bullets */}
                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" /> Free Reschedule
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" /> 100% Unbiased
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" /> Escrow Payouts
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: 4 CRITICAL RISKS UNCOVERED (Donezo Style Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="teal">Deep Engineering Diagnostics</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Specialists Uncover That Sellers Hide
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Dealership touch-ups and surface polish cannot fool precision engineering instruments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          
          {/* Card 1: Paint Gauge */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo hover:border-[#154D3F]/40 dark:hover:border-emerald-500/40 transition-all space-y-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 flex items-center justify-center border border-[#CBEAD8] dark:border-emerald-600/30">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Ultrasonic Paint Depth
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We measure paint thickness across every metallic panel in microns to detect concealed body filler, panel repaints, and cut-and-weld accident joints.
            </p>
            <div className="pt-2 text-[10px] font-bold text-[#154D3F] dark:text-emerald-400 uppercase tracking-wider">
              Accuracy: ±1 Micron
            </div>
          </div>

          {/* Card 2: OBD Computer Scan */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo hover:border-[#154D3F]/40 dark:hover:border-emerald-500/40 transition-all space-y-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 flex items-center justify-center border border-blue-200 dark:border-blue-800">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              OBD-II Computer Scan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Live ECU scan retrieves stored Diagnostic Trouble Codes (DTCs), airbag firing history, ABS module errors, and true mileage from transmission controllers.
            </p>
            <div className="pt-2 text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              OEM ECU Protocol Scan
            </div>
          </div>

          {/* Card 3: Structural Frame Checks */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo hover:border-[#154D3F]/40 dark:hover:border-emerald-500/40 transition-all space-y-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Chassis & Pillar Integrity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Examination of A/B/C pillars, apron seams, radiator supports, and underbody chassis rails for OEM spot welds, accident deformation, and flood silt line.
            </p>
            <div className="pt-2 text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
              Spot Weld Audited
            </div>
          </div>

          {/* Card 4: Indicative Repair Estimates */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo hover:border-[#154D3F]/40 dark:hover:border-emerald-500/40 transition-all space-y-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center border border-purple-200 dark:border-purple-800">
              <Disc className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Indicative Repair Estimates
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every identified defect comes with an indicative spare parts and labor cost range to empower your price bargaining with the vehicle seller or dealer.
            </p>
            <div className="pt-2 text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
              Negotiation Leverage
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: 4-STEP HOW IT WORKS (Donezo Workflow) */}
      <section className="bg-slate-100/70 dark:bg-[#070A0D] py-16 px-4 sm:px-6 lg:px-8 border-y border-[#E5E9EB] dark:border-[#1E262E]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="teal">Effortless Flow</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How SahiVahan Works
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Four straightforward steps to total confidence on your used vehicle purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'Book Online in 2 Mins',
                desc: 'Select car or bike, enter seller location pincode, and choose preferred date/slot with transparent pricing.'
              },
              {
                step: '02',
                title: 'Specialist Visits On-Site',
                desc: 'Vetted automotive technician arrives at the vehicle location and uploads verified arrival selfie.'
              },
              {
                step: '03',
                title: 'Rigorous 200+ Pt Audit',
                desc: 'Physical examination, ultrasonic paint depth test, OBD computer scan, battery health, and dynamic road test.'
              },
              {
                step: '04',
                title: 'Instant Tamper-Proof Dossier',
                desc: 'View overall Health Score, categorized findings, high-res photos, and download verified PDF report.'
              }
            ].map((st, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#12181E] p-6 rounded-3xl border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 font-extrabold text-xs flex items-center justify-center border border-[#CBEAD8] dark:border-emerald-600/30 mb-4">
                    {st.step}
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE SPECIMEN REPORT SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="teal">Interactive Dossier Preview</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Inspect The Actual Report You Receive
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Every SahiVahan report includes overall vehicle health score, diagnostic trouble codes, ultrasonic paint gauge thickness map, and indicative defect repair costs.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  'Overall 0-100 Vehicle Health Index score',
                  'Ultrasonic paint depth readings across 12+ metallic panels',
                  'OBD-II ECU computer scan with freeze-frame error logs',
                  'Indicative parts and labor estimates for price bargaining'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#154D3F] dark:text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/sample-report">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Open Interactive Sample Dossier
                  </Button>
                </Link>
              </div>
            </div>

            {/* Specimen Dossier Mockup (Donezo Style Dark/Light Card) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl p-6 bg-gradient-to-br from-[#0F382E] via-[#154D3F] to-[#0A261F] text-white shadow-xl relative overflow-hidden border border-emerald-700/40">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                      Verified Report Dossier
                    </div>
                    <div className="text-base font-extrabold text-white mt-0.5">
                      2021 Hyundai Creta 1.5 SX (O)
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-extrabold">
                      Score: 88 / 100
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-[10px] text-emerald-200">Paint Depth</div>
                    <div className="text-sm font-black text-white mt-0.5">118 µm (OEM Factory)</div>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-[10px] text-emerald-200">OBD Diagnostic Scan</div>
                    <div className="text-sm font-black text-emerald-300 mt-0.5">0 Active Faults</div>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-[10px] text-emerald-200">Tyre Health</div>
                    <div className="text-sm font-black text-white mt-0.5">6.2 mm (Good Life)</div>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-[10px] text-emerald-200">Price Leverage</div>
                    <div className="text-sm font-black text-amber-300 mt-0.5">₹45,000 Negotiable</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100/80">
                  <span>Inspector: Rajesh K. (ID: SP-001)</span>
                  <span className="font-bold text-white">42 HD Photos Uploaded</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: PINCODE SERVICEABILITY CHECKER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#154D3F] dark:text-emerald-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" /> Live Metro Coverage
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Check Serviceability in Your City
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Operating across Bengaluru, Delhi-NCR, Mumbai, Hyderabad, and Pune. Enter your inspection location pincode to check immediate slot availability.
              </p>
            </div>

            <div className="md:col-span-5">
              <form onSubmit={handleCheckPincode} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 560102)"
                    value={searchPincode}
                    onChange={(e) => setSearchPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-4 py-2.5 bg-[#F4F6F8] dark:bg-[#0A0E12] border border-[#E5E9EB] dark:border-[#1E262E] rounded-full text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#154D3F]"
                  />
                  <Button variant="primary" size="md" type="submit">
                    Check
                  </Button>
                </div>

                {pincodeResult && (
                  <div
                    className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                      pincodeResult.serviceable
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {pincodeResult.serviceable ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Available in <strong>{pincodeResult.city}</strong>! Verified specialists ready for dispatch today.</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        <span>Pincode not currently serviceable. Expanding to this zone shortly.</span>
                      </>
                    )}
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: CUSTOMER REVIEWS & REAL BUYER SAVINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="teal">Verified Buyer Experiences</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved Lakhs on Hidden Lemons
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Read how prospective buyers avoided catastrophic vehicle purchases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "The dealer swore the 2020 Creta was bumper-to-bumper original. Inspector Rajesh detected paint readings over 340 microns and uncovered where the apron had been pulled and re-welded. Saved me from a ₹11.5 Lakh accident car!"
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Gautam Sen</div>
                <div className="text-[11px] text-slate-400">Bengaluru · Hyundai Creta</div>
              </div>
              <Badge variant="success" size="sm">Saved ₹11.5L</Badge>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "Booked an inspection for a Royal Enfield Classic 350 in Gurugram. The inspector checked fork alignment, compression, and discovered a cracked rear swingarm bushing. Used the report to negotiate ₹14,000 off asking price!"
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Manish Chawla</div>
                <div className="text-[11px] text-slate-400">Gurugram · RE Classic 350</div>
              </div>
              <Badge variant="success" size="sm">Saved ₹14,000</Badge>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#12181E] border border-[#E5E9EB] dark:border-[#1E262E] shadow-donezo space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "The live OBD diagnostic scan caught an intermittent dual-clutch transmission error that didn't trigger any dashboard light. SahiVahan gave me the exact indicative repair cost (₹45,000). Highly professional service!"
            </p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Pooja Nair</div>
                <div className="text-[11px] text-slate-400">Mumbai · VW Polo GT TSI</div>
              </div>
              <Badge variant="success" size="sm">Saved ₹45,000</Badge>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <Badge variant="teal">Got Questions?</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Clear answers on how SahiVahan protects your purchase.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl bg-white dark:bg-[#12181E] overflow-hidden transition-all shadow-donezo"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-[#154D3F] dark:hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 8: BOTTOM CTA BANNER (Donezo Signature Gradient) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0F382E] via-[#154D3F] to-[#0A261F] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden border border-emerald-700/40">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Inspect Your Next Car or Bike?
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm">
              Don't leave a multi-lakh rupee investment to guesswork. Book a certified inspection today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <Link to="/book/vehicle">
              <Button variant="white" size="lg" className="px-8 font-extrabold shadow-lg" rightIcon={<ArrowRight className="w-4 h-4 ml-1 text-[#154D3F]" />}>
                Book Inspection Now
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="glass" size="lg" className="px-7 font-bold">
                View Pricing Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
