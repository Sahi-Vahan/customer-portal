import React from 'react';
import { Badge } from '../../components/common/Badge';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-8 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-800 leading-relaxed text-sm">
      <div className="space-y-2">
        <Badge variant="navy">Terms of Service</Badge>
        <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">Terms & Conditions of Service</h1>
        <p className="text-xs text-slate-500">Last updated: 15 October 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">1. Acceptance of Terms</h2>
        <p>
          By booking an inspection on SahiVahan ("Platform"), you agree to these Terms of Service. SahiVahan provides an independent marketplace connecting customers with verified automotive inspection specialists.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">2. Customer Responsibilities & Seller Permission</h2>
        <p>
          The customer is solely responsible for ensuring that the seller of the target vehicle has granted permission for an on-site mechanical and electronic diagnostic inspection at the scheduled time and location.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">3. Nature of Inspection Service</h2>
        <p>
          SahiVahan inspections are non-destructive, non-invasive condition assessments. Our specialists do not dismantle engines, disassemble gearboxes, or remove body panels. Reports are technical opinions valid strictly at the time and date of inspection.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">4. Payment, Taxes & Invoicing</h2>
        <p>
          All service packages are payable in Indian Rupees (INR) through authorized online payment methods and are subject to 18% Goods and Services Tax (GST). A tax invoice is generated upon payment confirmation.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">5. Limitation of Liability</h2>
        <p>
          SahiVahan and its inspection specialists shall not be liable for any indirect, incidental, or consequential damages resulting from subsequent vehicle purchase decisions, unobservable latent mechanical wear, or seller misrepresentations.
        </p>
      </section>
    </div>
  );
};
