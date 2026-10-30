import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Car, Bike, MapPin, ArrowRight, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useBooking } from '../../store/BookingContext';
import { BookingStatus } from '../../types/booking';

export const BookingsListPage: React.FC = () => {
  const { bookings } = useBooking();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'upcoming') {
      return b.status !== 'completed' && b.status !== 'cancelled';
    }
    if (activeTab === 'completed') {
      return b.status === 'completed';
    }
    if (activeTab === 'cancelled') {
      return b.status === 'cancelled';
    }
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'awaiting_assignment':
        return <Badge variant="warning" size="sm">Awaiting Specialist Assignment</Badge>;
      case 'assigned':
      case 'accepted':
        return <Badge variant="info" size="sm">Specialist Assigned</Badge>;
      case 'en_route':
        return <Badge variant="teal" size="sm">Specialist En Route</Badge>;
      case 'arrived':
        return <Badge variant="teal" size="sm">Arrived on Site</Badge>;
      case 'inspecting':
        return <Badge variant="teal" size="sm" className="animate-pulse">Inspection In Progress</Badge>;
      case 'report_submitted':
      case 'completed':
        return <Badge variant="success" size="sm">Report Ready</Badge>;
      case 'cancelled':
        return <Badge variant="danger" size="sm">Cancelled</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Inspection Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track active technician visits, view delivered inspection reports, and manage appointments.
          </p>
        </div>

        <Link to="/book/vehicle">
          <Button variant="primary" size="md" className="shadow-md">
            + Book New Inspection
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-full transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#154D3F] dark:bg-emerald-500 text-white shadow-sm'
              : 'bg-white dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Active & Upcoming ({bookings.filter((b) => b.status !== 'completed' && b.status !== 'cancelled').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-full transition-all ${
            activeTab === 'completed'
              ? 'bg-[#154D3F] dark:bg-emerald-500 text-white shadow-sm'
              : 'bg-white dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Completed Reports ({bookings.filter((b) => b.status === 'completed').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-full transition-all ${
            activeTab === 'cancelled'
              ? 'bg-[#154D3F] dark:bg-emerald-500 text-white shadow-sm'
              : 'bg-white dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card className="text-center py-12 space-y-3 shadow-donezo">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No {activeTab} bookings found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {activeTab === 'upcoming'
                ? 'You do not have any active appointments. Book an inspection when evaluating your next used vehicle!'
                : 'No bookings in this category.'}
            </p>
            {activeTab === 'upcoming' && (
              <div className="pt-2">
                <Link to="/book/vehicle">
                  <Button variant="primary" size="md">
                    Book an Inspection Now
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        ) : (
          filteredBookings.map((b) => (
            <Card key={b.id} className="p-6 space-y-4 shadow-donezo">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-xs text-[#154D3F] dark:text-emerald-400 bg-[#154D3F]/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full">
                    {b.id}
                  </span>
                  {getStatusBadge(b.status)}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>Paid: ₹{b.pricing.breakdown.totalPayableAmount.toFixed(2)}</span>
                  <span>·</span>
                  <span>{b.paymentMethod || 'UPI'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Vehicle:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 flex items-center gap-1.5">
                    {b.vehicle.type === 'car' ? <Car className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Bike className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    {b.vehicle.make} {b.vehicle.model}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 block mt-0.5">{b.vehicle.variant} ({b.vehicle.manufacturingYear})</span>
                </div>

                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Appointment Slot:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    {new Date(b.appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 block mt-0.5">{b.appointment.slotWindow}</span>
                </div>

                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Location:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{b.location.addressLine}, {b.location.city}</span>
                  </span>
                </div>
              </div>

              {/* Specialist info if assigned */}
              {b.specialist && (
                <div className="bg-slate-50 dark:bg-[#0A0E12] p-3 rounded-2xl flex items-center justify-between text-xs border border-slate-200 dark:border-[#1E262E]">
                  <div className="flex items-center gap-3">
                    <img src={b.specialist.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{b.specialist.fullName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Badge: {b.specialist.badgeNumber} · Rating: ⭐ {b.specialist.rating}</div>
                    </div>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">Specialist Confirmed</span>
                </div>
              )}

              {/* Action Links */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <Link to={`/account/bookings/${b.id}`}>
                  <Button variant="outline" size="sm">
                    View Appointment Details
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  {b.status === 'completed' && b.report && (
                    <Link to={`/account/bookings/${b.id}/report`}>
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        <FileText className="w-3.5 h-3.5 mr-1" /> View Digital Report
                      </Button>
                    </Link>
                  )}

                  {b.status !== 'completed' && b.status !== 'cancelled' && (
                    <Link to={`/account/bookings/${b.id}`}>
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Track Live Status
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

    </div>
  );
};
