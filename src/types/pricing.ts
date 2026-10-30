import { VehicleType, ComplexityLevel } from './vehicle';

export interface PriceBreakdown {
  basePrice: number;
  complexitySurcharge: number;
  travelZoneFee: number;
  taxableAmount: number;
  gstRatePercent: number; // 18%
  gstAmount: number;
  discountAmount: number;
  totalPayableAmount: number;
  currency: string;
}

export interface PricingPolicySnapshot {
  policyVersion: string;
  effectiveDate: string;
  vehicleType: VehicleType;
  complexity: ComplexityLevel;
  pincode: string;
  city: string;
  breakdown: PriceBreakdown;
  inclusions: string[];
  exclusions: string[];
  cancellationSchedule: {
    stage: string;
    description: string;
    refundPercent: number;
    feeAmount: number;
  }[];
}
