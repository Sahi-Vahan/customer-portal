import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, MapPin, Search, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Vehicle & Schedule On-Site Slot',
      desc: 'Select Car or Bike, input the vehicle model, and enter the seller’s location and contact details. Choose a 2-hour appointment window that suits the seller.',
      icon: <Calendar className="w-6 h-6 text-[#154D3F] dark:text-emerald-400" />
    },
    {
      num: '02',
      title: 'Technician Dispatched with Diagnostics',
      desc: 'An authorized specialist is assigned to the booking. Upon arrival at the vehicle, the specialist captures verification photos (selfie with car + number plate) to prove attendance.',
      icon: <MapPin className="w-6 h-6 text-[#154D3F] dark:text-emerald-400" />
    },
    {
      num: '03',
      title: 'Comprehensive 200+ Point Examination',
      desc: 'The specialist conducts ultrasonic paint depth readings, runs live OBD-II diagnostic scans, evaluates structural aprons and chassis welds, tests engine health, and performs a road test.',
      icon: <Search className="w-6 h-6 text-[#154D3F] dark:text-emerald-400" />
    },
    {
      num: '04',
      title: 'Instant Report Delivery & Negotiation Power',
      desc: 'The complete report with overall Vehicle Health Score, itemized checklist findings, defect photographs, and indicative repair estimates is delivered instantly to your customer dashboard.',
      icon: <FileCheck className="w-6 h-6 text-[#154D3F] dark:text-emerald-400" />
    }
  ];

  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="teal">Simple & Completely Transparent</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How SahiVahan Protects Your Vehicle Purchase
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          From online booking to instant technical report delivery — here is how our inspection process works.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((st) => (
          <Card key={st.num} className="p-8 space-y-4 relative overflow-hidden shadow-donezo">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#154D3F]/10 dark:bg-emerald-500/20 flex items-center justify-center">
                {st.icon}
              </div>
              <span className="text-4xl font-black text-slate-200 dark:text-slate-800">{st.num}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{st.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{st.desc}</p>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-br from-[#0B251E] via-[#154D3F] to-[#071B15] text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 max-w-4xl mx-auto shadow-donezo border border-[#1E3A30]">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready to inspect a vehicle?</h3>
        <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto">
          Book online in under 2 minutes. Transparent stage-based refunds and instant scheduling.
        </p>
        <div className="pt-2">
          <Link to="/book/vehicle">
            <Button variant="white" size="lg" className="shadow-lg font-extrabold px-8 text-sm" rightIcon={<ArrowRight className="w-4 h-4 ml-1 text-[#154D3F]" />}>
              Book Inspection Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
