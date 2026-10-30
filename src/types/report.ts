export type ChecklistSeverity = 'good' | 'average' | 'poor' | 'critical' | 'not_inspected';

export interface ChecklistItemFinding {
  id: string;
  category: string;
  title: string;
  severity: ChecklistSeverity;
  observation?: string;
  notInspectedReason?: string;
  evidencePhotoUrls?: string[];
  indicativeRepairCost?: {
    partsMin: number;
    partsMax: number;
    laborMin: number;
    laborMax: number;
    urgency: 'immediate' | 'medium' | 'advisory';
  };
}

export interface ChecklistCategory {
  id: string;
  name: string;
  iconName: string;
  totalPoints: number;
  goodCount: number;
  averageCount: number;
  poorCount: number;
  criticalCount: number;
  notInspectedCount: number;
  items: ChecklistItemFinding[];
}

export interface InspectionReport {
  id: string;
  bookingId: string;
  version: number;
  submittedAt: string;
  specialistId: string;
  specialistName: string;
  vehicleHealthScore: number; // 0 - 100
  recommendation: 'Strong Buy' | 'Fair Deal with Minor Repairs' | 'Negotiate Heavily' | 'Walk Away / High Risk';
  executiveSummary: string;
  odometerReadingKm: number;
  paintDepthAverageMicrons: number;
  obdScanResult: {
    dtcCodesFound: string[];
    batteryVoltage: number;
    ecuStatus: string;
    airbagSystemStatus: string;
    absStatus: string;
  };
  roadTestNotes: string;
  disclaimer: string;
  pdfDownloadUrl: string;
  reportVerificationHash: string;
  categories: ChecklistCategory[];
  indicativeTotalRepairCost: {
    min: number;
    max: number;
  };
}
