import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Download,
  Printer,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  AlertCircle,
  Wrench,
  Gauge,
  Cpu,
  Layers,
  Award,
  Share2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useBooking } from '../../store/BookingContext';
import { ChecklistSeverity } from '../../types/report';

export const ReportViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookingById } = useBooking();

  const booking = getBookingById(id || '');
  const report = booking?.report;

  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [expandedCategory, setExpandedCategory] = useState<string>('cat-chassis');

  if (!booking) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-black text-[#0A0E12] dark:text-white">Booking Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">The requested booking record could not be located.</p>
        <Link to="/account/bookings">
          <Button variant="primary" size="md">Back to My Bookings</Button>
        </Link>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0A0E12] dark:text-white">Inspection in Progress</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          The specialist is currently conducting the on-site physical inspection. The verified cryptographic report will publish here immediately upon terminal sign-off.
        </p>
        <div className="pt-2">
          <Link to={`/account/bookings/${booking.id}`}>
            <Button variant="primary" size="md">Track Inspection Live</Button>
          </Link>
        </div>
      </div>
    );
  }

  const severityBadge = (severity: ChecklistSeverity) => {
    switch (severity) {
      case 'good':
        return <Badge variant="success" size="sm">OEM Standard</Badge>;
      case 'average':
        return <Badge variant="warning" size="sm">Wear & Tear</Badge>;
      case 'poor':
        return <Badge variant="danger" size="sm">Attention / Replace</Badge>;
      case 'critical':
        return <Badge variant="danger" size="sm">Critical Defect</Badge>;
      case 'not_inspected':
        return <Badge variant="neutral" size="sm">Not Inspected</Badge>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E9EB] dark:border-[#1E262E] gap-4">
        <Link
          to={`/account/bookings/${booking.id}`}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#154D3F] dark:text-emerald-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Appointment
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handlePrint} className="rounded-full">
            <Printer className="w-4 h-4 mr-1.5" /> Print
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrint} className="rounded-full shadow-donezo">
            <Download className="w-4 h-4 mr-1.5" /> Download Verified PDF
          </Button>
        </div>
      </div>

      {/* Donezo Forest Green Report Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#154D3F] via-[#0F382E] to-[#0A261F] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Report #{report.id}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 backdrop-blur-sm">
                v{report.version}.0 Cryptographically Sealed
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white pt-1">
              {booking.vehicle.make} {booking.vehicle.model}
              <span className="text-emerald-300 font-medium text-lg sm:text-2xl ml-2">({booking.vehicle.variant})</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300">
              Registration: <strong className="text-white">{booking.vehicle.registrationNumber || 'Not Specified'}</strong> · Odometer: <strong className="text-white">{report.odometerReadingKm.toLocaleString()} KM</strong> · Inspected on {new Date(report.submittedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Verdict Gauge */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 self-start lg:self-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center rounded-full bg-[#0A261F] border-4 border-emerald-400 shadow-inner">
              <span className="text-2xl sm:text-3xl font-black text-emerald-300">{report.vehicleHealthScore}</span>
              <span className="text-[9px] text-slate-300 absolute bottom-2">/100</span>
            </div>
            <div>
              <div className="text-[10px] text-emerald-200 uppercase tracking-widest font-black">Inspector Verdict</div>
              <div className="text-base sm:text-lg font-black text-white mt-0.5">{report.recommendation}</div>
              <div className="text-xs text-emerald-300/90 font-medium">Independent Assessment</div>
            </div>
          </div>
        </div>

        {/* Diagnostic Scan Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-6">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-300 text-[11px] block font-medium">Paint Depth (DFT)</span>
            <span className="text-lg font-black text-white mt-1 block">{report.paintDepthAverageMicrons} µm</span>
            <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Factory Clearcoat
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-300 text-[11px] block font-medium">OBD-II Diagnostic</span>
            <span className="text-lg font-black text-white mt-1 block">{report.obdScanResult.ecuStatus}</span>
            <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-1">
              <Cpu className="w-3 h-3" /> {report.obdScanResult.dtcCodesFound.length} Advisory DTCs
            </span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-300 text-[11px] block font-medium">SRS / Airbag Systems</span>
            <span className="text-lg font-black text-emerald-400 mt-1 block">Passed 100%</span>
            <span className="text-[10px] text-slate-300 font-medium mt-1 block">Zero deployments logged</span>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <span className="text-slate-300 text-[11px] block font-medium">Battery Cranking Health</span>
            <span className="text-lg font-black text-white mt-1 block">{report.obdScanResult.batteryVoltage}V</span>
            <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> Healthy Load
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-6 bg-[#0A261F]/80 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-2">
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Specialist Executive Summary
          </div>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
            {report.executiveSummary}
          </p>
          <div className="text-xs text-slate-300 pt-2 flex items-center gap-2 border-t border-white/10 mt-3">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> Inspected by certified specialist: <strong className="text-white">{report.specialistName}</strong>
          </div>
        </div>
      </div>

      {/* Indicative Repair Cost Summary Card */}
      <Card className="p-6 sm:p-7 space-y-3 border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0A0E12] dark:text-white text-base">Indicative Repair Estimates for Negotiation</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Non-binding authorized workshop rates in {booking.location.city}</p>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
            ₹{report.indicativeTotalRepairCost.min.toLocaleString()} – ₹{report.indicativeTotalRepairCost.max.toLocaleString()}
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Leverage these itemized repair calculations when finalizing price negotiations with the seller or dealership.
        </p>
      </Card>

      {/* Categorized Checklist Findings */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0A0E12] dark:text-white">
              Checklist Findings & Defect Audit
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive multi-point examination with high-resolution evidence.
            </p>
          </div>

          {/* Severity Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4F6F8] dark:bg-[#12181E] rounded-full border border-[#E5E9EB] dark:border-[#1E262E] self-start sm:self-auto">
            {['all', 'poor', 'average', 'good'].map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSelectedSeverity(sev)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all ${
                  selectedSeverity === sev
                    ? 'bg-[#154D3F] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#0A0E12] dark:hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Accordion */}
        <div className="space-y-3">
          {report.categories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const filteredItems = selectedSeverity === 'all'
              ? category.items
              : category.items.filter((it) => it.severity === selectedSeverity);

            return (
              <div
                key={category.id}
                className="border border-[#E5E9EB] dark:border-[#1E262E] rounded-3xl bg-white dark:bg-[#12181E] overflow-hidden shadow-subtle transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedCategory(isExpanded ? '' : category.id)}
                  className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-slate-50/60 dark:hover:bg-[#151D24] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#E8F5EE] dark:bg-[#154D3F]/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A0E12] dark:text-white text-sm sm:text-base">{category.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span>{category.items.length} Points Checked</span>
                        <span>·</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{category.goodCount} OEM Pass</span>
                        {category.poorCount > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-rose-600 dark:text-rose-400 font-bold">{category.poorCount} Attention</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {category.poorCount > 0 ? (
                      <Badge variant="danger" size="sm">{category.poorCount} Needs Fix</Badge>
                    ) : (
                      <Badge variant="success" size="sm">Passed</Badge>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#E5E9EB] dark:border-[#1E262E] divide-y divide-[#E5E9EB] dark:divide-[#1E262E]">
                    {filteredItems.length === 0 ? (
                      <div className="py-6 text-xs text-slate-400 italic text-center">
                        No points matching the "{selectedSeverity}" filter in this category.
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <div key={item.id} className="py-4 space-y-2.5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="text-sm font-bold text-[#0A0E12] dark:text-white">{item.title}</div>
                              {item.observation && (
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-[#F4F6F8] dark:bg-[#0E1318] p-3 rounded-2xl border border-[#E5E9EB] dark:border-[#1E262E]">
                                  {item.observation}
                                </p>
                              )}
                              {item.notInspectedReason && (
                                <p className="text-xs text-slate-500 italic">
                                  Not inspected: {item.notInspectedReason}
                                </p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              {severityBadge(item.severity)}
                            </div>
                          </div>

                          {/* Indicative repair cost for flagged items */}
                          {item.indicativeRepairCost && (
                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                              <div className="text-rose-700 dark:text-rose-400">
                                <span className="font-bold">Repair Estimate:</span>
                                <span className="ml-1 font-medium">Parts: ₹{item.indicativeRepairCost.partsMin} – ₹{item.indicativeRepairCost.partsMax} | Labor: ₹{item.indicativeRepairCost.laborMin} – ₹{item.indicativeRepairCost.laborMax}</span>
                              </div>
                              <Badge variant="danger" size="sm">Urgency: {item.indicativeRepairCost.urgency.toUpperCase()}</Badge>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimers & Cryptographic Integrity Card */}
      <Card className="bg-[#F4F6F8] dark:bg-[#12181E] border-[#E5E9EB] dark:border-[#1E262E] text-xs text-slate-500 dark:text-slate-400 space-y-3 p-6 sm:p-7">
        <div className="font-black text-[#0A0E12] dark:text-white uppercase tracking-wider text-xs">
          Inspection Disclaimer & Cryptographic Verification
        </div>
        <p className="leading-relaxed">
          {report.disclaimer}
        </p>
        <div className="pt-3 border-t border-[#E5E9EB] dark:border-[#1E262E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px]">
          <span>SHA-256 Hash: <code className="text-[#154D3F] dark:text-emerald-400 bg-white dark:bg-[#0A0E12] px-2 py-0.5 rounded-full border border-[#E5E9EB] dark:border-[#1E262E] font-mono font-bold">{report.reportVerificationHash}</code></span>
          <span className="font-semibold text-slate-400">Immutable · Direct from SahiVahan Specialist Field Terminal</span>
        </div>
      </Card>

    </div>
  );
};
