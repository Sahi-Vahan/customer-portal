import React from 'react';
import { Badge } from '../../components/common/Badge';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-8 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-800 leading-relaxed text-sm">
      <div className="space-y-2">
        <Badge variant="teal">Privacy Notice</Badge>
        <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: 15 October 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">1. Data Collection & Purpose</h2>
        <p>
          We collect your contact details (phone, email, name) and the vehicle location and seller contact information solely for the operational fulfillment of your booked vehicle inspection.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">2. Seller Information Privacy (BRD CUS-003)</h2>
        <p>
          Seller contact details and vehicle access notes are treated with strict confidentiality. Access is restricted exclusively to the authorized assigned specialist and platform operations personnel for attendance verification. Seller information is never sold or used for telemarketing.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">3. Inspection Reports & Photographs</h2>
        <p>
          All photographs, OBD telemetry, and checklist findings recorded during the inspection are private assets owned by the booking customer. Reports are accessible only via authenticated customer credentials or authorized shared links.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-navy-900">4. Payment Security</h2>
        <p>
          Payment processing is handled via PCI-DSS compliant gateways. SahiVahan does not store your credit/debit card CVV numbers or banking passwords.
        </p>
      </section>
    </div>
  );
};
