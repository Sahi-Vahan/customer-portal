import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Car, 
  Bike, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Stepper, Step } from '../../components/common/Stepper';
import { 
  getMakesByType, 
  getModelsByMake, 
  getVariantsByModel 
} from '../../data/vehicleCatalog';
import { useBooking } from '../../store/BookingContext';
import { VehicleType, FuelType, TransmissionType, ComplexityLevel } from '../../types/vehicle';

export const VehicleStepPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { draftBooking, updateDraftVehicle } = useBooking();

  const queryType = searchParams.get('type') === 'bike' ? 'bike' : (searchParams.get('type') === 'car' ? 'car' : null);
  const [vehicleType, setVehicleType] = useState<VehicleType>(queryType || draftBooking.vehicle?.type || 'car');

  useEffect(() => {
    if (queryType && queryType !== vehicleType) {
      setVehicleType(queryType);
    }
  }, [queryType]);
  const [selectedMake, setSelectedMake] = useState<string>(draftBooking.vehicle?.make || '');
  const [selectedModel, setSelectedModel] = useState<string>(draftBooking.vehicle?.model || '');
  const [selectedVariant, setSelectedVariant] = useState<string>(draftBooking.vehicle?.variant || '');
  const [year, setYear] = useState<number>(draftBooking.vehicle?.manufacturingYear || 2022);
  const [fuelType, setFuelType] = useState<FuelType>(draftBooking.vehicle?.fuelType || 'Petrol');
  const [transmission, setTransmission] = useState<TransmissionType>(draftBooking.vehicle?.transmission || 'Manual');
  const [registrationNumber, setRegistrationNumber] = useState<string>(draftBooking.vehicle?.registrationNumber || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Dynamic catalog lists
  const availableMakes = getMakesByType(vehicleType);
  const availableModels = selectedMake ? getModelsByMake(vehicleType, selectedMake) : [];
  const availableVariants = (selectedMake && selectedModel) ? getVariantsByModel(vehicleType, selectedMake, selectedModel) : [];

  // When type changes, reset selections cleanly
  const handleTypeChange = (type: VehicleType) => {
    setVehicleType(type);
    setSelectedMake('');
    setSelectedModel('');
    setSelectedVariant('');
    setFuelType('Petrol');
    setTransmission('Manual');
    setErrors({});
  };

  // When make changes: reset model & variant, clear make error immediately
  const handleMakeChange = (makeName: string) => {
    setSelectedMake(makeName);
    setSelectedModel('');
    setSelectedVariant('');
    setErrors((prev) => {
      const next = { ...prev };
      delete next.make;
      return next;
    });
  };

  // When model changes: populate variants and auto-select first variant
  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.model;
      return next;
    });

    const variants = getVariantsByModel(vehicleType, selectedMake, modelName);
    if (variants.length > 0) {
      const first = variants[0];
      setSelectedVariant(first.name);
      setFuelType(first.fuelType);
      setTransmission(first.transmission);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.variant;
        return next;
      });
    } else {
      setSelectedVariant('');
    }
  };

  // When variant changes: update fuel/transmission/complexity and clear variant error immediately
  const handleVariantChange = (variantName: string) => {
    setSelectedVariant(variantName);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.variant;
      return next;
    });

    const vObj = availableVariants.find((v) => v.name === variantName);
    if (vObj) {
      setFuelType(vObj.fuelType);
      setTransmission(vObj.transmission);
    }
  };

  // Dynamic complexity calculation
  const calculateComplexity = (): ComplexityLevel => {
    if (['BMW', 'Mercedes-Benz', 'Audi', 'Jaguar', 'Porsche', 'Volvo'].includes(selectedMake)) {
      return 'luxury_or_specialist';
    }
    const foundVar = availableVariants.find((v) => v.name === selectedVariant);
    if (foundVar?.complexity) {
      return foundVar.complexity;
    }
    const isSUVOrTurbo = ['XUV700', 'Thar', 'Scorpio-N', 'Creta', 'Seltos', 'Harrier', 'Safari', 'Fortuner', 'Innova Crysta / Hycross', 'Taigun', 'Virtus', 'Duke 390', 'Himalayan 450', 'Ather 450X'].includes(selectedModel);
    const isHighTechPowertrain = transmission === 'DCT/DSG' || fuelType === 'Electric' || fuelType === 'Hybrid';

    if (isSUVOrTurbo || isHighTechPowertrain) {
      return 'complex';
    }
    return 'standard';
  };

  const currentComplexity = calculateComplexity();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!selectedMake) newErrors.make = 'Please choose a brand / make.';
    if (!selectedModel) newErrors.model = 'Please choose a model.';
    if (!selectedVariant) newErrors.variant = 'Please choose a variant.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    updateDraftVehicle({
      type: vehicleType,
      make: selectedMake,
      model: selectedModel,
      variant: selectedVariant,
      manufacturingYear: year,
      fuelType,
      transmission,
      registrationNumber: registrationNumber.toUpperCase().trim(),
      complexity: currentComplexity
    });

    navigate('/book/location');
  };

  const steps: Step[] = [
    { id: 1, title: 'Vehicle' },
    { id: 2, title: 'Location & Slot' },
    { id: 3, title: 'Review' },
    { id: 4, title: 'Payment' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-5 px-4 sm:px-6 lg:px-8 space-y-5">
      {/* Sleek Minimalist Stepper */}
      <Stepper steps={steps} currentStep={1} />

      {/* Main Compact Card (Fits in Viewport Without Scrolling) */}
      <Card className="p-5 sm:p-7 space-y-5 shadow-donezo border border-slate-200/90 dark:border-[#1E262E]">
        
        {/* Header & Category Switch in one compact row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Vehicle Information
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select your vehicle details to auto-configure diagnostic equipment.
            </p>
          </div>

          {/* Compact Category Switch Pills */}
          <div className="flex items-center bg-slate-100 dark:bg-[#0A0E12] p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800 self-start sm:self-center">
            <button
              type="button"
              onClick={() => handleTypeChange('car')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                vehicleType === 'car'
                  ? 'bg-[#154D3F] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Car (4W) · ₹1,999</span>
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('bike')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                vehicleType === 'bike'
                  ? 'bg-[#154D3F] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Bike (2W) · ₹999</span>
            </button>
          </div>
        </div>

        {/* Row 1: Cascading Dropdowns (Brand -> Model -> Variant) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Make / Brand */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Brand / Make <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedMake}
                onChange={(e) => handleMakeChange(e.target.value)}
                className={`w-full appearance-none px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors pr-8 ${
                  errors.make ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-slate-200 dark:border-[#1E262E]'
                }`}
              >
                <option value="">-- Choose Brand --</option>
                {availableMakes.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.make && (
              <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.make}
              </p>
            )}
          </div>

          {/* Model */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Model <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
                disabled={!selectedMake}
                className={`w-full appearance-none px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors pr-8 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.model ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-slate-200 dark:border-[#1E262E]'
                }`}
              >
                <option value="">
                  {selectedMake ? '-- Choose Model --' : '-- Choose Brand First --'}
                </option>
                {availableModels.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} ({m.bodyType})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.model && (
              <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.model}
              </p>
            )}
          </div>

          {/* Variant */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Trim / Variant <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedVariant}
                onChange={(e) => handleVariantChange(e.target.value)}
                disabled={!selectedModel}
                className={`w-full appearance-none px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors pr-8 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.variant ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-slate-200 dark:border-[#1E262E]'
                }`}
              >
                <option value="">
                  {selectedModel ? '-- Choose Variant --' : '-- Choose Model First --'}
                </option>
                {availableVariants.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} · {v.transmission}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.variant && (
              <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                {errors.variant}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Compact Secondary Specs (Year, Fuel, Transmission, Reg No) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Year
            </label>
            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full appearance-none px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] pr-7"
              >
                {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Fuel
            </label>
            <div className="relative">
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as FuelType)}
                className="w-full appearance-none px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] pr-7"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric (EV)</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Transmission
            </label>
            <div className="relative">
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                className="w-full appearance-none px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] pr-7"
              >
                <option value="Manual">Manual (MT)</option>
                <option value="Automatic">Automatic (AT)</option>
                <option value="AMT">AMT</option>
                <option value="CVT">CVT / IVT</option>
                <option value="DCT/DSG">DCT / DSG</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Reg. No. <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="e.g. KA 03 MX 4921"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F]"
            />
          </div>
        </div>

        {/* Compact Single-Line Complexity Tier Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#0A0E12] border border-slate-200/90 dark:border-[#1E262E]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="text-xs text-slate-500 dark:text-slate-400">Applicable Tier:</span>
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {currentComplexity === 'luxury_or_specialist'
                ? 'Luxury European Tier (250+ Pts)'
                : currentComplexity === 'complex'
                ? 'Complex SUV / Turbo / DCT Tier (220+ Pts)'
                : vehicleType === 'car'
                ? 'Standard Inspection Tier (200+ Pts)'
                : 'Standard 2-Wheeler Tier (120+ Pts)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              Includes OBD scan & paint meter
            </span>
            <Badge 
              variant={currentComplexity === 'luxury_or_specialist' ? 'warning' : currentComplexity === 'complex' ? 'teal' : 'neutral'} 
              size="sm"
            >
              {currentComplexity}
            </Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            Cancel
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="font-bold px-6 shadow-md"
          >
            Next: Location & Slot
          </Button>
        </div>

      </Card>
    </div>
  );
};
