import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Moon, 
  Sun,
  X,
  Navigation,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Stepper, Step } from '../../components/common/Stepper';
import { SERVICE_CITIES, TIME_SLOTS } from '../../api/mockData';
import { lookupPincode, PincodeInfo } from '../../data/pincodeData';
import { useBooking } from '../../store/BookingContext';
import { InspectionLocation, AppointmentSlot } from '../../types/booking';

interface LandmarkPreset {
  name: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
}

const POPULAR_HUBS: LandmarkPreset[] = [
  { name: 'Spinny Park Mega Hub', address: 'Survey No. 34, Bellary Road, Yelahanka', area: 'Yelahanka', city: 'Bengaluru', pincode: '560064' },
  { name: 'Cars24 Hub - HSR', address: '27th Main Rd, 1st Sector, HSR Layout', area: 'HSR Layout', city: 'Bengaluru', pincode: '560102' },
  { name: 'Auto Plaza Indiranagar', address: '100 Feet Road, HAL 2nd Stage', area: 'Indiranagar', city: 'Bengaluru', pincode: '560038' },
  { name: 'DLF Cyber City Yard', address: 'DLF Phase 2, Sector 24', area: 'Cyber City', city: 'Delhi-NCR', pincode: '122002' },
  { name: 'Bandra BKC Auto Yard', address: 'G Block, Bandra Kurla Complex', area: 'BKC', city: 'Mumbai', pincode: '400051' },
  { name: 'Hitec City Auto Market', address: 'Near Cyber Towers, Madhapur', area: 'Madhapur', city: 'Hyderabad', pincode: '500081' }
];

