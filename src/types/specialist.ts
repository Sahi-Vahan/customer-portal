export interface SpecialistSummary {
  id: string;
  fullName: string;
  badgeNumber: string;
  avatarUrl: string;
  rating: number; // e.g. 4.9
  inspectionsCompleted: number;
  yearsExperience: number;
  certifications: string[];
  vehicleSpecialties: string[];
  phoneMasked: string;
}

export interface VisitEvidence {
  specialistPhotoWithVehicleUrl: string;
  numberPlatePhotoUrl: string;
  odometerPhotoUrl: string;
  arrivedAt: string; // ISO timestamp
  latitude?: number;
  longitude?: number;
}
