import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, ShieldCheck, ArrowRight, UserCheck, PhoneCall, Download } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useBooking } from '../../store/BookingContext';

export const BookingConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookingById } = useBooking();

  const booking = getBookingById(id || '');

  if (!booking) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-navy-900">Booking Record Not Found</h2>
        <Link to="/account/bookings">
          <Button variant="primary" size="md">View All Bookings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Success Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-8 text-center space-y-4 shadow-donezo">
        <div className="w-16 h-16 bg-[#154D3F] dark:bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle className="w-9 h-9 stroke-[2.2]" />
        </div>
        <div className="space-y-1">
          <Badge variant="success" size="md">Payment Captured & Confirmed</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Inspection Booked Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Booking Reference ID: <strong className="font-mono text-[#154D3F] dark:text-emerald-400 font-bold text-base">{booking.id}</strong>
          </p>
        </div>
      </div>

      {/* Appointment Summary Card */}
      <Card className="p-6 sm:p-8 space-y-6 shadow-donezo">
        <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800 pb-3">
          Appointment Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400">Vehicle:</span>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
              {booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.variant})
            </div>
            <div className="text-slate-600 dark:text-slate-400 mt-0.5">{booking.vehicle.manufacturingYear} · {booking.vehicle.fuelType} · {booking.vehicle.transmission}</div>
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400">Date & Window:</span>
            <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {new Date(booking.appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{booking.appointment.slotWindow}</div>
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">Inspection Address:</span>
            <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>{booking.location.addressLine}, {booking.location.area}, {booking.location.city} - {booking.location.pincode}</span>
            </div>
          </div>
        </div>

        {/* 3 Steps: What Happens Next */}
        <div className="bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl p-5 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">What to Expect Next:</h4>
          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#154D3F] dark:bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Manual Specialist Assignment:</strong> Our city operations team assigns an accredited inspector matched to this vehicle brand within 60 minutes.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#154D3F] dark:bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
              <div>
                <strong className="text-slate-900 dark:text-white">On-Site Arrival & Verification:</strong> Specialist arrives with OBD scanner and paint gauge, uploading an arrival selfie with the vehicle to verify presence.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#154D3F] dark:bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
              <div>
                <strong className="text-slate-900 dark:text-white">Instant Report Delivery:</strong> The moment the specialist submits the checklist on-site, the 200+ point report is published to your account.
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to={`/account/bookings/${booking.id}`} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full justify-center font-bold shadow-md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Track Appointment Live
            </Button>
          </Link>

          <Link to="/account/bookings" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full justify-center">
              View All Bookings
            </Button>
          </Link>
        </div>
      </Card>

    </div>
  );
};