export const LocationStepPage: React.FC = () => {
  const navigate = useNavigate();
  const { draftBooking, updateDraftLocation, updateDraftAppointment } = useBooking();

  // Redirect if vehicle not set
  useEffect(() => {
    if (!draftBooking.vehicle) {
      navigate('/book/vehicle');
    }
  }, [draftBooking.vehicle, navigate]);

  const [city, setCity] = useState<string>(draftBooking.location?.city || 'Bengaluru');
  const [area, setArea] = useState<string>(draftBooking.location?.area || '');
  const [addressLine, setAddressLine] = useState<string>(draftBooking.location?.addressLine || '');
  const [pincode, setPincode] = useState<string>(draftBooking.location?.pincode || '560102');
  const [detectedPincodeInfo, setDetectedPincodeInfo] = useState<PincodeInfo | null>(null);

  const [sellerName, setSellerName] = useState<string>(draftBooking.location?.sellerContact?.name || '');
  const [sellerPhone, setSellerPhone] = useState<string>(draftBooking.location?.sellerContact?.phone || '');
  const [sellerRelationship, setSellerRelationship] = useState<'owner' | 'dealer' | 'agent' | 'friend'>(
    draftBooking.location?.sellerContact?.sellerRelationship || 'owner'
  );
  const [sellerAskingPrice, setSellerAskingPrice] = useState<string>(
    draftBooking.location?.sellerContact?.askingPrice
      ? String(draftBooking.location.sellerContact.askingPrice)
      : ''
  );
  const [sellerPermissionConfirmed, setSellerPermissionConfirmed] = useState<boolean>(
    draftBooking.location?.sellerContact?.sellerPermissionConfirmed ?? true
  );

  // Map Picker Modal
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  // Available dates (next 7 days starting tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowIso = tomorrow.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  const maxDateIso = maxDate.toISOString().split('T')[0];

  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(
    draftBooking.appointment?.date || availableDates[0].iso
  );

  const isCustomFutureDate = !availableDates.some((d) => d.iso === selectedDate);


  // Selected slot: either one of TIME_SLOTS or 'custom-tentative'
  const isInitialCustom = draftBooking.appointment?.slotId === 'custom-tentative';
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    draftBooking.appointment?.slotId || TIME_SLOTS[0].id
  );

  // Tentative custom time inputs
  const [customStartTime, setCustomStartTime] = useState<string>('06:30 PM');
  const [customEndTime, setCustomEndTime] = useState<string>('09:30 PM');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-fill from Pincode
  useEffect(() => {
    if (pincode.length === 6) {
      const info = lookupPincode(pincode);
      if (info) {
        setDetectedPincodeInfo(info);
        if (info.city) setCity(info.city);
        if (!area || area.trim() === '') setArea(info.area);
      } else {
        setDetectedPincodeInfo(null);
      }
    } else {
      setDetectedPincodeInfo(null);
    }
  }, [pincode]);

  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.pincode;
      return n;
    });

    if (clean.length === 6) {
      const info = lookupPincode(clean);
      if (info) {
        setDetectedPincodeInfo(info);
        setCity(info.city);
        setArea(info.area);
      }
    }
  };

  const handleSelectPreset = (hub: LandmarkPreset) => {
    setCity(hub.city);
    setArea(hub.area);
    setAddressLine(hub.address);
    setPincode(hub.pincode);
    setErrors((prev) => {
      const n = { ...prev };
      delete n.addressLine;
      delete n.pincode;
      return n;
    });
    setShowMapModal(false);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!pincode.trim() || pincode.length !== 6) newErrors.pincode = 'Valid 6-digit PIN required';
    if (!addressLine.trim()) newErrors.addressLine = 'Street address required';
    if (!sellerName.trim()) newErrors.sellerName = 'Contact name required';
    if (!sellerPhone.trim() || sellerPhone.length < 10) newErrors.sellerPhone = 'Valid 10-digit phone required';
    if (!sellerAskingPrice.trim()) newErrors.sellerAskingPrice = "Seller's quoted price required";
    if (!sellerPermissionConfirmed) newErrors.sellerPermission = 'Please confirm seller permission';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const locationData: InspectionLocation = {
      city,
      area: area || city,
      addressLine,
      pincode,
      sellerContact: {
        name: sellerName,
        phone: sellerPhone,
        sellerRelationship,
        sellerPermissionConfirmed,
        askingPrice: sellerAskingPrice ? sellerAskingPrice.replace(/,/g, '') : undefined
      },
      accessNotes: selectedSlotId === 'custom-tentative' 
        ? `Tentative Arrival: ${customStartTime} - ${customEndTime}` 
        : undefined
    };

    let appointmentData: AppointmentSlot;
    if (selectedSlotId === 'custom-tentative') {
      appointmentData = {
        date: selectedDate,
        slotWindow: `Flexible Tentative (${customStartTime} - ${customEndTime})`,
        slotId: 'custom-tentative'
      };
    } else {
      const chosen = TIME_SLOTS.find((s) => s.id === selectedSlotId) || TIME_SLOTS[0];
      appointmentData = {
        date: selectedDate,
        slotWindow: chosen.window,
        slotId: chosen.id
      };
    }

    updateDraftLocation(locationData);
    updateDraftAppointment(appointmentData);

    navigate('/book/review');
  };

  const steps: Step[] = [
    { id: 1, title: 'Vehicle' },
    { id: 2, title: 'Location & Slot' },
    { id: 3, title: 'Review' },
    { id: 4, title: 'Payment' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-5 px-4 sm:px-6 lg:px-8 space-y-5">
      {/* Sleek Minimalist Stepper */}
      <Stepper steps={steps} currentStep={2} />

      {/* Main Container - 2 Column Side-by-Side on Desktop to Eliminate Scrolling */}
      <Card className="p-5 sm:p-7 shadow-donezo border border-slate-200/90 dark:border-[#1E262E]">
        
        {/* Compact Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Location & Schedule
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify where the vehicle is parked and select your preferred arrival time.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowMapModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-[#154D3F] dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Map / Hub Presets</span>
          </button>
        </div>

        {/* 2-Column Responsive Grid (Left: Where, Right: When) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
          
          {/* LEFT COLUMN: Vehicle Location & Seller Contact (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>1. Vehicle Physical Location</span>
            </div>

            {/* Pincode & City & Area Row */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  PINCODE *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  placeholder="e.g. 560102"
                  className={`w-full px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] ${
                    errors.pincode ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-[#1E262E]'
                  }`}
                />
                {errors.pincode && (
                  <p className="text-[10px] text-red-500 mt-0.5">{errors.pincode}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                >
                  {SERVICE_CITIES.map((c) => (
                    <option key={c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Area / Suburb
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. HSR Layout"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Auto-detected pill */}
            {detectedPincodeInfo && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300">
                <span className="truncate">
                  📍 <strong>{detectedPincodeInfo.area}</strong>, {detectedPincodeInfo.city} ({detectedPincodeInfo.state})
                </span>
                <span className="font-bold text-[10px] uppercase text-emerald-700 dark:text-emerald-400 flex-shrink-0 ml-2">
                  ✓ Serviceable Zone
                </span>
              </div>
            )}

            {/* Street Address Line */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Street Address / Apartment / Parking Bay *
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => {
                  setAddressLine(e.target.value);
                  setErrors((prev) => { const n = { ...prev }; delete n.addressLine; return n; });
                }}
                placeholder="e.g. Flat #402, Oakwood Enclave, 17th Cross, 9th Main"
                className={`w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] ${
                  errors.addressLine ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-[#1E262E]'
                }`}
              />
              {errors.addressLine && (
                <p className="text-[10px] text-red-500 mt-0.5">{errors.addressLine}</p>
              )}
            </div>

            {/* Contact Details */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  2. Seller / Custodian Access Contact
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  🔒 Private & Confidential
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => {
                      setSellerName(e.target.value);
                      setErrors((prev) => { const n = { ...prev }; delete n.sellerName; return n; });
                    }}
                    placeholder="e.g. Vikas Mehta"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] ${
                      errors.sellerName ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-[#1E262E]'
                    }`}
                  />
                  {errors.sellerName && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.sellerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={sellerPhone}
                    onChange={(e) => {
                      setSellerPhone(e.target.value.replace(/\D/g, ''));
                      setErrors((prev) => { const n = { ...prev }; delete n.sellerPhone; return n; });
                    }}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] ${
                      errors.sellerPhone ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-[#1E262E]'
                    }`}
                  />
                  {errors.sellerPhone && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.sellerPhone}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Seller Asking Price & Relationship */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Seller Quoted Price *
                    </label>
                    {sellerAskingPrice && !isNaN(Number(sellerAskingPrice.replace(/,/g, ''))) && Number(sellerAskingPrice.replace(/,/g, '')) > 0 && (
                      <span className="text-[10px] font-bold text-[#154D3F] dark:text-emerald-400">
                        {Number(sellerAskingPrice.replace(/,/g, '')) >= 100000 
                          ? `₹${(Number(sellerAskingPrice.replace(/,/g, '')) / 100000).toFixed(2)} Lakh` 
                          : `₹${Number(sellerAskingPrice.replace(/,/g, '')).toLocaleString('en-IN')}`}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="text"
                      value={sellerAskingPrice}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d]/g, '');
                        setSellerAskingPrice(val ? Number(val).toLocaleString('en-IN') : '');
                        setErrors((prev) => { const n = { ...prev }; delete n.sellerAskingPrice; return n; });
                      }}
                      placeholder="e.g. 5,75,000"
                      className={`w-full pl-7 pr-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] ${
                        errors.sellerAskingPrice ? 'border-red-500 bg-red-50' : 'border-slate-200 dark:border-[#1E262E]'
                      }`}
                    />
                  </div>
                  {errors.sellerAskingPrice && (
                    <p className="text-[10px] text-red-500 mt-0.5">{errors.sellerAskingPrice}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Seller Relationship
                  </label>
                  <select
                    value={sellerRelationship}
                    onChange={(e: any) => setSellerRelationship(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F]"
                  >
                    <option value="owner">Direct Individual Owner</option>
                    <option value="dealer">Used Car Dealer / Showroom</option>
                    <option value="agent">Broker / Commission Agent</option>
                    <option value="friend">Friend / Relative of Owner</option>
                  </select>
                </div>
              </div>

              {/* Permission Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sellerPermissionConfirmed}
                    onChange={(e) => {
                      setSellerPermissionConfirmed(e.target.checked);
                      setErrors((prev) => { const n = { ...prev }; delete n.sellerPermission; return n; });
                    }}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#154D3F] focus:ring-[#154D3F]"
                  />
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    I confirm seller agrees to doorstep physical diagnostic inspection. *
                  </span>
                </label>
                {errors.sellerPermission && (
                  <p className="text-[10px] text-red-500 mt-1 pl-6">{errors.sellerPermission}</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Date & Time Slot Selection (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-slate-100 dark:lg:border-slate-800 lg:pl-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <span>3. Appointment Slot</span>
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                7 Days Available
              </span>
            </div>

            {/* Compact 7-Day Date Carousel & Future Date Option */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                  Select Date
                </label>
                {isCustomFutureDate && (
                  <span className="text-[10px] font-bold text-[#154D3F] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    Custom: {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.iso;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setSelectedDate(d.iso)}
                      className={`py-2 px-1 rounded-xl text-center transition-all ${
                        isSelected
                          ? 'bg-[#154D3F] text-white shadow-xs font-bold'
                          : 'bg-slate-100 dark:bg-[#0A0E12] text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <div className="text-[9px] uppercase font-semibold opacity-75">{d.dayName}</div>
                      <div className="text-xs font-black mt-0.5">{d.dateNum}</div>
                    </button>
                  );
                })}
              </div>

              {/* Extended Future Date Picker */}
              <div className="mt-2 p-2 rounded-xl bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-[11px]">Or pick any future date:</span>
                </div>
                <input
                  type="date"
                  min={tomorrowIso}
                  max={maxDateIso}
                  value={selectedDate}
                  onChange={(e) => {
                    if (e.target.value) setSelectedDate(e.target.value);
                  }}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#12181E] text-slate-900 dark:text-white cursor-pointer hover:border-[#154D3F] focus:outline-none focus:ring-1 focus:ring-[#154D3F]"
                />
              </div>
            </div>

            {/* Time Slot Choices */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase">
                Arrival Window
              </label>

              <div className="space-y-1.5">
                {/* 4 Standard Daytime Slots */}
                {TIME_SLOTS.slice(0, 4).map((slot) => {
                  const isSelected = selectedSlotId === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSlotId(slot.id)}
                      className={`w-full px-3 py-2 rounded-xl text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#154D3F] dark:border-emerald-500 bg-[#154D3F]/10 dark:bg-emerald-500/15 text-[#154D3F] dark:text-emerald-300 font-bold ring-1 ring-[#154D3F]/20'
                          : 'border-slate-200 dark:border-[#1E262E] hover:border-slate-300 text-slate-700 dark:text-slate-300 text-xs'
                      }`}
                    >
                      <span className="text-xs">{slot.label}</span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{slot.window}</span>
                    </button>
                  );
                })}

                {/* Night Slot (Slot 5) */}
                {TIME_SLOTS[4] && (
                  <button
                    type="button"
                    onClick={() => setSelectedSlotId(TIME_SLOTS[4].id)}
                    className={`w-full px-3 py-2 rounded-xl text-left border flex items-center justify-between transition-all ${
                      selectedSlotId === TIME_SLOTS[4].id
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-300 font-bold ring-1 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-[#1E262E] hover:border-indigo-300 text-slate-700 dark:text-slate-300 text-xs'
                    }`}
                  >
                    <span className="text-xs flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-bold">
                      <Moon className="w-3.5 h-3.5" />
                      Night Slot (Floodlight Equipped)
                    </span>
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">07:30 PM - 10:00 PM</span>
                  </button>
                )}

                {/* Custom / Flexible Tentative Window Option */}
                <button
                  type="button"
                  onClick={() => setSelectedSlotId('custom-tentative')}
                  className={`w-full px-3 py-2 rounded-xl text-left border flex items-center justify-between transition-all ${
                    selectedSlotId === 'custom-tentative'
                      ? 'border-[#154D3F] dark:border-emerald-500 bg-[#154D3F]/10 dark:bg-emerald-500/15 text-[#154D3F] dark:text-emerald-300 font-bold ring-1 ring-[#154D3F]/20'
                      : 'border-slate-200 dark:border-[#1E262E] hover:border-slate-300 text-slate-700 dark:text-slate-300 text-xs'
                  }`}
                >
                  <span className="text-xs flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    Custom / Tentative Time Span
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Flexible</span>
                </button>
              </div>

              {/* Inline Custom Time Span controls if selected */}
              {selectedSlotId === 'custom-tentative' && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] space-y-2 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-0.5">Earliest Arrival</span>
                      <select
                        value={customStartTime}
                        onChange={(e) => setCustomStartTime(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
                      >
                        <option value="05:30 PM">05:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                        <option value="06:30 PM">06:30 PM</option>
                        <option value="07:00 PM">07:00 PM</option>
                        <option value="07:30 PM">07:30 PM</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-0.5">Latest Arrival</span>
                      <select
                        value={customEndTime}
                        onChange={(e) => setCustomEndTime(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold"
                      >
                        <option value="08:00 PM">08:00 PM</option>
                        <option value="08:30 PM">08:30 PM</option>
                        <option value="09:00 PM">09:00 PM</option>
                        <option value="09:30 PM">09:30 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Specialist will call 30 mins prior to arrival to confirm seller availability.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/book/vehicle')}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Back: Vehicle
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="font-bold px-6 shadow-md"
          >
            Next: Review & Pricing
          </Button>
        </div>

      </Card>

      {/* Map Presets Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Pick Major Dealer Hub / Auto Yard
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMapModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {POPULAR_HUBS.map((hub, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectPreset(hub)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50 dark:bg-[#0A0E12] cursor-pointer transition-all text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{hub.name}</span>
                    <span className="text-[10px] text-emerald-600 font-mono">{hub.pincode}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{hub.address}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setShowMapModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
