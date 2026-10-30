import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, CheckCircle2, Shield, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0E12] text-slate-300 pt-16 pb-12 border-t border-[#1E262E] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E262E]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-[#154D3F] border border-emerald-500/30 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-emerald-300 stroke-[2.4]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  Sahi<span className="text-emerald-400">Vahan</span>
                </span>
                <span className="text-[9px] uppercase font-bold text-emerald-400/90 tracking-wider mt-1">
                  Sahi Gaadi. Sahi Faisla.
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's premier digital platform for booking certified, unbiased pre-purchase inspections for used cars and motorcycles. We protect buyers from hidden accidents, flooded electronics, and manipulated odometers.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Strictly 100% Unbiased — Zero Dealership Commissions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified Automotive Engineers with Calibrated Gauges & OBD-II</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant Tamper-Proof Digital & PDF Inspection Dossiers</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/car-inspection" className="hover:text-emerald-400 transition-colors">Car Inspection (200+ Pts)</Link></li>
              <li><Link to="/bike-inspection" className="hover:text-emerald-400 transition-colors">Bike Inspection (120+ Pts)</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Transparent Pricing</Link></li>
              <li><Link to="/sample-report" className="hover:text-emerald-400 transition-colors">Interactive Sample Report</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Knowledge Hub & Blog</Link></li>
              <li><Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link to="/become-specialist" className="hover:text-emerald-400 transition-colors">Join Specialist Fleet</Link></li>
            </ul>
          </div>

          {/* Active Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Metro Hubs</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/cities/bengaluru" className="hover:text-emerald-400 transition-colors">Bengaluru (All Zones)</Link></li>
              <li><Link to="/cities/delhi-ncr" className="hover:text-emerald-400 transition-colors">Delhi-NCR & Gurugram</Link></li>
              <li><Link to="/cities/mumbai" className="hover:text-emerald-400 transition-colors">Mumbai & Navi Mumbai</Link></li>
              <li><Link to="/cities/hyderabad" className="hover:text-emerald-400 transition-colors">Hyderabad & Cyberabad</Link></li>
              <li><Link to="/cities/pune" className="hover:text-emerald-400 transition-colors">Pune & PCMC</Link></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trust & Policies</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About SahiVahan</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Customer Help Desk</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-emerald-400 transition-colors">Cancellation & Refund Policy</Link></li>
              <li><Link to="/inspection-limitations" className="hover:text-emerald-400 transition-colors">Inspection Limitations</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Notice</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Contact */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SahiVahan Mobility Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-400" /> support@sahivahan.com</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> 1800-123-SAHI (Toll Free)</span>
          </div>
        </div>

        {/* Statutory Limitation Disclaimer */}
        <div className="mt-6 pt-4 border-t border-[#1E262E] text-[11px] text-slate-500 leading-relaxed text-center">
          <span className="font-bold text-slate-400">Statutory Notice:</span> SahiVahan pre-purchase inspections are non-invasive mechanical and electronic evaluations conducted on-site without component disassembly. Our reports empower informed purchase decisions but do not constitute an insurance policy, title guarantee, or warranty against unobservable latent defects.
        </div>
      </div>
    </footer>
  );
};
