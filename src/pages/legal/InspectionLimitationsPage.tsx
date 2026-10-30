import React from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const InspectionLimitationsPage: React.FC = () => {
  return (
    <div className="space-y-10 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-slate-800">
      <div className="space-y-3">
        <Badge variant="teal">Mandatory Disclosure</Badge>
        <h1 className="text-3xl font-extrabold text-navy-900 tracking-tight">
          Inspection Limitations & Scope Disclaimers
        </h1>
        <p className="text-sm text-slate-600">
          Clear understanding of what a professional on-site pre-purchase inspection can and cannot evaluate.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <Card className="border-amber-200 bg-amber-50/40 p-5 space-y-2">
          <div className="font-bold text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" /> Non-Invasive Examination Notice
          </div>
          <p className="text-xs text-amber-950">
            SahiVahan inspections are strictly non-invasive visual, electronic (OBD-II), and physical examinations conducted on-site without component disassembly, engine head dismantling, or hazardous vehicle testing.
          </p>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-900">1. What Our Inspection Delivers</h2>
          <p>Our certified technicians perform rigorous, objective diagnostics to detect:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Structural damage, repainting, and concealed accident history using digital ultrasonic paint depth gauges.</li>
            <li>Stored electronic Diagnostic Trouble Codes (DTCs), sensor faults, and battery health via professional OBD-II scanners.</li>
            <li>Observable mechanical leaks, fluid contamination, engine cold start behavior, and smoke indicators.</li>
            <li>Brake friction wear, tyre tread depth, suspension damping rebound, and steering responsiveness.</li>
            <li>Dynamic straight-line tracking, transmission upshift/downshift quality, and braking stability during a structured road test.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-900">2. Technical Limitations & Non-Covered Items</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>Latent Internal Defects:</strong> We cannot predict internal metal fatigue, hidden microscopic gearbox gear pitting, or future component failures that present no symptoms at the time of appointment.</li>
            <li><strong>Inaccessible Components:</strong> Enclosed or covered parts (such as internal timing chains, clutch pressure plates inside the bellhousing, or fuel tank interiors) cannot be physically disassembled on-site.</li>
            <li><strong>Legal & Title Verification:</strong> SahiVahan reports vehicle physical condition only. Customers must verify registration certificates, hypothecation status, active loans, and pending traffic challans through the official Parivahan/mParivahan government portal.</li>
            <li><strong>Indicative Repair Estimates:</strong> Repair figures in the report represent average multi-brand workshop market estimates for planning purposes only and do not constitute a fixed price quote or repair contract.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-900">3. No Guarantee or Warranty</h2>
          <p>
            The SahiVahan report does not represent a mechanical breakdown insurance policy, warranty against future defects, or buy-back guarantee. It serves as an independent technical advisory to empower the buyer's negotiation.
          </p>
        </section>
      </div>
    </div>
  );
};
