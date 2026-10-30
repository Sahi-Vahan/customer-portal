import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  Download,
  Printer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Car,
  ChevronDown,
  ChevronRight,
  Gauge,
  Cpu,
  Layers,
  Wrench,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { SAMPLE_CAR_REPORT } from '../../api/mockData';
import { ChecklistSeverity } from '../../types/report';

export const SampleReportPage: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [expandedCategory, setExpandedCategory] = useState<string>('cat-engine');

  const report = SAMPLE_CAR_REPORT;

  const severityBadge = (severity: ChecklistSeverity) => {
    switch (severity) {
      case 'good':
        return <Badge variant="success" size="sm">Good / OEM</Badge>;
      case 'average':
        return <Badge variant="warning" size="sm">Average / Wear</Badge>;
      case 'poor':
        return <Badge variant="danger" size="sm">Poor / Replace</Badge>;
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
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Sample Demo Banner */}
      <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 px-5 py-3 rounded-2xl font-medium text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>OFFICIAL INTERACTIVE SAMPLE REPORT — Generated using Fictional Demonstration Data (BRD WEB-005)</span>
        </div>
        <Link to="/book/vehicle">
          <Button variant="primary" size="sm" className="whitespace-nowrap text-xs py-1.5 shadow-sm">
            Book Real Inspection
          </Button>
        </Link>
      </div>

      {/* Report Header Card */}
      <div className="bg-gradient-to-br from-[#0B251E] via-[#154D3F] to-[#071B15] text-white rounded-3xl p-6 sm:p-8 shadow-donezo border border-[#1E3A30] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="teal">Report ID: {report.id}</Badge>
              <Badge variant="neutral" className="bg-white/10 text-white/90 border-0">Version {report.version}.0 (Immutable)</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight pt-1">
              2021 Hyundai Creta 1.5 Turbo SX(O) DCT
            </h1>
            <div className="text-xs text-emerald-100/70">
              Registration: KA 03 MX 4921 · Odometer: {report.odometerReadingKm.toLocaleString()} KM · Inspected on {new Date(report.submittedAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="glass"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4 mr-1 text-emerald-300" />}
            >
              Print
            </Button>
            <Button
              variant="white"
              size="sm"
              onClick={handlePrint}
              className="shadow-md font-extrabold"
              leftIcon={<Download className="w-4 h-4 mr-1 text-[#154D3F]" />}
            >
              Download Verified PDF
            </Button>
          </div>
        </div>

        {/* Health Score & Recommendation Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Health Score Circle */}
          <div className="md:col-span-4 flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/15">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-full bg-black/20 border-4 border-emerald-400 shadow-lg shadow-emerald-500/20">
              <span className="text-2xl font-black text-emerald-300">{report.vehicleHealthScore}</span>
              <span className="text-[10px] text-white/70 absolute bottom-2">/100</span>
            </div>
            <div>
              <div className="text-xs text-emerald-200/80 uppercase tracking-wider font-semibold">Vehicle Health Score</div>
              <div className="text-base font-bold text-white mt-0.5">{report.recommendation}</div>
              <div className="text-[11px] text-emerald-300 mt-1 font-medium">Structurally Sound · Minor Wear</div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
              <div className="text-xs text-white/70">Avg Paint Depth</div>
              <div className="text-base font-bold text-white mt-1">{report.paintDepthAverageMicrons} µm</div>
              <div className="text-[10px] text-emerald-300 font-semibold">Factory OEM Spec</div>
            </div>

            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
              <div className="text-xs text-white/70">OBD Computer Scan</div>
              <div className="text-base font-bold text-amber-300 mt-1">1 Advisory Code</div>
              <div className="text-[10px] text-white/60">P0141 (Stored history)</div>
            </div>

            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 col-span-2 sm:col-span-1">
              <div className="text-xs text-white/70">Indicative Repair Cost</div>
              <div className="text-base font-bold text-rose-300 mt-1">
                ₹{report.indicativeTotalRepairCost.min.toLocaleString()} - ₹{report.indicativeTotalRepairCost.max.toLocaleString()}
              </div>
              <div className="text-[10px] text-white/60">Front brake pads & hose</div>
            </div>
          </div>

        </div>

        {/* Executive Summary Box */}
        <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2">
          <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Specialist Executive Summary
          </div>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
            {report.executiveSummary}
          </p>
          <div className="text-[11px] text-emerald-200/70 pt-1">
            Inspected by: <strong className="text-white">{report.specialistName}</strong>
          </div>
        </div>
      </div>

      {/* Category Checklists Breakdown */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">200+ Point Inspection Findings</h2>
          
          {/* Severity Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Filter:</span>
            {['all', 'poor', 'average', 'good'].map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSelectedSeverity(sev)}
                className={`text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider transition-colors ${
                  selectedSeverity === sev
                    ? 'bg-[#154D3F] dark:bg-emerald-500 text-white shadow-sm'
                    : 'bg-white dark:bg-[#12181E] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E262E] hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {report.categories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const filteredItems = selectedSeverity === 'all'
              ? category.items
              : category.items.filter((it) => it.severity === selectedSeverity);

            return (
              <div key={category.id} className="border border-slate-200 dark:border-[#1E262E] rounded-3xl bg-white dark:bg-[#12181E] overflow-hidden shadow-donezo">
                <button
                  type="button"
                  onClick={() => setExpandedCategory(isExpanded ? '' : category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{category.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span>{category.items.length} Points Inspected</span>
                        <span>·</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{category.goodCount} Good</span>
                        {category.poorCount > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-rose-600 dark:text-rose-400 font-bold">{category.poorCount} Attention Needed</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {category.poorCount > 0 ? (
                      <Badge variant="danger" size="sm">{category.poorCount} Attention</Badge>
                    ) : (
                      <Badge variant="success" size="sm">Passed</Badge>
                    )}
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredItems.length === 0 ? (
                      <div className="py-4 text-xs text-slate-400 italic text-center">
                        No items matching "{selectedSeverity}" filter in this section.
                      </div>
                    ) : (
                      filteredItems.map((item) => (
                        <div key={item.id} className="py-3.5 space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</div>
                              {item.observation && (
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed bg-slate-50 dark:bg-[#0A0E12] p-2.5 rounded-xl border border-slate-200 dark:border-[#1E262E]">
                                  {item.observation}
                                </p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              {severityBadge(item.severity)}
                            </div>
                          </div>

                          {/* Indicative repair cost card if applicable */}
                          {item.indicativeRepairCost && (
                            <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                              <div className="text-rose-900 dark:text-rose-300">
                                <span className="font-bold">Indicative Estimated Repair Cost:</span>
                                <span className="ml-1">Parts: ₹{item.indicativeRepairCost.partsMin} - ₹{item.indicativeRepairCost.partsMax} | Labor: ₹{item.indicativeRepairCost.laborMin} - ₹{item.indicativeRepairCost.laborMax}</span>
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

      {/* Disclaimers and Verification Hash */}
      <Card className="text-xs text-slate-500 dark:text-slate-400 space-y-3">
        <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Legal Disclaimer & Cryptographic Verification
        </div>
        <p className="leading-relaxed">
          {report.disclaimer}
        </p>
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
          <span>SHA-256 Verification Hash: <code className="text-[#154D3F] dark:text-emerald-400 bg-slate-100 dark:bg-black px-1.5 py-0.5 rounded font-mono font-bold">{report.reportVerificationHash}</code></span>
          <span className="text-slate-500">Delivered directly via SahiVahan Specialist Inspection Terminal</span>
        </div>
      </Card>
    </div>
  );
};
