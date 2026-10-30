import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, CheckCircle2, ShieldCheck, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useBooking } from '../../store/BookingContext';

export const FeedbackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookingById, submitFeedback } = useBooking();

  const booking = getBookingById(id || '');

  const [punctuality, setPunctuality] = useState(5);
  const [behavior, setBehavior] = useState(5);
  const [technicalExpertise, setTechnicalExpertise] = useState(5);
  const [reportClarity, setReportClarity] = useState(5);
  const [overallExperience, setOverallExperience] = useState(5);
  const [comments, setComments] = useState('');
  const [appExperienceFeedback, setAppExperienceFeedback] = useState('');
  const [recommendToFriend, setRecommendToFriend] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!booking) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-black text-[#0A0E12] dark:text-white">Booking Record Not Found</h2>
        <Link to="/account/bookings">
          <Button variant="primary" size="md">Back to My Bookings</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback({
      bookingId: booking.id,
      specialistId: booking.specialist?.id || 'sp-unknown',
      customerId: 'cust-101',
      ratings: {
        punctuality,
        behavior,
        technicalExpertise,
        reportClarity,
        overallExperience
      },
      comments,
      recommendToFriend,
      appExperienceFeedback
    });
    setSubmitted(true);
  };

  const renderStarRating = (value: number, onChange: (val: number) => void) => {
    return (
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95 ${
              star <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'
            }`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
        <span className="text-xs font-black text-[#0A0E12] dark:text-white ml-2 bg-[#F4F6F8] dark:bg-[#1E262E] px-2 py-0.5 rounded-full">
          {value}/5
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <Link
        to={`/account/bookings/${booking.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#154D3F] dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Booking Details
      </Link>

      <Card className="p-6 sm:p-8 space-y-6 border-[#E5E9EB] dark:border-[#1E262E] shadow-card bg-white dark:bg-[#12181E]">
        {submitted ? (
          <div className="text-center py-10 space-y-5">
            <div className="w-16 h-16 bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/20 shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0E12] dark:text-white">
              Thank You for Your Feedback!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Your honest ratings safeguard vehicle buyers nationwide and reward top-tier certified specialists in our inspection network.
            </p>
            <div className="pt-3">
              <Button variant="primary" size="md" onClick={() => navigate(`/account/bookings/${booking.id}`)} className="rounded-full shadow-donezo">
                Return to Booking Summary
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-[#E5E9EB] dark:border-[#1E262E] pb-5 space-y-2">
              <Badge variant="teal">Customer Quality Review</Badge>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A0E12] dark:text-white tracking-tight">
                Rate Your Inspection Experience
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Booking: <span className="font-mono font-bold text-[#0A0E12] dark:text-white">{booking.id}</span> · {booking.vehicle.make} {booking.vehicle.model}
                {booking.specialist && <span> · Inspector: <strong className="text-[#154D3F] dark:text-emerald-400">{booking.specialist.fullName}</strong></span>}
              </p>
            </div>

            {/* Rating Dimensions */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F4F6F8] dark:bg-[#0E1318] rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E]">
                <div>
                  <div className="text-xs font-black text-[#0A0E12] dark:text-white">Specialist Punctuality & Arrival</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Was the inspector on time for the scheduled slot window?</div>
                </div>
                {renderStarRating(punctuality, setPunctuality)}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F4F6F8] dark:bg-[#0E1318] rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E]">
                <div>
                  <div className="text-xs font-black text-[#0A0E12] dark:text-white">Professional Conduct & Communication</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Courteous, polite, and neutral demeanor with seller?</div>
                </div>
                {renderStarRating(behavior, setBehavior)}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F4F6F8] dark:bg-[#0E1318] rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E]">
                <div>
                  <div className="text-xs font-black text-[#0A0E12] dark:text-white">Technical Rigor & Diagnostics</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Thoroughness across paint DFT, OBD-II scan, and test drive?</div>
                </div>
                {renderStarRating(technicalExpertise, setTechnicalExpertise)}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F4F6F8] dark:bg-[#0E1318] rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E]">
                <div>
                  <div className="text-xs font-black text-[#0A0E12] dark:text-white">Report Clarity & Explanations</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Clear photos, clear defect explanations, and repair estimates?</div>
                </div>
                {renderStarRating(reportClarity, setReportClarity)}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#E8F5EE] dark:bg-[#154D3F]/20 border border-emerald-500/20 rounded-2xl">
                <div>
                  <div className="text-xs font-black text-[#154D3F] dark:text-emerald-300">Overall Service Experience</div>
                  <div className="text-[11px] text-[#0F382E] dark:text-emerald-400/80">Your holistic satisfaction with SahiVahan?</div>
                </div>
                {renderStarRating(overallExperience, setOverallExperience)}
              </div>
            </div>

            {/* Recommendation NPS */}
            <div className="p-4 bg-[#F4F6F8] dark:bg-[#0E1318] rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E] space-y-3">
              <div className="text-xs font-black text-[#0A0E12] dark:text-white">
                Would you recommend SahiVahan to a colleague or friend buying a used car?
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRecommendToFriend(true)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold transition-all ${
                    recommendToFriend
                      ? 'bg-[#154D3F] text-white shadow-donezo'
                      : 'bg-white dark:bg-[#12181E] text-slate-600 dark:text-slate-400 border border-[#E5E9EB] dark:border-[#1E262E]'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" /> Yes, Definitely
                </button>
                <button
                  type="button"
                  onClick={() => setRecommendToFriend(false)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold transition-all ${
                    !recommendToFriend
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white dark:bg-[#12181E] text-slate-600 dark:text-slate-400 border border-[#E5E9EB] dark:border-[#1E262E]'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" /> Not Likely
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-[#0A0E12] dark:text-white uppercase tracking-wider">
                Specialist & Inspection Comments (Optional)
              </label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share any specific observations regarding the specialist's conduct or inspection depth..."
                className="w-full px-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-xs text-[#0A0E12] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
              />
            </div>

            {/* App Feedback */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-[#0A0E12] dark:text-white uppercase tracking-wider">
                Website / Customer Portal Feedback (Optional)
              </label>
              <textarea
                rows={2}
                value={appExperienceFeedback}
                onChange={(e) => setAppExperienceFeedback(e.target.value)}
                placeholder="Any suggestions for booking flow, slot selection, or live tracker interface?"
                className="w-full px-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-xs text-[#0A0E12] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E5E9EB] dark:border-[#1E262E]">
              <Button
                variant="ghost"
                size="md"
                type="button"
                onClick={() => navigate(`/account/bookings/${booking.id}`)}
                className="rounded-full"
              >
                Skip for Now
              </Button>
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="rounded-full shadow-donezo px-8"
              >
                Submit Quality Feedback
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
