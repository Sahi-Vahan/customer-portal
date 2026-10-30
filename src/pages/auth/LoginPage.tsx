import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  UserCheck,
  LogOut,
  ExternalLink,
  Car,
  Lock
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../store/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, customer, login, logout } = useAuth();

  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('9876543210');
  const [name, setName] = useState('Rahul Sharma');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('4921');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/account/bookings';

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 400);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await login(identifier, name);
      setLoading(false);
      navigate(from, { replace: true });
    }, 400);
  };

  const handleQuickCustomerLogin = async (presetName: string, presetPhone: string, presetEmail: string) => {
    setLoading(true);
    await login(presetPhone, presetName);
    setLoading(false);
    navigate(from, { replace: true });
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-1 group">
          <div className="w-12 h-12 rounded-2xl bg-[#154D3F] text-white flex items-center justify-center shadow-md shadow-[#154D3F]/20 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-emerald-300 stroke-[2.2]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
              Sahi<span className="text-[#154D3F] dark:text-emerald-400">Vahan</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-0.5">
              Customer Account Access
            </span>
          </div>
        </Link>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sign In to Your Account
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Track real-time specialist visits, view comprehensive inspection reports, and access repair estimates.
        </p>
      </div>

      {/* Active Session Card (if already authenticated) */}
      {isAuthenticated && customer && (
        <Card className="p-5 border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/20 shadow-donezo space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> You Are Currently Signed In
            </span>
            <span className="text-[10px] font-bold bg-emerald-200/80 dark:bg-emerald-800/40 text-emerald-900 dark:text-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
              Active Buyer
            </span>
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300">
            Account: <strong className="text-slate-900 dark:text-white font-bold">{customer.fullName}</strong> • {customer.phone}
          </div>

          <div className="flex gap-2 pt-1">
            <Link to="/account/bookings" className="flex-1">
              <Button variant="primary" size="sm" className="w-full justify-center text-xs font-bold shadow-sm">
                Go to My Bookings <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> Sign Out
            </Button>
          </div>
        </Card>
      )}

      {/* Fast 1-Click Demo Customer Presets */}
      <Card className="p-5 border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10 shadow-donezo space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#154D3F] dark:text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> One-Click Customer Fast Sign In
          </span>
          <span className="text-[10px] bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold uppercase">
            Demo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleQuickCustomerLogin('Rahul Sharma', '+91 98765 43210', 'rahul.sharma@example.com')}
            className="p-3 bg-white dark:bg-[#12181E] hover:border-[#154D3F] dark:hover:border-emerald-500 border border-slate-200 dark:border-[#1E262E] rounded-2xl text-left transition-all group shadow-sm"
          >
            <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
              <span>Rahul S.</span>
              <ArrowRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">Hyundai Creta</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickCustomerLogin('Sneha Kulkarni', '+91 99001 22334', 'sneha.k@outlook.com')}
            className="p-3 bg-white dark:bg-[#12181E] hover:border-[#154D3F] dark:hover:border-emerald-500 border border-slate-200 dark:border-[#1E262E] rounded-2xl text-left transition-all group shadow-sm"
          >
            <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
              <span>Sneha K.</span>
              <ArrowRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">Prestige Palms</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickCustomerLogin('Aditya Narayan', '+91 98450 44321', 'aditya.n@gmail.com')}
            className="p-3 bg-white dark:bg-[#12181E] hover:border-[#154D3F] dark:hover:border-emerald-500 border border-slate-200 dark:border-[#1E262E] rounded-2xl text-left transition-all group shadow-sm"
          >
            <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
              <span>Aditya N.</span>
              <ArrowRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">Nexon EV VIP</div>
          </button>
        </div>
      </Card>

      {/* Main Authentication Card */}
      <Card className="p-6 sm:p-8 space-y-6 shadow-donezo">
        {/* Toggle Mode */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-[#0A0E12] rounded-2xl border border-slate-200 dark:border-[#1E262E] text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('phone');
              setOtpSent(false);
            }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'phone'
                ? 'bg-white dark:bg-[#12181E] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-[#1E262E]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Mobile OTP Login
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('email');
              setOtpSent(false);
            }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'email'
                ? 'bg-white dark:bg-[#12181E] text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-[#1E262E]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Email Login
          </button>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">
                {authMode === 'phone' ? 'Mobile Number (10 Digits)' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type={authMode === 'phone' ? 'tel' : 'email'}
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={authMode === 'phone' ? '9876543210' : 'rahul@example.com'}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={loading}
              className="w-full justify-center font-bold mt-2 shadow-md"
            >
              Get Verification Code <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-4 text-slate-900 dark:text-white space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> OTP Sent Successfully
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                A 4-digit code was sent to <strong>{identifier}</strong>. (Simulated Demo OTP: <code className="bg-white dark:bg-black px-1.5 py-0.5 rounded font-mono font-bold text-[#154D3F] dark:text-emerald-400">4921</code>)
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase mb-1.5">Enter 4-Digit OTP</label>
              <input
                type="text"
                maxLength={4}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-center text-lg font-mono font-bold tracking-widest text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Didn't receive code?</span>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-[#154D3F] dark:text-emerald-400 font-bold hover:underline"
              >
                Change Number / Resend
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={loading}
              className="w-full justify-center font-bold shadow-md"
            >
              Verify & Sign In <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        )}
      </Card>

      {/* Cross-App Navigation Footer */}
      <div className="pt-2 text-center space-y-2">
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Platform ecosystem portals</div>
        <div className="flex items-center justify-center gap-3">
          <a
            href="http://127.0.0.1:3002/admin/login"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-semibold hover:underline"
          >
            Admin Command Center <ExternalLink className="w-3 h-3 text-[#154D3F] dark:text-emerald-400" />
          </a>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a
            href="http://127.0.0.1:3001/specialist/dashboard"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-semibold hover:underline"
          >
            Specialist App <ExternalLink className="w-3 h-3 text-[#154D3F] dark:text-emerald-400" />
          </a>
        </div>
      </div>

    </div>
  );
};
