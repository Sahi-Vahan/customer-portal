import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Plus, Clock, CheckCircle2, AlertCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useBooking } from '../../store/BookingContext';

export const SupportPage: React.FC = () => {
  const { bookings, supportTickets, submitSupportTicket } = useBooking();
  const [activeTab, setActiveTab] = useState<'tickets' | 'new'>('tickets');

  const [category, setCategory] = useState<'booking' | 'specialist_visit' | 'report_clarification' | 'payment_refund' | 'general'>('report_clarification');
  const [selectedBookingId, setSelectedBookingId] = useState<string>(bookings[0]?.id || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [createdTicket, setCreatedTicket] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTkt = submitSupportTicket({
      bookingId: selectedBookingId || undefined,
      customerId: 'cust-101',
      category,
      subject,
      message
    });
    setCreatedTicket(newTkt);
    setSubject('');
    setMessage('');
    setActiveTab('tickets');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E9EB] dark:border-[#1E262E] gap-4">
        <div>
          <Badge variant="teal">Priority Customer Support</Badge>
          <h1 className="text-2xl sm:text-4xl font-black text-[#0A0E12] dark:text-white tracking-tight mt-1">
            Support Cases & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            Direct communication with our quality audit desk, appointment dispatch, and diagnostic engineers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === 'new' ? 'secondary' : 'primary'}
            size="sm"
            onClick={() => {
              setActiveTab('new');
              setCreatedTicket(null);
            }}
            className="rounded-full shadow-donezo"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Open New Ticket
          </Button>
        </div>
      </div>

      {/* Pill Switcher */}
      <div className="flex items-center gap-2 p-1 bg-[#F4F6F8] dark:bg-[#12181E] rounded-full border border-[#E5E9EB] dark:border-[#1E262E] w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('tickets')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'tickets'
              ? 'bg-[#154D3F] text-white shadow-donezo'
              : 'text-slate-600 dark:text-slate-400 hover:text-[#0A0E12] dark:hover:text-white'
          }`}
        >
          My Tickets ({supportTickets.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('new')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
            activeTab === 'new'
              ? 'bg-[#154D3F] text-white shadow-donezo'
              : 'text-slate-600 dark:text-slate-400 hover:text-[#0A0E12] dark:hover:text-white'
          }`}
        >
          New Ticket Inquiry
        </button>
      </div>

      {activeTab === 'new' ? (
        <Card className="p-6 sm:p-8 space-y-6 border-[#E5E9EB] dark:border-[#1E262E] shadow-card bg-white dark:bg-[#12181E]">
          <div className="border-b border-[#E5E9EB] dark:border-[#1E262E] pb-4">
            <h3 className="font-bold text-[#0A0E12] dark:text-white text-base sm:text-lg">Open a Quality or Service Ticket</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              A designated technical supervisor will review your query within 2 operational hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-black text-[#0A0E12] dark:text-white uppercase tracking-wider mb-2">Inquiry Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-[#0A0E12] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
                >
                  <option value="report_clarification">Report Finding Clarification</option>
                  <option value="specialist_visit">Specialist Visit / Appointment Issue</option>
                  <option value="booking">Booking / Schedule Change</option>
                  <option value="payment_refund">Payment & Refund Reconciliation</option>
                  <option value="general">General Platform Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-black text-[#0A0E12] dark:text-white uppercase tracking-wider mb-2">Associated Booking</label>
                <select
                  value={selectedBookingId}
                  onChange={(e) => setSelectedBookingId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-[#0A0E12] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
                >
                  <option value="">-- General / Non-Booking Related --</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.id} ({b.vehicle.make} {b.vehicle.model})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-black text-[#0A0E12] dark:text-white uppercase tracking-wider mb-2">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Need clarification on engine bay oil sweat observation in Creta report"
                className="w-full px-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-[#0A0E12] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
              />
            </div>

            <div>
              <label className="block font-black text-[#0A0E12] dark:text-white uppercase tracking-wider mb-2">Detailed Description</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide as much context as possible to help our senior technical lead and audit team assist you promptly..."
                className="w-full px-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-[#0A0E12] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E5E9EB] dark:border-[#1E262E]">
              <Button variant="ghost" size="md" type="button" onClick={() => setActiveTab('tickets')} className="rounded-full">
                Cancel
              </Button>
              <Button variant="primary" size="md" type="submit" className="rounded-full shadow-donezo px-8">
                Submit Support Ticket
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="space-y-4">
          {createdTicket && (
            <div className="bg-[#E8F5EE] dark:bg-[#154D3F]/20 border border-emerald-500/30 rounded-2xl p-4 text-xs text-[#154D3F] dark:text-emerald-300 flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>Ticket <strong className="font-mono">{createdTicket.id}</strong> has been logged. An operations representative has responded below.</span>
            </div>
          )}

          {supportTickets.length === 0 ? (
            <Card className="text-center py-16 space-y-4 bg-white dark:bg-[#12181E] border-[#E5E9EB] dark:border-[#1E262E]">
              <div className="w-14 h-14 rounded-full bg-[#F4F6F8] dark:bg-[#1E262E] text-slate-400 flex items-center justify-center mx-auto">
                <HelpCircle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-[#0A0E12] dark:text-white">No Support Cases Logged</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Need help with an inspection finding, slot schedule change, or payment status? Raise an inquiry using the button above.
              </p>
            </Card>
          ) : (
            supportTickets.map((tkt) => (
              <Card key={tkt.id} className="p-6 sm:p-7 space-y-4 bg-white dark:bg-[#12181E] border-[#E5E9EB] dark:border-[#1E262E] shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E9EB] dark:border-[#1E262E] pb-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono font-bold text-[#0A0E12] dark:text-white text-xs bg-[#F4F6F8] dark:bg-[#1E262E] px-3 py-1 rounded-full border border-[#E5E9EB] dark:border-[#1E262E]">
                      {tkt.id}
                    </span>
                    <Badge variant={tkt.status === 'open' ? 'warning' : 'success'} size="sm">
                      {tkt.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Category: {tkt.category}</span>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Logged: {new Date(tkt.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-[#0A0E12] dark:text-white text-base">{tkt.subject}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-[#F4F6F8] dark:bg-[#0E1318] p-4 rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E]">
                    {tkt.message}
                  </p>
                </div>

                {tkt.responses && tkt.responses.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-[#E5E9EB] dark:border-[#1E262E]">
                    <div className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Audit Team Responses:
                    </div>
                    {tkt.responses.map((resp, rIdx) => (
                      <div key={rIdx} className="bg-[#E8F5EE] dark:bg-[#154D3F]/20 border border-emerald-500/20 p-4 rounded-2xl text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#154D3F] dark:text-emerald-300">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SahiVahan Technical Desk
                          </span>
                          <span className="text-slate-500 dark:text-slate-400 font-normal">{new Date(resp.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{resp.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      )}

    </div>
  );
};
