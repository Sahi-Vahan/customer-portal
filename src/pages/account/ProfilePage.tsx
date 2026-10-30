import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, ShieldCheck, CheckCircle2, LogOut, Lock, BellRing } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../store/AuthContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { customer, updateProfile, logout } = useAuth();
  const [name, setName] = useState(customer?.fullName || 'Rahul Sharma');
  const [phone, setPhone] = useState(customer?.phone || '+91 98765 43210');
  const [email, setEmail] = useState(customer?.email || 'rahul.sharma@example.com');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName: name, phone, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Badge variant="teal">Customer Account</Badge>
        <h1 className="text-2xl sm:text-4xl font-black text-[#0A0E12] dark:text-white tracking-tight mt-1">
          Profile & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
          Manage your verified contact coordinates for real-time inspection alerts and tamper-proof report deliveries.
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="p-6 sm:p-8 space-y-6 border-[#E5E9EB] dark:border-[#1E262E] shadow-card bg-white dark:bg-[#12181E]">
        <div className="flex items-center gap-4 pb-6 border-b border-[#E5E9EB] dark:border-[#1E262E]">
          <div className="w-16 h-16 rounded-full bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center font-black text-2xl border-2 border-emerald-500/20 shadow-sm">
            {name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-[#0A0E12] dark:text-white">{name}</h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-[#E8F5EE] dark:bg-[#154D3F]/20 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Customer
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customer ID: <span className="font-mono font-bold text-[#0A0E12] dark:text-white">CUST-10829</span>
            </p>
          </div>
        </div>

        {saved && (
          <div className="bg-[#E8F5EE] dark:bg-[#154D3F]/20 border border-emerald-500/30 rounded-2xl p-4 text-xs text-[#154D3F] dark:text-emerald-300 flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">Your contact profile coordinates have been securely updated.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block font-black text-[#0A0E12] dark:text-white uppercase tracking-wider mb-2">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-sm text-[#0A0E12] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-black text-[#0A0E12] dark:text-white uppercase tracking-wider mb-2">
                Primary Phone (WhatsApp Alerts)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-sm text-[#0A0E12] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-black text-[#0A0E12] dark:text-white uppercase tracking-wider mb-2">
                Email Address (Report Delivery)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F4F6F8] dark:bg-[#0E1318] border border-[#E5E9EB] dark:border-[#1E262E] rounded-2xl text-sm text-[#0A0E12] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 bg-[#F4F6F8] dark:bg-[#0E1318] rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E] flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#154D3F] dark:text-emerald-400 flex-shrink-0" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your contact details remain 100% confidential. Sellers and dealerships only receive verified appointment confirmations without your personal financial details.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E5E9EB] dark:border-[#1E262E]">
            <Button variant="primary" size="md" type="submit" className="w-full sm:w-auto font-bold rounded-full shadow-donezo px-8">
              Save Profile Updates
            </Button>
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full sm:w-auto text-rose-600 hover:text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-bold rounded-full"
            >
              <LogOut className="w-4 h-4 mr-1.5" /> Sign Out
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
