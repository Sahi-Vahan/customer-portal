import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, QrCode, Building2, CheckCircle2, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Stepper } from '../../components/common/Stepper';
import { useBooking } from '../../store/BookingContext';
import { useAuth } from '../../store/AuthContext';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { draftBooking, completePaymentAndCreateBooking } = useBooking();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!draftBooking.vehicle || !draftBooking.location || !draftBooking.appointment || !draftBooking.pricing) {
      navigate('/book/vehicle');
    } else if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  }, [draftBooking, isAuthenticated, navigate]);

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('customer@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [bank, setBank] = useState('HDFC Bank');

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  if (!draftBooking.pricing) return null;
  const totalAmount = draftBooking.pricing.breakdown.totalPayableAmount;

  const handlePay = async (simulateFailure = false) => {
    setIsProcessing(true);
    setPaymentError(null);

    // Simulate gateway handoff latency
    setTimeout(async () => {
      if (simulateFailure) {
        setIsProcessing(false);
        setPaymentError('Bank Gateway Error: The acquiring bank declined the transaction (Simulated Gateway Failure). Your card has not been charged. You can retry safely.');
        return;
      }

      try {
        const methodDesc = paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'card' ? 'Credit Card (Visa)' : `Net Banking (${bank})`;
        const newBooking = await completePaymentAndCreateBooking(methodDesc);
        setIsProcessing(false);
        navigate(`/booking/${newBooking.id}/confirmation`);
      } catch (err: any) {
        setIsProcessing(false);
        setPaymentError(err?.message || 'Payment verification failed. Please try again.');
      }
    }, 1500);
  };

  const steps = [
    { id: 1, title: 'Vehicle' },
    { id: 2, title: 'Location & Slot' },
    { id: 3, title: 'Review & Policy' },
    { id: 4, title: 'Payment' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Navigation Row with Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/book/review')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12181E] text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Back to Review & Details</span>
        </button>
        <span className="text-xs text-slate-400 font-semibold">Step 4 of 4</span>
      </div>

      <Stepper steps={steps} currentStep={4} />

      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Secure Payment Gateway
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Complete your payment to confirm specialist assignment and dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Payment Method Selection */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6 shadow-donezo">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Select Payment Instrument</h3>
              <div className="flex items-center gap-1.5 text-[11px] text-[#154D3F] dark:text-emerald-400 bg-[#154D3F]/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full font-medium">
                <Lock className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" /> 256-Bit SSL Encrypted
              </div>
            </div>

            {/* Instrument Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-[#0A0E12] rounded-2xl border border-slate-200 dark:border-[#1E262E]">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-white dark:bg-[#12181E] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-[#1E262E]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> UPI
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-white dark:bg-[#12181E] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-[#1E262E]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Cards
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'bg-white dark:bg-[#12181E] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-[#1E262E]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> NetBanking
              </button>
            </div>

            {/* Instrument Details */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Enter UPI VPA / ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@okhdfcbank"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Badge variant="neutral" size="sm">Google Pay</Badge>
                  <Badge variant="neutral" size="sm">PhonePe</Badge>
                  <Badge variant="neutral" size="sm">Paytm UPI</Badge>
                  <Badge variant="neutral" size="sm">BHIM</Badge>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Valid Thru</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Select Bank</label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Error Message if failure simulated */}
            {paymentError && (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                  <span>Payment Unsuccessful</span>
                </div>
                <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">{paymentError}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePay(false)}
                  className="text-xs mt-1"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry Payment Safely
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <Button
                variant="primary"
                size="lg"
                isLoading={isProcessing}
                onClick={() => handlePay(false)}
                className="w-full justify-center shadow-md text-base font-bold py-3.5"
              >
                Pay ₹{totalAmount.toFixed(2)} & Confirm Booking
              </Button>

              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => navigate('/book/review')}
                disabled={isProcessing}
                className="w-full justify-center font-bold text-xs"
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              >
                Back to Review Step
              </Button>

              {/* Developer Test Trigger for Failure */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handlePay(true)}
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline"
                >
                  (Dev Test: Simulate Gateway Rejection & Retry Flow)
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Order Summary Reminder */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="bg-slate-50 dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] p-6 space-y-4 text-xs shadow-donezo">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-200 dark:border-slate-800 pb-2">
              Order Snapshot
            </h4>
            
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Vehicle:</span>
                <span className="font-bold text-slate-900 dark:text-white">{draftBooking.vehicle?.make} {draftBooking.vehicle?.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Date:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{draftBooking.appointment?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Time Window:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{draftBooking.appointment?.slotWindow}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">City / Location:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{draftBooking.location?.city} ({draftBooking.location?.pincode})</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-900 dark:text-white">Total Payable:</span>
              <span className="text-xl font-black text-[#154D3F] dark:text-emerald-400">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Full refund guarantee if cancelled before specialist assignment.</span>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
