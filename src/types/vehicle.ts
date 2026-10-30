export type VehicleType = 'car' | 'bike';

export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Hybrid' | 'Electric';

export type TransmissionType = 'Manual' | 'Automatic' | 'AMT' | 'CVT' | 'DCT/DSG';

export type ComplexityLevel = 'standard' | 'complex' | 'luxury_or_specialist';

export interface VehicleVariant {
  id: string;
  name: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  engineDisplacementCc?: number;
  complexity: ComplexityLevel;
}

export interface VehicleModel {
  id: string;
  name: string;
  type: VehicleType;
  makeId: string;
  bodyType: string; // e.g. Hatchback, Sedan, Compact SUV, Mid-size SUV, Cruiser, Commuter, Scooter
  variants: VehicleVariant[];
  yearsSupported: number[];
}

export interface VehicleMake {
  id: string;
  name: string;
  type: VehicleType;
  logoUrl?: string;
  popularModels: string[];
}
