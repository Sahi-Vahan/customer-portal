import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <Badge variant="teal">Our Mission</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bringing Transparency & Trust to Used Vehicle Buying in India
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          “Sahi Gaadi. Sahi Faisla.” — Empowering used car and bike buyers with certified engineering inspections, unbiased reports, and complete peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3 p-6 text-center shadow-donezo">
          <div className="w-12 h-12 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">100% Independent</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We accept zero dealer referral kickbacks or commissions. We work solely for you, the vehicle buyer.
          </p>
        </Card>

        <Card className="space-y-3 p-6 text-center shadow-donezo">
          <div className="w-12 h-12 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Certified Specialists</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Former service managers and master diagnostic technicians equipped with specialized ultrasonic gauges and OBD scanners.
          </p>
        </Card>

        <Card className="space-y-3 p-6 text-center shadow-donezo">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">25,000+ Happy Buyers</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Trusted by prospective vehicle buyers across Bengaluru, Delhi-NCR, Mumbai, Hyderabad, and Pune.
          </p>
        </Card>
      </div>

      <Card className="p-8 space-y-4 shadow-donezo">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Why SahiVahan Was Founded</h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The used vehicle market in India is plagued by information asymmetry. Odometer tampering, accident concealment, structural chassis welding, and flood damage touch-ups routinely trap unsuspecting buyers into financial nightmares. SahiVahan was built to democratize professional diagnostic expertise, putting the power of an expert mechanic in every buyer's pocket.
        </p>
      </Card>
    </div>
  );
};
