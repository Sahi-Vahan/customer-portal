import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Menu,
  X,
  CalendarCheck,
  PhoneCall,
  User,
  LogOut,
  ChevronDown,
  LogIn,
  Settings,
  Headphones,
  Sun,
  Moon,
  ExternalLink,
  Car,
  Bike,
  HelpCircle,
  FileText,
  BookOpen,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button';
import { useBooking } from '../../store/BookingContext';
import { useAuth } from '../../store/AuthContext';
import { useTheme } from '../../store/ThemeContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [inspectionsDropdownOpen, setInspectionsDropdownOpen] = useState(false);
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const inspectionsDropdownRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { bookings } = useBooking();
  const { isAuthenticated, customer, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const activeBookingsCount = bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setProfileDropdownOpen(false);
      }
      if (inspectionsDropdownRef.current && !inspectionsDropdownRef.current.contains(target)) {
        setInspectionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate('/');
  };

  const isInspectionActive = 
    location.pathname === '/car-inspection' || 
    location.pathname === '/bike-inspection' || 
    location.pathname === '/sample-report';

  const customerInitials = customer?.fullName
    ? customer.fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'CU';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0A0E12]/95 backdrop-blur-md border-b border-[#E5E9EB] dark:border-[#1E262E] transition-colors duration-200">
      
      {/* Top Banner Notice (Clean, Uncluttered Strip) */}
      <div className="bg-[#0F382E] dark:bg-[#071914] text-emerald-100 text-[11px] py-1.5 px-4 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase tracking-wider border border-emerald-400/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Unbiased
            </span>
            <span className="font-medium text-emerald-100/90 text-[11px] sm:text-xs">
              India's 1st Certified Independent Pre-Purchase Vehicle Inspection Network
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:18001234567"
              className="flex items-center gap-1.5 font-bold text-emerald-200 hover:text-white transition-colors text-xs"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>1800-123-SAHI</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-2xl bg-[#E8F5EE] dark:bg-[#154D3F]/40 border border-[#CBEAD8] dark:border-emerald-600/30 flex items-center justify-center text-[#154D3F] dark:text-emerald-400 shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-none flex items-center">
                Sahi<span className="text-[#154D3F] dark:text-emerald-400">Vahan</span>
              </span>
              <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mt-0.5">
                Sahi Gaadi. Sahi Faisla.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Spacious, Uncluttered, Single-line) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            
            {/* Inspections Dropdown */}
            <div 
              className="relative" 
              ref={inspectionsDropdownRef}
              onMouseEnter={() => setInspectionsDropdownOpen(true)}
              onMouseLeave={() => setInspectionsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setInspectionsDropdownOpen(!inspectionsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isInspectionActive
                    ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`}
                aria-expanded={inspectionsDropdownOpen}
              >
                <span>Inspections</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${inspectionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Inspections Popover Menu */}
              {inspectionsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 space-y-1">
                    
                    <Link
                      to="/car-inspection"
                      onClick={() => setInspectionsDropdownOpen(false)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                        location.pathname === '/car-inspection' 
                          ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center text-[#154D3F] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Car className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>Car Inspection</span>
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded-md">200+ Pts</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Comprehensive 4-wheeler audit from ₹1,999
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/bike-inspection"
                      onClick={() => setInspectionsDropdownOpen(false)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                        location.pathname === '/bike-inspection' 
                          ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center text-[#154D3F] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Bike className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>Bike Inspection</span>
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded-md">120+ Pts</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Chassis alignment & engine test from ₹999
                        </p>
                      </div>
                    </Link>

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800/80" />

                    <Link
                      to="/sample-report"
                      onClick={() => setInspectionsDropdownOpen(false)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                        location.pathname === '/sample-report' 
                          ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>Sample Inspection Report</span>
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Interactive</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Explore live digital dossier & verified PDF
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Navigation Links */}
            <Link
              to="/how-it-works"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                location.pathname === '/how-it-works'
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
              }`}
            >
              How It Works
            </Link>

            <Link
              to="/pricing"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                location.pathname === '/pricing'
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
              }`}
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                location.pathname.startsWith('/blog')
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/40 text-[#154D3F] dark:text-emerald-300 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
              }`}
            >
              Blog & Forensics
            </Link>
          </nav>

          {/* Header Controls & User State (Clean, Balanced Cluster) */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Theme Toggle Button */}
            <button
              id="desktop-theme-toggle"
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-slate-100/70 dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all shadow-xs hover:scale-105 cursor-pointer focus:outline-none"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Quick My Bookings Icon with Active Count Badge */}
            <Link 
              to="/account/bookings"
              title={activeBookingsCount > 0 ? `My Bookings (${activeBookingsCount} active)` : 'My Bookings'}
              className="relative w-9 h-9 rounded-full bg-slate-100/70 dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] text-slate-600 dark:text-slate-300 hover:text-[#154D3F] dark:hover:text-emerald-400 flex items-center justify-center transition-all shadow-xs hover:scale-105"
            >
              <CalendarCheck className="w-4 h-4" />
              {activeBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#154D3F] dark:bg-emerald-500 text-white dark:text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {activeBookingsCount}
                </span>
              )}
            </Link>

            {/* Primary CTA */}
            <Link to="/book/vehicle">
              <Button variant="primary" size="sm" className="shadow-xs font-bold px-4 h-9">
                Book Inspection
              </Button>
            </Link>

            {/* User Profile Dropdown */}
            {isAuthenticated && customer ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 pr-2.5 rounded-full border border-[#E5E9EB] dark:border-[#1E262E] bg-white dark:bg-[#12181E] hover:border-slate-300 dark:hover:border-slate-700 transition-all text-left shadow-xs cursor-pointer h-9"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-[#E8F5EE] dark:bg-[#154D3F] border border-[#CBEAD8] dark:border-emerald-600/40 text-[#154D3F] dark:text-emerald-300 text-xs font-black flex items-center justify-center shadow-xs">
                    {customerInitials}
                  </div>
                  <div className="hidden md:block leading-tight text-left">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>{customer.fullName.split(' ')[0]}</span>
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* Dropdown Popover */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#12181E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {customer.fullName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {customer.email}
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        {customer.phone}
                      </div>
                    </div>

                    <div className="p-1 space-y-0.5 text-xs font-semibold">
                      <Link
                        to="/account/bookings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <CalendarCheck className="w-4 h-4 text-[#154D3F] dark:text-emerald-400" />
                          <span>My Inspection Bookings</span>
                        </span>
                        {activeBookingsCount > 0 && (
                          <span className="px-1.5 py-0.2 text-[9px] font-bold bg-[#154D3F] text-white rounded-full">
                            {activeBookingsCount}
                          </span>
                        )}
                      </Link>

                      <Link
                        to="/account/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Profile & Contact Settings</span>
                      </Link>

                      <Link
                        to="/account/support"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Headphones className="w-4 h-4 text-slate-400" />
                        <span>Customer Support & FAQ</span>
                      </Link>

                      {/* Admin Ops Link Inside Dropdown for developer convenience */}
                      <a
                        href="http://127.0.0.1:3002/admin/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-[#154D3F] dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          <span>Admin Command Center</span>
                        </span>
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">Portal</span>
                      </a>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-bold text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-9">
                  <LogIn className="w-3.5 h-3.5 text-[#154D3F] dark:text-emerald-400" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-theme-toggle"
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#12181E] border border-slate-200 dark:border-[#1E262E] text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            </button>

            <Link to="/book/vehicle">
              <Button variant="primary" size="sm" className="text-xs px-3 py-1">
                Book
              </Button>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E5E9EB] dark:border-[#1E262E] bg-white dark:bg-[#0A0E12] px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          {isAuthenticated && customer ? (
            <div className="p-3 bg-[#E8F5EE] dark:bg-[#154D3F]/30 border border-[#CBEAD8] dark:border-emerald-600/30 rounded-2xl flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#154D3F] text-white font-bold text-xs flex items-center justify-center">
                  {customerInitials}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{customer.fullName}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{customer.phone}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-full hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3 h-3" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between mb-3">
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Have an existing inspection?</span>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="text-xs font-bold px-3 py-1.5">
                  <LogIn className="w-3.5 h-3.5 mr-1" /> Sign In
                </Button>
              </Link>
            </div>
          )}

          <div className="space-y-1">
            <Link
              to="/car-inspection"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                location.pathname === '/car-inspection'
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Car className="w-4 h-4 text-emerald-600" />
              <span>Car Inspection (200+ Pts)</span>
            </Link>

            <Link
              to="/bike-inspection"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                location.pathname === '/bike-inspection'
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Bike className="w-4 h-4 text-emerald-600" />
              <span>Bike Inspection (120+ Pts)</span>
            </Link>

            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                location.pathname === '/how-it-works'
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>How It Works</span>
            </Link>

            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                location.pathname === '/pricing'
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Transparent Pricing</span>
            </Link>

            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                location.pathname.startsWith('/blog')
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Inspection Blog & Forensics</span>
            </Link>

            <Link
              to="/sample-report"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                location.pathname === '/sample-report'
                  ? 'bg-[#E8F5EE] dark:bg-[#154D3F]/30 text-[#154D3F] dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Sample Report</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/account/bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60"
            >
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#154D3F] dark:text-emerald-400" /> My Bookings
              </span>
              {activeBookingsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#154D3F] text-white rounded-full">
                  {activeBookingsCount}
                </span>
              )}
            </Link>
            <Link to="/book/vehicle" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full font-bold">
                Book Inspection
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
