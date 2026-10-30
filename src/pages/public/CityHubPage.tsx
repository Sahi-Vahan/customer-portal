import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, PhoneCall, AlertCircle } from 'lucide-react';
import { SERVICE_CITIES } from '../../api/mockData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

export const CityHubPage: React.FC = () => {
  const { city: citySlug } = useParams<{ city: string }>();
  const [testPincode, setTestPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const cityData = SERVICE_CITIES.find(
    (c) => c.slug === citySlug || c.name.toLowerCase() === (citySlug || '').toLowerCase()
  ) || SERVICE_CITIES[0];

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityData.supportedPincodes.includes(testPincode.trim())) {
      setPincodeStatus('Available! Standard same-day and next-day appointment slots open.');
    } else {
      setPincodeStatus('Currently outside primary coverage. Contact support for customized travel dispatch.');
    }
  };

  return (
    <div className="space-y-12 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* City Hero */}
      <div className="bg-gradient-to-br from-[#0B251E] via-[#154D3F] to-[#071B15] text-white rounded-3xl p-8 sm:p-12 shadow-donezo border border-[#1E3A30] relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <Badge variant="teal">Verified On-Site Inspections in {cityData.name}</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Used Car & Bike Inspections in {cityData.name} ({cityData.state})
          </h1>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            Buying a used vehicle anywhere in {cityData.name}? Our team of {cityData.activeSpecialistsCount} certified technical inspectors travels directly to the seller's doorstep across {cityData.name}.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/book/vehicle">
              <Button variant="white" size="lg" className="shadow-lg font-extrabold px-8 text-sm" rightIcon={<ArrowRight className="w-4 h-4 ml-1 text-[#154D3F]" />}>
                Book Inspection in {cityData.name}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* City Coverage Areas & Centers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-4 p-6 sm:p-8 shadow-donezo">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2.5 tracking-tight">
            <div className="w-8 h-8 rounded-full bg-[#154D3F]/10 dark:bg-emerald-500/20 text-[#154D3F] dark:text-emerald-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            Key Neighborhoods & Inspection Hubs
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Specialists stationed across these key zones ensure punctuality and prompt arrival:
          </p>
          <div className="grid grid-cols-2 gap-2.5 text-xs pt-1">
            {cityData.inspectionCenters.map((center, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-slate-900 dark:text-white font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="truncate">{center}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Pincode Lookup Form */}
        <Card className="space-y-4 p-6 sm:p-8 shadow-donezo">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Verify Your Pincode in {cityData.name}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Check if your inspection address falls within our standard service zone.
          </p>
          <form onSubmit={handlePincodeCheck} className="space-y-3">
            <div className="flex gap-2.5">
              <input
                type="text"
                maxLength={6}
                value={testPincode}
                onChange={(e) => setTestPincode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-[#0A0E12] border border-slate-200 dark:border-[#1E262E] rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#154D3F] dark:focus:ring-emerald-500 transition-colors"
              />
              <Button variant="primary" size="md" type="submit" className="shadow-sm">Verify</Button>
            </div>
            {pincodeStatus && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>{pincodeStatus}</span>
              </div>
            )}
          </form>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Supported sample pincodes: {cityData.supportedPincodes.slice(0, 5).join(', ')}...
          </div>
        </Card>
      </div>

      {/* Switch City Hubs */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Explore Other SahiVahan Service Metros:</h3>
        <div className="flex flex-wrap gap-2">
          {SERVICE_CITIES.map((c) => (
            <Link key={c.slug} to={`/cities/${c.slug}`}>
              <Badge
                variant={c.slug === cityData.slug ? 'teal' : 'neutral'}
                className="py-1.5 px-3.5 text-xs cursor-pointer hover:opacity-80 transition-opacity"
              >
                {c.name} ({c.activeSpecialistsCount} Inspectors)
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
