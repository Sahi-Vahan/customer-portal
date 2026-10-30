import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Car, 
  Bike, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  FileText,
  ExternalLink,
  Clock,
  Sparkles,
  HelpCircle,
  CreditCard,
  Lock,
  User,
  LogIn,
  X,
  Phone
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Stepper, Step } from '../../components/common/Stepper';
import { useBooking } from '../../store/BookingContext';
import { useAuth } from '../../store/AuthContext';

export const ReviewStepPage: React.FC = () => {
  const navigate = useNavigate();
  const { draftBooking, calculateAndSetPricing, setTermsAccepted } = useBooking();
  const { isAuthenticated, customer, login } = useAuth();
  
  const [agreed, setAgreed] = useState(draftBooking.termsAccepted || false);
  const [error, setError] = useState('');
  
  // Auth gate modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPhone, setAuthPhone] = useState(customer?.phone ? customer.phone.replace('+91 ', '') : '9876543210');
  const [authName, setAuthName] = useState(customer?.fullName || 'Rahul Sharma');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Validate prerequisite steps
  useEffect(() => {
    if (!draftBooking.vehicle) {
      navigate('/book/vehicle');
    } else if (!draftBooking.location || !draftBooking.appointment) {
      navigate('/book/location');
    } else {
      calculateAndSetPricing();
    }
  }, [draftBooking.vehicle, draftBooking.location, draftBooking.appointment, navigate]);

  if (!draftBooking.vehicle || !draftBooking.location || !draftBooking.appointment || !draftBooking.pricing) {
    return null;
  }

  const { vehicle, location, appointment, pricing } = draftBooking;
  const { breakdown } = pricing;

  const handleProceed = () => {
    if (!agreed) {
      setError('Please accept the SahiVahan Terms of Service and Cancellation Policy to proceed.');
      return;
    }
    setError('');
    setTermsAccepted(true);

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    navigate('/checkout');
  };

  const handleAuthVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!authPhone || authPhone.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    setTimeout(async () => {
      await login(authPhone, authName);
      setAuthLoading(false);
      setShowAuthModal(false);
      navigate('/checkout');
    }, 400);
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
      <Stepper steps={steps} currentStep={3} />

      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Review Booking & Price Breakdown
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Review your inspection schedule, vehicle details, and cancellation safeguards before proceeding to payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Summary of Vehicle, Location & Cancellation Schedule */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Vehicle Card */}
          <Card className="space-y-4 p-6 shadow-donezo border border-slate-200/90 dark:border-[#1E262E]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center">
                  {vehicle.type === 'car' ? <Car className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Vehicle to Inspect</h3>
                  <span className="text-[11px] text-slate-400">Diagnostic scope verified</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/book/vehicle')}
                className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 hover:underline px-2.5 py-1 rounded-lg bg-[#154D3F]/5 dark:bg-emerald-500/10"
              >
                Edit
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Make & Model</span>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">
                  {vehicle.make} {vehicle.model}
                </div>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Variant & Year</span>
                <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                  {vehicle.variant} ({vehicle.manufacturingYear})
                </div>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Fuel & Transmission</span>
                <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {vehicle.fuelType} · {vehicle.transmission}
                </div>
              </div>
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Complexity Tier</span>
                <div className="mt-0.5">
                  <Badge 
                    variant={vehicle.complexity === 'luxury_or_specialist' ? 'warning' : vehicle.complexity === 'complex' ? 'teal' : 'neutral'} 
                    size="sm"
                  >
                    {vehicle.complexity === 'luxury_or_specialist' 
                      ? 'Luxury (250+ Pts)' 
                      : vehicle.complexity === 'complex' 
                      ? 'Complex SUV/Turbo (220+ Pts)' 
                      : 'Standard (200+ Pts)'}
                  </Badge>
                </div>
              </div>
            </div>

            {vehicle.registrationNumber && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Reg. / VIN Reference:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white tracking-wider">
                  {vehicle.registrationNumber}
                </span>
              </div>
            )}
          </Card>

          {/* Location & Appointment Card */}
          <Card className="space-y-4 p-6 shadow-donezo border border-slate-200/90 dark:border-[#1E262E]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Inspection Schedule & Address</h3>
                  <span className="text-[11px] text-slate-400">Doorstep physical coordinates</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/book/location')}
                className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 hover:underline px-2.5 py-1 rounded-lg bg-[#154D3F]/5 dark:bg-emerald-500/10"
              >
                Edit
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Appointment Date & Window</span>
                <div className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    {appointment.slotWindow}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Doorstep Address</span>
                <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed">
                  {location.addressLine}, {location.area}, {location.city} - <span className="font-bold">{location.pincode}</span>
                  {location.landmark && <span className="text-slate-500 dark:text-slate-400 ml-1">({location.landmark})</span>}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Seller / Key Contact</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {location.sellerContact.name} ({location.sellerContact.sellerRelationship})
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Private Phone</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    +91 {location.sellerContact.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
                  </div>
                </div>
              </div>

              {location.sellerContact.askingPrice && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Seller Quoted Vehicle Price:</span>
                  <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-[#0A0E12] px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-800">
                    ₹{isNaN(Number(location.sellerContact.askingPrice)) 
                      ? location.sellerContact.askingPrice 
                      : Number(location.sellerContact.askingPrice).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
          </Card>



        </div>

        {/* Right Column: Pricing Breakdown & Checkout Trigger */}
        <div className="lg:col-span-5 space-y-6">
          
          <Card className="p-6 sm:p-7 space-y-5 shadow-donezo border border-slate-200/90 dark:border-[#1E262E]">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Price Summary</span>
              <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Base Pre-Purchase Inspection ({vehicle.type === 'car' ? '200+ Pts' : '120+ Pts'})</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{breakdown.basePrice.toFixed(2)}</span>
              </div>

              {breakdown.complexitySurcharge > 0 && (
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Vehicle Complexity Surcharge ({vehicle.complexity})</span>
                  <span className="font-semibold text-slate-900 dark:text-white">+ ₹{breakdown.complexitySurcharge.toFixed(2)}</span>
                </div>
              )}

              {breakdown.travelZoneFee > 0 && (
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>Travel Zone Distance Allowance</span>
                  <span className="font-semibold text-slate-900 dark:text-white">+ ₹{breakdown.travelZoneFee.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Taxable Amount</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">₹{breakdown.taxableAmount.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>GST ({breakdown.gstRatePercent}%)</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">₹{breakdown.gstAmount.toFixed(2)}</span>
              </div>

              {breakdown.discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Promotional Discount</span>
                  <span>- ₹{breakdown.discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t-2 border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">Total Payable</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{breakdown.totalPayableAmount.toFixed(2)}
                  </span>
                </div>
                <Badge variant="teal" size="md">All Taxes Included</Badge>
              </div>
            </div>

            {/* Inclusions summary list */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <div className="font-bold text-slate-700 dark:text-slate-300">Package Inclusions:</div>
              {pricing.inclusions.slice(0, 3).map((inc, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>

            {/* Terms and Privacy Acceptance with Direct Clickable Links */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (e.target.checked) setError('');
                  }}
                  className="w-4 h-4 mt-1 rounded border-slate-300 text-[#154D3F] focus:ring-[#154D3F]"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  I agree to the SahiVahan{' '}
                  <Link 
                    to="/terms" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-[#154D3F] dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700"
                  >
                    Terms of Service
                  </Link>
                  {', '}
                  <Link 
                    to="/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-[#154D3F] dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700"
                  >
                    Privacy Notice
                  </Link>
                  {', and the '}
                  <Link 
                    to="/cancellation-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold text-[#154D3F] dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700"
                  >
                    Cancellation & Refund Policy
                  </Link>
                  . <span className="text-red-500">*</span>
                </span>
              </label>
              {error && (
                <p className="text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1 font-medium pl-6">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>

            {/* Action Buttons: Proceed and Back */}
            <div className="space-y-2.5 pt-1">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-lg font-bold py-3.5 text-base"
                onClick={handleProceed}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Secure Payment
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full justify-center font-bold text-xs"
                onClick={() => navigate('/book/location')}
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Back: Edit Location & Slot
              </Button>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Escrow Protected Payouts
              </span>
              <span>•</span>
              <span>Zero-Hassle Rescheduling</span>
            </div>
          </Card>

        </div>

      </div>

      {/* Auth Modal: Prompt login before proceeding to payment */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 text-left">
              <div className="w-11 h-11 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Sign In Required Before Payment
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Please verify your account to securely link this 200+ point inspection report, receive live specialist arrival tracking, and confirm your booking.
              </p>
            </div>

            <form onSubmit={handleAuthVerify} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Mobile Number (For WhatsApp & SMS Report Dispatch)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <div className="absolute left-9 top-2.5 text-xs font-bold text-slate-500">+91</div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="98765 43210"
                    className="w-full pl-[62px] pr-3 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F]"
                  />
                </div>
              </div>

              {authError && (
                <p className="text-[11px] text-red-500 font-medium">{authError}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={authLoading}
                className="w-full justify-center font-bold py-2.5 shadow-md text-xs"
              >
                <LogIn className="w-4 h-4 mr-1.5" /> Verify & Continue to Payment
              </Button>

              <div className="text-center pt-1">
                <Link
                  to="/login"
                  state={{ from: { pathname: '/checkout' } }}
                  className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white underline"
                >
                  Or sign in with existing password / email
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
