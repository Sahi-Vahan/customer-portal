import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <Badge variant="teal">Customer Support & Inquiries</Badge>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">We Are Here to Help You</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Have a question about an upcoming inspection, custom fleet dispatch, or existing report?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-4">
          <Card className="p-6 space-y-4 shadow-donezo">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Direct Channels</h3>
            
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Toll-Free Phone:</div>
                  <div className="text-slate-500 dark:text-slate-400">1800-123-SAHI (08:00 AM - 08:00 PM)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Email Inquiries:</div>
                  <div className="text-slate-500 dark:text-slate-400">support@sahivahan.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Corporate HQ:</div>
                  <div className="text-slate-500 dark:text-slate-400">Level 4, SahiVahan Mobility Tech, Koramangala 5th Block, Bengaluru, KA 560095</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <Card className="p-6 sm:p-8 space-y-4 shadow-donezo">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Send Us a Message</h3>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#154D3F] dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white">Message Delivered</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Thank you, {form.name}. Our support team will respond to {form.email} within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <Button variant="primary" size="md" type="submit" className="w-full justify-center shadow-md">
                  <Send className="w-4 h-4 mr-1.5" /> Send Inquiry
                </Button>
              </form>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};
