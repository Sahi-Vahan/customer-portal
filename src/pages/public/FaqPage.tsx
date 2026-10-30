import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqList = [
    {
      q: 'How does SahiVahan work?',
      a: 'You book an inspection online by entering the vehicle model, seller address, and choosing an appointment slot. SahiVahan dispatches a verified automotive specialist to the seller’s location equipped with ultrasonic paint depth gauges, OBD scanners, and mechanical diagnostic tools. Once completed, your interactive 200+ point report is delivered instantly online with high-res photos and indicative repair estimates.'
    },
    {
      q: 'Do I need to be present during the vehicle inspection?',
      a: 'No, your physical presence is completely optional! Many of our customers book inspections for vehicles located in other cities or while at work. Our specialist takes attendance proof photos upon arrival (selfie with vehicle + number plate) and uploads everything live. You receive the report online immediately.'
    },
    {
      q: 'What if the seller refuses the inspection after the specialist arrives?',
      a: 'We always advise buyers to confirm inspection agreement with the seller beforehand. If the seller refuses access upon arrival or is unreachable after 3 verified attempts, the specialist logs arrival evidence. Under our policy, you are offered one free reschedule within 48 hours or cancellation with a 50% call-out fee deduction.'
    },
    {
      q: 'What equipment do your inspectors use?',
      a: 'Every SahiVahan inspector uses calibrated digital ultrasonic paint depth gauges (measures paint/putty in microns), professional OBD-II diagnostic scanners (retrieves ECU/TCU/ABS/Airbag codes and true mileage metrics), battery load testers, digital tyre tread depth gauges, and high-intensity inspection lighting.'
    },
    {
      q: 'Can SahiVahan verify vehicle title, loans, and challans?',
      a: 'Our inspection focuses on physical, structural, and electronic condition. Legal ownership, hypothecation status (active bank loans), NOC validity, and pending traffic challans must be verified by the customer through the official government Parivahan or mParivahan portal.'
    },
    {
      q: 'What is your cancellation and refund policy?',
      a: 'Before a specialist is assigned, you receive a 100% full refund. Once assigned (> 12 hours before slot), a nominal ₹150 processing fee applies. If cancelled within 12 hours of the slot, an 80% refund is processed. If cancelled after specialist arrival or en route, a 50% call-out fee applies. The exact refund is calculated and displayed on your screen before you confirm.'
    }
  ];

  return (
    <div className="space-y-10 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <Badge variant="teal">Help Center</Badge>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Everything you need to know about SahiVahan pre-purchase vehicle inspections.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqList.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="border border-slate-200 dark:border-[#1E262E] rounded-3xl bg-white dark:bg-[#12181E] overflow-hidden shadow-donezo transition-all">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-[#154D3F] dark:hover:text-emerald-400 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
