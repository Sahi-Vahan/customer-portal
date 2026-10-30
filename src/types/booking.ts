import { VehicleType, FuelType, TransmissionType, ComplexityLevel } from './vehicle';
import { PricingPolicySnapshot } from './pricing';
import { SpecialistSummary, VisitEvidence } from './specialist';
import { InspectionReport } from './report';

export type BookingStatus =
  | 'draft'
  | 'awaiting_payment'
  | 'confirmed'
  | 'awaiting_assignment'
  | 'assigned'
  | 'accepted'
  | 'en_route'
  | 'arrived'
  | 'inspecting'
  | 'report_submitted'
  | 'completed'
  | 'cancelled';

export type PaymentStatus =
  | 'unpaid'
  | 'pending'
  | 'captured'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export interface CustomerContact {
  fullName: string;
  phone: string;
  email: string;
}

export interface InspectionLocation {
  city: string;
  area: string;
  addressLine: string;
  landmark?: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  sellerContact: {
    name: string;
    phone: string;
    sellerRelationship: 'owner' | 'dealer' | 'agent' | 'friend';
    sellerPermissionConfirmed: boolean;
    askingPrice?: string | number;
  };
  accessNotes?: string;
}

export interface AppointmentSlot {
  date: string; // YYYY-MM-DD
  slotWindow: string; // e.g. "09:00 AM - 11:00 AM"
  slotId: string;
}

export interface BookingVehicleData {
  type: VehicleType;
  make: string;
  model: string;
  variant: string;
  manufacturingYear: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  registrationNumber?: string;
  complexity: ComplexityLevel;
}

export interface BookingRecord {
  id: string; // e.g. "SV-2026-7841"
  createdAt: string;
  updatedAt: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  paymentMethod?: string;
  customer: CustomerContact;
  vehicle: BookingVehicleData;
  location: InspectionLocation;
  appointment: AppointmentSlot;
  pricing: PricingPolicySnapshot;
  specialist?: SpecialistSummary;
  visitEvidence?: VisitEvidence;
  report?: InspectionReport;
  cancellationDetails?: {
    cancelledAt: string;
    cancelledBy: 'customer' | 'admin' | 'specialist';
    reason: string;
    feeDeducted: number;
    refundAmount: number;
    refundStatus: 'initiated' | 'processed' | 'failed';
  };
  rescheduleHistory?: {
    previousDate: string;
    previousSlot: string;
    rescheduledAt: string;
    reason?: string;
  }[];
}
