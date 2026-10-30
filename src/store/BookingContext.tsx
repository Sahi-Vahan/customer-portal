import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingRecord, BookingVehicleData, InspectionLocation, AppointmentSlot } from '../types/booking';
import { PricingPolicySnapshot } from '../types/pricing';
import { InspectionFeedback, SupportTicket } from '../types/feedback';
import { INITIAL_BOOKINGS, calculateInspectionPrice } from '../api/mockData';

interface DraftBooking {
  vehicle?: BookingVehicleData;
  location?: InspectionLocation;
  appointment?: AppointmentSlot;
  pricing?: PricingPolicySnapshot;
  termsAccepted?: boolean;
}

interface BookingContextType {
  bookings: BookingRecord[];
  draftBooking: DraftBooking;
  updateDraftVehicle: (vehicle: BookingVehicleData) => void;
  updateDraftLocation: (location: InspectionLocation) => void;
  updateDraftAppointment: (appointment: AppointmentSlot) => void;
  setTermsAccepted: (accepted: boolean) => void;
  calculateAndSetPricing: () => PricingPolicySnapshot | null;
  completePaymentAndCreateBooking: (paymentMethod: string) => Promise<BookingRecord>;
  getBookingById: (id: string) => BookingRecord | undefined;
  cancelBooking: (bookingId: string, reason: string) => { success: boolean; refundAmount: number; feeDeducted: number };
  rescheduleBooking: (bookingId: string, newDate: string, newSlot: AppointmentSlot) => boolean;
  submitFeedback: (feedback: Omit<InspectionFeedback, 'id' | 'createdAt' | 'moderationStatus'>) => void;
  feedbacks: InspectionFeedback[];
  submitSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => SupportTicket;
  supportTickets: SupportTicket[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('sv_customer_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BOOKINGS;
      }
    }
    return INITIAL_BOOKINGS;
  });

  const [draftBooking, setDraftBooking] = useState<DraftBooking>(() => {
    const saved = localStorage.getItem('sv_draft_booking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const [feedbacks, setFeedbacks] = useState<InspectionFeedback[]>(() => {
    const saved = localStorage.getItem('sv_feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('sv_support_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sv_customer_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('sv_draft_booking', JSON.stringify(draftBooking));
  }, [draftBooking]);

  useEffect(() => {
    localStorage.setItem('sv_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('sv_support_tickets', JSON.stringify(supportTickets));
  }, [supportTickets]);

  const updateDraftVehicle = (vehicle: BookingVehicleData) => {
    setDraftBooking(prev => ({ ...prev, vehicle }));
  };

  const updateDraftLocation = (location: InspectionLocation) => {
    setDraftBooking(prev => ({ ...prev, location }));
  };

  const updateDraftAppointment = (appointment: AppointmentSlot) => {
    setDraftBooking(prev => ({ ...prev, appointment }));
  };

  const setTermsAccepted = (accepted: boolean) => {
    setDraftBooking(prev => ({ ...prev, termsAccepted: accepted }));
  };

  const calculateAndSetPricing = (): PricingPolicySnapshot | null => {
    if (!draftBooking.vehicle || !draftBooking.location) return null;

    const priceCalc = calculateInspectionPrice({
      vehicleType: draftBooking.vehicle.type,
      complexity: draftBooking.vehicle.complexity,
      pincode: draftBooking.location.pincode
    });

    const inclusions = draftBooking.vehicle.type === 'car' ? [
      'Comprehensive 200+ Point Mechanical, Structural & Diagnostic Check',
      'Specialist OBD-II live ECU scanning & DTC analysis',
      'Digital Ultrasonic Paint Depth Gauge test across all panels',
      'Structured 30-min road test (engine, brakes, transmission)',
      '40+ High-definition timestamped inspection photographs',
      'Indicative repair cost estimates with non-binding disclaimer',
      'Tamper-evident cryptographically signed PDF Report'
    ] : [
      'Comprehensive 120+ Point Motorcycle Diagnostic Check',
      'Chassis alignment & fork stem straightness verification',
      'Engine compression check & clutch drag test',
      'Brake rotor runout & chain-sprocket health test',
      '25+ HD timestamped photos and indicative repair estimate'
    ];

    const exclusions = [
      'No invasive engine disassembly or cylinder head removal',
      'No road tests exceeding local speed limits or on unsafe terrain',
      'No legal title/hypothecation guarantees (buyer must verify Vahan)'
    ];

    const total = priceCalc.totalPayableAmount;

    const cancellationSchedule = [
      { stage: 'Before Specialist Assigned', description: 'Immediate 100% full refund', refundPercent: 100, feeAmount: 0 },
      { stage: 'Specialist Assigned (> 12h before slot)', description: 'Full refund minus ₹150 processing fee', refundPercent: 95, feeAmount: 150 },
      { stage: 'Specialist Assigned (< 12h before slot)', description: '80% refund (₹300 reservation retainer)', refundPercent: 80, feeAmount: 300 },
      { stage: 'Specialist En Route or Arrived', description: '50% refund (covers call-out travel allowance)', refundPercent: 50, feeAmount: Number((total * 0.5).toFixed(2)) },
      { stage: 'Inspection Started', description: 'Non-refundable once checklist begins', refundPercent: 0, feeAmount: total }
    ];

    const snapshot: PricingPolicySnapshot = {
      policyVersion: 'v1.0-2026',
      effectiveDate: '2026-10-01',
      vehicleType: draftBooking.vehicle.type,
      complexity: draftBooking.vehicle.complexity,
      pincode: draftBooking.location.pincode,
      city: draftBooking.location.city,
      breakdown: priceCalc,
      inclusions,
      exclusions,
      cancellationSchedule
    };

    setDraftBooking(prev => ({ ...prev, pricing: snapshot }));
    return snapshot;
  };

  const completePaymentAndCreateBooking = async (paymentMethod: string): Promise<BookingRecord> => {
    if (!draftBooking.vehicle || !draftBooking.location || !draftBooking.appointment || !draftBooking.pricing) {
      throw new Error('Incomplete booking information');
    }

    const uniqueNum = Math.floor(1000 + Math.random() * 9000);
    const newBookingId = `SV-2026-${uniqueNum}`;

    const newBooking: BookingRecord = {
      id: newBookingId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'awaiting_assignment',
      paymentStatus: 'captured',
      paymentId: `pay_${Math.random().toString(36).substring(2, 12)}`,
      paymentMethod,
      customer: {
        fullName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        email: 'rahul.sharma@example.com'
      },
      vehicle: draftBooking.vehicle,
      location: draftBooking.location,
      appointment: draftBooking.appointment,
      pricing: draftBooking.pricing
    };

    setBookings(prev => [newBooking, ...prev]);
    // Clear draft booking
    setDraftBooking({});
    localStorage.removeItem('sv_draft_booking');
    return newBooking;
  };

  const getBookingById = (id: string) => {
    return bookings.find(b => b.id === id);
  };

  const cancelBooking = (bookingId: string, reason: string) => {
    const booking = getBookingById(bookingId);
    if (!booking) return { success: false, refundAmount: 0, feeDeducted: 0 };

    const totalPaid = booking.pricing.breakdown.totalPayableAmount;
    let feeDeducted = 0;
    let refundAmount = totalPaid;

    // Calculate fee per stage
    if (booking.status === 'awaiting_assignment') {
      feeDeducted = 0;
      refundAmount = totalPaid;
    } else if (booking.status === 'assigned' || booking.status === 'accepted') {
      feeDeducted = 150;
      refundAmount = Math.max(0, totalPaid - feeDeducted);
    } else if (booking.status === 'en_route' || booking.status === 'arrived') {
      feeDeducted = Number((totalPaid * 0.5).toFixed(2));
      refundAmount = Math.max(0, totalPaid - feeDeducted);
    } else if (booking.status === 'inspecting' || booking.status === 'report_submitted' || booking.status === 'completed') {
      feeDeducted = totalPaid;
      refundAmount = 0;
    }

    const updated: BookingRecord = {
      ...booking,
      status: 'cancelled',
      paymentStatus: refundAmount > 0 ? 'partially_refunded' : 'captured',
      updatedAt: new Date().toISOString(),
      cancellationDetails: {
        cancelledAt: new Date().toISOString(),
        cancelledBy: 'customer',
        reason,
        feeDeducted,
        refundAmount,
        refundStatus: refundAmount > 0 ? 'initiated' : 'processed'
      }
    };

    setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
    return { success: true, refundAmount, feeDeducted };
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newSlot: AppointmentSlot) => {
    const booking = getBookingById(bookingId);
    if (!booking) return false;

    const previousDate = booking.appointment.date;
    const previousSlot = booking.appointment.slotWindow;

    const updated: BookingRecord = {
      ...booking,
      appointment: {
        ...newSlot,
        date: newDate
      },
      updatedAt: new Date().toISOString(),
      rescheduleHistory: [
        ...(booking.rescheduleHistory || []),
        {
          previousDate,
          previousSlot,
          rescheduledAt: new Date().toISOString(),
          reason: 'Customer initiated date & slot adjustment'
        }
      ]
    };

    setBookings(prev => prev.map(b => b.id === bookingId ? updated : b));
    return true;
  };

  const submitFeedback = (data: Omit<InspectionFeedback, 'id' | 'createdAt' | 'moderationStatus'>) => {
    const newFeedback: InspectionFeedback = {
      ...data,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString(),
      moderationStatus: 'approved'
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  const submitSupportTicket = (data: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'status'>): SupportTicket => {
    const newTicket: SupportTicket = {
      ...data,
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'open',
      responses: [
        {
          from: 'support',
          message: 'Thank you for reaching out to SahiVahan Support. An operations specialist has been assigned to your inquiry and will update you shortly.',
          timestamp: new Date().toISOString()
        }
      ]
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        draftBooking,
        updateDraftVehicle,
        updateDraftLocation,
        updateDraftAppointment,
        setTermsAccepted,
        calculateAndSetPricing,
        completePaymentAndCreateBooking,
        getBookingById,
        cancelBooking,
        rescheduleBooking,
        submitFeedback,
        feedbacks,
        submitSupportTicket,
        supportTickets
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
