import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const CancellationPolicyPage: React.FC = () => {
  return (
    <div className="space-y-10 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-800">
      <div className="space-y-3">
        <Badge variant="teal">Policy Version v1.0-2026</Badge>
        <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
          Cancellation, Rescheduling & Refund Policy
        </h1>
        <p className="text-sm text-slate-600">
          Effective from 1 October 2026. SahiVahan operates under a fair, stage-based cancellation structure that protects both customers and verified specialists.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <Card className="border-teal-200 bg-teal-50/40 p-5 space-y-2">
          <div className="font-bold text-teal-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" /> Transparent Upfront Calculation
          </div>
          <p className="text-xs text-teal-950">
            Whenever you initiate a cancellation or reschedule from your customer dashboard, the exact refund amount and any applicable deduction fee are displayed on-screen for your review before you confirm.
          </p>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-900">1. Stage-Based Cancellation Schedule</h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-subtle">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Service Stage</th>
                  <th className="px-4 py-3">Refund Outcome</th>
                  <th className="px-4 py-3">Deduction Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-semibold text-navy-900">Before Specialist Assigned</td>
                  <td className="px-4 py-3 text-emerald-700 font-bold">100% Full Refund</td>
                  <td className="px-4 py-3 text-slate-500">₹0 fee. Cancelled immediately.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-navy-900">Specialist Assigned (&gt; 12 Hours Before Slot)</td>
                  <td className="px-4 py-3 text-emerald-700 font-bold">100% minus ₹150</td>
                  <td className="px-4 py-3 text-slate-500">Nominal payment gateway & administrative processing fee.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-navy-900">Specialist Assigned (&lt; 12 Hours Before Slot)</td>
                  <td className="px-4 py-3 text-amber-700 font-bold">80% Refund</td>
                  <td className="px-4 py-3 text-slate-500">₹300 reservation retainer credited to assigned specialist.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-navy-900">Specialist En Route or Arrived on Site</td>
                  <td className="px-4 py-3 text-rose-700 font-bold">50% Refund</td>
                  <td className="px-4 py-3 text-slate-500">50% deducted to cover travel & attendance call-out allowance.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-navy-900">Inspection Started (Checklist Active)</td>
                  <td className="px-4 py-3 text-rose-700 font-bold">0% Refund (Non-refundable)</td>
                  <td className="px-4 py-3 text-slate-500">Inspection labor, OBD diagnostics, and reporting are completed.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-900">2. Free Rescheduling Policy</h2>
          <p>
            Customers may reschedule an inspection up to <strong>4 hours before</strong> the scheduled appointment window without any fee or penalty, subject to slot availability. Rescheduling within 4 hours is permitted subject to a nominal ₹150 slot adjustment fee.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-900">3. Seller Unavailable or Refusal at Site</h2>
          <p>
            If our specialist arrives at the agreed location and the vehicle seller is unavailable, unreachable after 3 verified contact attempts, or refuses physical access to the vehicle:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>The specialist records geotagged arrival evidence and timestamped photos of the location.</li>
            <li>Our operations team contacts the customer immediately.</li>
            <li>The customer is entitled to <strong>one free reschedule</strong> within 48 hours, OR cancellation under the on-site call-out policy (50% refund).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-900">4. Specialist No-Show & Grace Period</h2>
          <p>
            In the rare event that an assigned specialist is delayed beyond a 30-minute grace period without prior notice, SahiVahan will either arrange a priority replacement specialist or provide the customer with an <strong>immediate 100% refund plus a ₹500 service credit</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
