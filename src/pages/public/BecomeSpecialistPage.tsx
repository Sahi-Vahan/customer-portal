import React, { useState } from 'react';
import { ShieldCheck, Award, Wrench, Wallet, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

export const BecomeSpecialistPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Bengaluru',
    experienceYears: '5',
    workshopBackground: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0B251E] via-[#154D3F] to-[#071B15] text-white rounded-3xl p-8 sm:p-14 shadow-donezo border border-[#1E3A30] relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <Badge variant="teal">Join India's Top Independent Automotive Inspection Network</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Earn ₹40,000 to ₹75,000+ Monthly as a SahiVahan Specialist
          </h1>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            Are you a certified automotive technician, diagnostic specialist, or experienced workshop lead? Conduct structured vehicle inspections on flexible schedules with guaranteed 48-hour direct wallet payouts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Benefits & Requirements */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Why Certified Specialists Partner With Us</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="space-y-2 p-6 shadow-donezo">
              <div className="w-10 h-10 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">48-Hour Payouts</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Earnings move directly to your withdrawable wallet 48 hours after report submission with zero delays.
              </p>
            </Card>

            <Card className="space-y-2 p-6 shadow-donezo">
              <div className="w-10 h-10 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Dedicated Specialist App</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Streamlined mobile checklist app, voice-to-text notes, automated photo uploads, and real-time job routing.
              </p>
            </Card>

            <Card className="space-y-2 p-6 shadow-donezo">
              <div className="w-10 h-10 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Professional Respect</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You work as a certified engineering consultant. Zero repair work, grease-monkey labor, or dealership pressure.
              </p>
            </Card>

            <Card className="space-y-2 p-6 shadow-donezo">
              <div className="w-10 h-10 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Quality Bonuses</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Top-rated specialists receive high-complexity luxury vehicle assignments and monthly performance bonuses.
              </p>
            </Card>
          </div>

          <div className="bg-slate-50 dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] rounded-3xl p-6 sm:p-7 space-y-3 shadow-donezo">
            <h3 className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 uppercase tracking-wider">Minimum Specialist Criteria:</h3>
            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> Minimum 3+ years experience in multi-brand workshop or authorized dealership
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> Hands-on experience with OBD-II diagnostic scanners & digital multimeters
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> Valid PAN card, Aadhaar verification, and bank account for direct payouts
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" /> Smartphone for the SahiVahan Specialist App and two-wheeler for local travel
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-5">
          <Card className="p-6 sm:p-8 space-y-5 shadow-donezo">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Apply as an Inspector</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Our operations team will review your application within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-[#154D3F] dark:bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Application Received!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Thank you, {formData.name}. Our city onboarding specialist will contact you on <strong>{formData.phone}</strong> for document verification and practical technical evaluation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">City Hub</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Delhi-NCR">Delhi-NCR</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Experience</label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                    >
                      <option value="3">3 - 5 Years</option>
                      <option value="5">5 - 8 Years</option>
                      <option value="8">8+ Years Lead</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Prior Workshop / Dealership</label>
                  <input
                    type="text"
                    required
                    value={formData.workshopBackground}
                    onChange={(e) => setFormData({ ...formData, workshopBackground: e.target.value })}
                    placeholder="e.g. Maruti Service Master / Bosch Car Service"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                  />
                </div>

                <Button variant="primary" size="lg" type="submit" className="w-full justify-center shadow-md">
                  Submit Specialist Application
                </Button>
              </form>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
};
