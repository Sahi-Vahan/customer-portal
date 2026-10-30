import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Bike,
  ShieldCheck,
  UserCheck,
  Camera,
  FileText,
  AlertTriangle,
  RotateCcw,
  XCircle,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { useBooking } from '../../store/BookingContext';
import { TIME_SLOTS } from '../../api/mockData';
import { BookingStatus } from '../../types/booking';

export const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookingById, cancelBooking, rescheduleBooking } = useBooking();

  const booking = getBookingById(id || '');

  // Modal States
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Change of purchase plans / Vehicle already sold');
  const [cancelResult, setCancelResult] = useState<{ refundAmount: number; feeDeducted: number } | null>(null);

  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newSlotId, setNewSlotId] = useState(TIME_SLOTS[0].id);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);

  if (!booking) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-900">Booking Record Not Found</h2>
        <Link to="/account/bookings">
          <Button variant="primary" size="md">Back to My Bookings</Button>
        </Link>
      </div>
    );
  }

  // Define 7-stage lifecycle
  const timelineStages: { key: BookingStatus; label: string; desc: string }[] = [
    { key: 'confirmed', label: 'Payment Confirmed', desc: 'Order received and logged' },
    { key: 'assigned', label: 'Specialist Assigned', desc: 'Technician matched to vehicle' },
    { key: 'en_route', label: 'Specialist En Route', desc: 'Traveling to location' },
    { key: 'arrived', label: 'Arrived on Site', desc: 'Visit proof verified' },
    { key: 'inspecting', label: 'Inspection In Progress', desc: '200+ point checks active' },
    { key: 'report_submitted', label: 'Report Generated', desc: 'Checklist completed' },
    { key: 'completed', label: 'Completed', desc: 'Report delivered to customer' }
  ];

  const getStageIndex = (status: BookingStatus) => {
    switch (status) {
      case 'awaiting_payment':
      case 'draft':
        return -1;
      case 'confirmed':
      case 'awaiting_assignment':
        return 0;
      case 'assigned':
      case 'accepted':
        return 1;
      case 'en_route':
        return 2;
      case 'arrived':
        return 3;
      case 'inspecting':
        return 4;
      case 'report_submitted':
        return 5;
      case 'completed':
        return 6;
      case 'cancelled':
        return -2;
      default:
        return 0;
    }
  };

  const currentStageIdx = getStageIndex(booking.status);

  // Cancellation Fee Preview calculation
  const totalPaid = booking.pricing.breakdown.totalPayableAmount;
  let estimatedRefund = totalPaid;
  let estimatedFee = 0;

  if (booking.status === 'awaiting_assignment') {
    estimatedRefund = totalPaid;
    estimatedFee = 0;
  } else if (booking.status === 'assigned' || booking.status === 'accepted') {
    estimatedFee = 150;
    estimatedRefund = Math.max(0, totalPaid - estimatedFee);
  } else if (booking.status === 'en_route' || booking.status === 'arrived') {
    estimatedFee = Number((totalPaid * 0.5).toFixed(2));
    estimatedRefund = Math.max(0, totalPaid - estimatedFee);
  } else if (booking.status === 'inspecting' || booking.status === 'report_submitted' || booking.status === 'completed') {
    estimatedFee = totalPaid;
    estimatedRefund = 0;
  }

  const handleConfirmCancel = () => {
    const res = cancelBooking(booking.id, cancelReason);
    setCancelResult({ refundAmount: res.refundAmount, feeDeducted: res.feeDeducted });
  };

  const handleConfirmReschedule = () => {
    if (!newDate) return;
    const chosenSlot = TIME_SLOTS.find((s) => s.id === newSlotId) || TIME_SLOTS[0];
    const success = rescheduleBooking(booking.id, newDate, {
      date: newDate,
      slotWindow: chosenSlot.window,
      slotId: chosenSlot.id
    });
    if (success) {
      setRescheduleSuccess(true);
      setTimeout(() => {
        setRescheduleSuccess(false);
        setRescheduleModalOpen(false);
      }, 1500);
    }
  };

  // Next 7 days for reschedule
  const availableRescheduleDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/account/bookings" className="text-xs font-semibold text-[#154D3F] dark:text-emerald-400 hover:underline flex items-center gap-1">
          ← Back to My Bookings
        </Link>
        <span className="text-xs text-slate-400 font-mono">Booking Ref: {booking.id}</span>
      </div>

      {/* Main Status Header Card */}
      <Card className="p-6 sm:p-8 space-y-6 shadow-donezo">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#154D3F] dark:text-emerald-400 bg-[#154D3F]/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full text-xs">
                {booking.id}
              </span>
              {booking.status === 'cancelled' ? (
                <Badge variant="danger">Cancelled</Badge>
              ) : booking.status === 'completed' ? (
                <Badge variant="success">Inspection Completed</Badge>
              ) : (
                <Badge variant="teal">Live Appointment Active</Badge>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pt-1">
              {booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.variant})
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Scheduled for {new Date(booking.appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} · {booking.appointment.slotWindow}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {booking.status === 'completed' && booking.report && (
              <Link to={`/account/bookings/${booking.id}/report`}>
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  <FileText className="w-4 h-4 mr-1.5" /> View Full Report
                </Button>
              </Link>
            )}

            {booking.status !== 'completed' && booking.status !== 'cancelled' && (
              <>
                <Button variant="outline" size="sm" onClick={() => setRescheduleModalOpen(true)}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reschedule
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setCancelModalOpen(true)} className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                  <XCircle className="w-3.5 h-3.5 mr-1.5" /> Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* 7-Stage Status Timeline Tracker */}
        {booking.status !== 'cancelled' ? (
          <div className="py-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Live Fulfillment Timeline</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {timelineStages.map((stage, sIdx) => {
                const isPassed = sIdx < currentStageIdx;
                const isCurrent = sIdx === currentStageIdx;

                return (
                  <div
                    key={stage.key}
                    className={`p-3 rounded-2xl border flex flex-col justify-between transition-all ${
                      isCurrent
                        ? 'bg-[#154D3F]/10 dark:bg-emerald-500/20 border-[#154D3F] dark:border-emerald-500 shadow-sm ring-2 ring-[#154D3F]/20'
                        : isPassed
                        ? 'bg-slate-50 dark:bg-[#0A0E12] border-emerald-500/30'
                        : 'bg-white dark:bg-[#12181E] border-slate-200 dark:border-[#1E262E] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-[#154D3F] dark:bg-emerald-500 text-white'
                          : isPassed
                          ? 'bg-emerald-600 dark:bg-emerald-400 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {isPassed ? '✓' : sIdx + 1}
                      </span>
                      {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isCurrent ? 'text-[#154D3F] dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>
                        {stage.label}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{stage.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-2xl p-4 text-xs text-rose-900 dark:text-rose-300 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Booking Cancelled
            </div>
            <p>Reason: {booking.cancellationDetails?.reason || 'Customer request'}</p>
            <p>Refund: ₹{booking.cancellationDetails?.refundAmount?.toFixed(2)} (Status: {booking.cancellationDetails?.refundStatus})</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Specialist Card & Visit Evidence */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Assigned Specialist Card */}
          {booking.specialist ? (
            <Card className="p-6 space-y-4 shadow-donezo">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Assigned Technical Specialist</h3>
                </div>
                <Badge variant="success" size="sm">Verified Specialist</Badge>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src={booking.specialist.avatarUrl}
                  alt={booking.specialist.fullName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{booking.specialist.fullName}</h4>
                  <div className="text-slate-500 dark:text-slate-400">Badge ID: <strong className="text-slate-700 dark:text-slate-300">{booking.specialist.badgeNumber}</strong></div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                    <span>⭐ {booking.specialist.rating} ({booking.specialist.inspectionsCompleted} Completed)</span>
                    <span>·</span>
                    <span>{booking.specialist.yearsExperience} Yrs Exp</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-[#0A0E12] p-3 rounded-2xl space-y-1.5 text-xs border border-slate-200 dark:border-[#1E262E]">
                <div className="font-semibold text-slate-700 dark:text-slate-300">Specializations:</div>
                <div className="flex flex-wrap gap-1.5">
                  {booking.specialist.vehicleSpecialties.map((spec, i) => (
                    <Badge key={i} variant="neutral" size="sm">{spec}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 text-center space-y-3 bg-slate-50 dark:bg-[#0A0E12] border-dashed border-slate-300 dark:border-slate-700 shadow-donezo">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Specialist Assignment in Progress</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Our operations hub is assigning an accredited specialist matched to this vehicle brand. You will receive an SMS and dashboard update shortly.
              </p>
            </Card>
          )}

          {/* On-Site Visit Proof Evidence (BRD ASN-005) */}
          {booking.visitEvidence && (
            <Card className="p-6 space-y-4 shadow-donezo">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">On-Site Visit Verification Evidence</h3>
                </div>
                <Badge variant="teal" size="sm">Verified Presence</Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Timestamped geotagged photographs captured by specialist upon arrival at vehicle:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <div className="aspect-video bg-slate-100 dark:bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E262E]">
                    <img src={booking.visitEvidence.specialistPhotoWithVehicleUrl} alt="Specialist with vehicle" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block text-center">Specialist with Vehicle</span>
                </div>

                <div className="space-y-1">
                  <div className="aspect-video bg-slate-100 dark:bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E262E]">
                    <img src={booking.visitEvidence.numberPlatePhotoUrl} alt="Vehicle registration plate" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block text-center">License Number Plate</span>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <div className="aspect-video bg-slate-100 dark:bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E262E]">
                    <img src={booking.visitEvidence.odometerPhotoUrl} alt="Odometer instrument cluster" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block text-center">Odometer Cluster</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Arrival Logged: {new Date(booking.visitEvidence.arrivedAt).toLocaleTimeString()}</span>
                <span>GPS Verified: {booking.visitEvidence.latitude}, {booking.visitEvidence.longitude}</span>
              </div>
            </Card>
          )}

          {/* Post-Completion Actions */}
          {booking.status === 'completed' && (
            <Card className="p-6 space-y-4 bg-[#154D3F]/5 dark:bg-emerald-500/10 border-emerald-500/30 shadow-donezo">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Post-Inspection Actions
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Your report has been delivered. You can review all findings or submit feedback on your inspection specialist's punctuality and report depth.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to={`/account/bookings/${booking.id}/report`}>
                  <Button variant="primary" size="md">
                    <FileText className="w-4 h-4 mr-1.5" /> View Digital Report
                  </Button>
                </Link>
                <Link to={`/account/bookings/${booking.id}/feedback`}>
                  <Button variant="outline" size="md">
                    <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-600 dark:text-emerald-400" /> Rate Specialist Experience
                  </Button>
                </Link>
              </div>
            </Card>
          )}

        </div>

        {/* Right Column: Appointment Logistics & Location */}
        <div className="lg:col-span-5 space-y-6">
          
          <Card className="p-6 space-y-4 shadow-donezo">
            <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
              Inspection Address & Seller
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Address:</span>
                <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                  {booking.location.addressLine}, {booking.location.area}, {booking.location.city} - {booking.location.pincode}
                </div>
              </div>

              {booking.location.landmark && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Landmark:</span>
                  <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{booking.location.landmark}</div>
                </div>
              )}

              {booking.location.accessNotes && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Access Instructions:</span>
                  <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 bg-slate-50 dark:bg-[#0A0E12] p-2.5 rounded-xl border border-slate-200 dark:border-[#1E262E]">
                    {booking.location.accessNotes}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Seller / Contact:</span>
                <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {booking.location.sellerContact.name} ({booking.location.sellerContact.sellerRelationship})
                </div>
                <div className="text-slate-600 dark:text-slate-400">{booking.location.sellerContact.phone}</div>
                {booking.location.sellerContact.askingPrice && (
                  <div className="mt-1 text-slate-600 dark:text-slate-400">
                    Seller Quoted Price: <strong className="text-slate-900 dark:text-white">₹{isNaN(Number(booking.location.sellerContact.askingPrice)) ? booking.location.sellerContact.askingPrice : Number(booking.location.sellerContact.askingPrice).toLocaleString('en-IN')}</strong>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Payment & Invoice Snapshot */}
          <Card className="p-6 space-y-3 bg-slate-50 dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] text-xs shadow-donezo">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs border-b border-slate-200 dark:border-slate-800 pb-2">
              Payment & Policy Snapshot
            </h4>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Amount Paid:</span>
              <span className="font-bold text-slate-900 dark:text-white">₹{booking.pricing.breakdown.totalPayableAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Payment Status:</span>
              <Badge variant="success" size="sm">{booking.paymentStatus.toUpperCase()}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Payment ID:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{booking.paymentId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Policy Version:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">{booking.pricing.policyVersion}</span>
            </div>
          </Card>

          {/* Need Help Box */}
          <Card className="p-5 text-center space-y-2 shadow-donezo">
            <HelpCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Need Help With This Booking?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Operations helpline is available 7 days a week from 08:00 AM to 08:00 PM.
            </p>
            <Link to="/account/support">
              <Button variant="outline" size="sm" className="w-full justify-center mt-2">
                Create Support Inquiry
              </Button>
            </Link>
          </Card>

        </div>

      </div>

      {/* Cancellation Modal with Live Policy Calculation */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setCancelResult(null);
        }}
        title="Cancel Inspection Booking"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          {cancelResult ? (
            <div className="space-y-3 text-center py-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Booking Cancelled Successfully</h4>
              <p className="text-slate-600 dark:text-slate-300">
                Your refund of <strong>₹{cancelResult.refundAmount.toFixed(2)}</strong> has been initiated to your original payment method.
              </p>
              {cancelResult.feeDeducted > 0 && (
                <p className="text-slate-500 dark:text-slate-400">
                  Deduction applied: ₹{cancelResult.feeDeducted.toFixed(2)} (Per Stage Cancellation Policy).
                </p>
              )}
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setCancelModalOpen(false);
                  setCancelResult(null);
                }}
                className="mt-2"
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Are you sure you wish to cancel this inspection? Your refund is calculated per the active platform cancellation policy snapshot.
              </p>

              {/* Live Refund Calculation Callout */}
              <div className="bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>Current Booking Stage:</span>
                  <strong className="text-slate-900 dark:text-white uppercase">{booking.status}</strong>
                </div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300">
                  <span>Original Amount Paid:</span>
                  <span>₹{totalPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-rose-600 dark:text-rose-400 font-medium">
                  <span>Policy Deduction Fee:</span>
                  <span>- ₹{estimatedFee.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-sm text-[#154D3F] dark:text-emerald-400">
                  <span>Estimated Refund Amount:</span>
                  <span>₹{estimatedRefund.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Reason for Cancellation</label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500"
                >
                  <option value="Change of purchase plans / Vehicle already sold">Change of purchase plans / Vehicle already sold</option>
                  <option value="Seller refused inspection / uncooperative">Seller refused inspection / uncooperative</option>
                  <option value="Vehicle price negotiation failed">Vehicle price negotiation failed</option>
                  <option value="Found another vehicle">Found another vehicle</option>
                  <option value="Booking details entered incorrectly">Booking details entered incorrectly</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <Button variant="ghost" size="sm" onClick={() => setCancelModalOpen(false)}>
                  Keep Booking
                </Button>
                <Button variant="danger" size="sm" onClick={handleConfirmCancel}>
                  Confirm Cancellation
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Reschedule Modal */}
      <Modal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        title="Reschedule Inspection Slot"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          {rescheduleSuccess ? (
            <div className="py-6 text-center space-y-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <div className="font-bold text-sm">Reschedule Confirmed!</div>
              <p className="text-slate-600 dark:text-slate-300">Specialist notification updated with new slot.</p>
            </div>
          ) : (
            <>
              <p className="text-slate-600 dark:text-slate-300">
                Choose a new inspection date and appointment window. Rescheduling is free of charge:
              </p>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">New Date</label>
                <select
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500"
                >
                  <option value="">-- Choose New Date --</option>
                  {availableRescheduleDates.map((d) => (
                    <option key={d.iso} value={d.iso}>{d.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">New Time Window</label>
                <select
                  value={newSlotId}
                  onChange={(e) => setNewSlotId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500"
                >
                  {TIME_SLOTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.window} ({s.label})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <Button variant="ghost" size="sm" onClick={() => setRescheduleModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" disabled={!newDate} onClick={handleConfirmReschedule}>
                  Confirm Reschedule
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

    </div>
  );
};
