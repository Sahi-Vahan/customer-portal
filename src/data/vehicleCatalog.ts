import { VehicleType, FuelType, TransmissionType, ComplexityLevel } from '../types/vehicle';

export interface CatalogVariant {
  name: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  complexity: ComplexityLevel;
}

export interface CatalogModel {
  name: string;
  bodyType: string;
  defaultComplexity: ComplexityLevel;
  variants: CatalogVariant[];
}

export interface CatalogMake {
  id: string;
  name: string;
  type: VehicleType;
  models: CatalogModel[];
}

export const INDIAN_VEHICLE_CATALOG: CatalogMake[] = [
  // ================= CARS (4-WHEELERS) =================
  {
    id: 'maruti',
    name: 'Maruti Suzuki',
    type: 'car',
    models: [
      {
        name: 'Swift',
        bodyType: 'Hatchback',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 DualJet LXi', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 DualJet VXi', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 DualJet ZXi+ AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' },
          { name: '1.2 VXi CNG', fuelType: 'CNG', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'Baleno',
        bodyType: 'Premium Hatchback',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 Sigma', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 Delta AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' },
          { name: '1.2 Alpha AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' }
        ]
      },
      {
        name: 'Brezza',
        bodyType: 'Compact SUV',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.5 LXi MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.5 ZXi+ 6AT', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'standard' },
          { name: '1.5 ZXi CNG', fuelType: 'CNG', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'Grand Vitara',
        bodyType: 'Mid-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.5 Smart Hybrid Delta AT', fuelType: 'Hybrid', transmission: 'Automatic', complexity: 'complex' },
          { name: '1.5 Strong Hybrid Alpha+ e-CVT', fuelType: 'Hybrid', transmission: 'CVT', complexity: 'complex' },
          { name: '1.5 AllGrip AWD Alpha MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' }
        ]
      },
      {
        name: 'Dzire',
        bodyType: 'Compact Sedan',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 LXi', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 VXi AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' },
          { name: '1.2 ZXi+ AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' }
        ]
      }
    ]
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    type: 'car',
    models: [
      {
        name: 'Creta',
        bodyType: 'Mid-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.5 Petrol EX MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.5 Petrol SX (O) IVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'complex' },
          { name: '1.5 Turbo GDi SX (O) DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' },
          { name: '1.5 CRDi Diesel SX (O) AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Venue',
        bodyType: 'Compact SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.2 Kappa S(O) MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.0 Turbo SX (O) DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' },
          { name: '1.5 CRDi SX MT', fuelType: 'Diesel', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'i20',
        bodyType: 'Premium Hatchback',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 Magna MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 Asta (O) IVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'standard' },
          { name: 'N Line 1.0 Turbo DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' }
        ]
      },
      {
        name: 'Verna',
        bodyType: 'Mid-size Sedan',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.5 MPi SX IVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'standard' },
          { name: '1.5 Turbo GDi SX (O) DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' }
        ]
      },
      {
        name: 'Tucson',
        bodyType: 'Premium SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.0 CRDi Signature AWD 8AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'tata',
    name: 'Tata Motors',
    type: 'car',
    models: [
      {
        name: 'Nexon',
        bodyType: 'Compact SUV',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 Turbo Pure MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 Creative AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' },
          { name: '1.2 Fearless+ DCA (DCT)', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' },
          { name: '1.5 Diesel Fearless MT', fuelType: 'Diesel', transmission: 'Manual', complexity: 'standard' },
          { name: 'Nexon.ev Long Range Empowered+', fuelType: 'Electric', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Punch',
        bodyType: 'Micro SUV',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 Pure MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 Accomplished AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' },
          { name: 'Punch.ev Long Range', fuelType: 'Electric', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Harrier',
        bodyType: 'Mid-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.0 Kryotec Pure+ AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' },
          { name: '2.0 Kryotec Fearless+ Dark AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Safari',
        bodyType: 'Full-size 7-Seater SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.0 Kryotec Accomplished+ AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Altroz',
        bodyType: 'Hatchback',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 Revotron XM MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.2 DCA Automatic', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'mahindra',
    name: 'Mahindra',
    type: 'car',
    models: [
      {
        name: 'XUV700',
        bodyType: 'Full-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.0 mStallion Turbo AX5 MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' },
          { name: '2.2 mHawk AX7L Luxury AT AWD', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Thar',
        bodyType: '4x4 Lifestyle SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.0 Turbo Petrol LX 4WD AT', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'complex' },
          { name: '2.2 mHawk Diesel LX 4WD MT', fuelType: 'Diesel', transmission: 'Manual', complexity: 'complex' },
          { name: 'Thar Roxx 4x4 AX7L AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Scorpio-N',
        bodyType: 'Full-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.2 mHawk Z8L 4WD AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' },
          { name: '2.0 Turbo Petrol Z8 MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' }
        ]
      },
      {
        name: 'XUV3XO',
        bodyType: 'Compact SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.2 TGDi AX7L AT', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'kia',
    name: 'Kia',
    type: 'car',
    models: [
      {
        name: 'Seltos',
        bodyType: 'Mid-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.5 HTX IVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'complex' },
          { name: '1.5 Turbo GTX+ DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' },
          { name: '1.5 CRDi X-Line AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Sonet',
        bodyType: 'Compact SUV',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 HTK+ MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.0 Turbo GTX+ 7DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' }
        ]
      },
      {
        name: 'Carens',
        bodyType: 'MPV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.5 Turbo Luxury Plus DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'toyota',
    name: 'Toyota',
    type: 'car',
    models: [
      {
        name: 'Innova Crysta / Hycross',
        bodyType: 'Premium MPV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.4 GX Diesel MT', fuelType: 'Diesel', transmission: 'Manual', complexity: 'complex' },
          { name: 'Hycross 2.0 Strong Hybrid ZX(O) e-CVT', fuelType: 'Hybrid', transmission: 'CVT', complexity: 'complex' }
        ]
      },
      {
        name: 'Fortuner',
        bodyType: 'Heavy 4x4 SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '2.8 4x4 Diesel AT Legender', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' },
          { name: '2.7 Petrol 4x2 AT', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Urban Cruiser Hyryder',
        bodyType: 'Mid-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.5 Strong Hybrid V e-CVT', fuelType: 'Hybrid', transmission: 'CVT', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'honda',
    name: 'Honda',
    type: 'car',
    models: [
      {
        name: 'City',
        bodyType: 'Sedan',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.5 i-VTEC V MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: '1.5 i-VTEC ZX CVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'standard' },
          { name: 'City e:HEV Strong Hybrid ZX', fuelType: 'Hybrid', transmission: 'CVT', complexity: 'complex' }
        ]
      },
      {
        name: 'Elevate',
        bodyType: 'Mid-size SUV',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.5 i-VTEC ZX CVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'standard' }
        ]
      },
      {
        name: 'Amaze',
        bodyType: 'Compact Sedan',
        defaultComplexity: 'standard',
        variants: [
          { name: '1.2 VX CVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'standard' }
        ]
      }
    ]
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    type: 'car',
    models: [
      {
        name: 'Taigun',
        bodyType: 'Mid-size SUV',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.0 TSI Highline 6AT', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'complex' },
          { name: '1.5 TSI GT Plus 7-Speed DSG', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' }
        ]
      },
      {
        name: 'Virtus',
        bodyType: 'Sedan',
        defaultComplexity: 'complex',
        variants: [
          { name: '1.5 TSI GT Plus DSG', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'bmw',
    name: 'BMW',
    type: 'car',
    models: [
      {
        name: '3 Series',
        bodyType: 'Luxury Sedan',
        defaultComplexity: 'luxury_or_specialist',
        variants: [
          { name: '330i M Sport Steptronic', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'luxury_or_specialist' },
          { name: '320d Luxury Line', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'luxury_or_specialist' },
          { name: 'M340i xDrive 3.0 Turbo', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'luxury_or_specialist' }
        ]
      },
      {
        name: 'X1',
        bodyType: 'Luxury Compact SUV',
        defaultComplexity: 'luxury_or_specialist',
        variants: [
          { name: 'sDrive 18i xLine 7DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'luxury_or_specialist' },
          { name: 'sDrive 18d M Sport AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'luxury_or_specialist' }
        ]
      },
      {
        name: '5 Series',
        bodyType: 'Luxury Executive Sedan',
        defaultComplexity: 'luxury_or_specialist',
        variants: [
          { name: '530d M Sport 6-Cylinder', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'luxury_or_specialist' }
        ]
      }
    ]
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    type: 'car',
    models: [
      {
        name: 'C-Class',
        bodyType: 'Luxury Sedan',
        defaultComplexity: 'luxury_or_specialist',
        variants: [
          { name: 'C 200 Avantgarde 9G-Tronic', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'luxury_or_specialist' },
          { name: 'C 220d AMG Line', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'luxury_or_specialist' }
        ]
      },
      {
        name: 'GLA / GLC',
        bodyType: 'Luxury SUV',
        defaultComplexity: 'luxury_or_specialist',
        variants: [
          { name: 'GLC 300 4MATIC 9G-Tronic', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'luxury_or_specialist' }
        ]
      }
    ]
  },

  // ================= BIKES (2-WHEELERS) =================
  {
    id: 'royalenfield',
    name: 'Royal Enfield',
    type: 'bike',
    models: [
      {
        name: 'Classic 350',
        bodyType: 'Modern Classic',
        defaultComplexity: 'standard',
        variants: [
          { name: 'Halcyon Series Single-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: 'Signals Dual-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: 'Dark Stealth Black Dual-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'Hunter 350',
        bodyType: 'Roadster',
        defaultComplexity: 'standard',
        variants: [
          { name: 'Retro Factory', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: 'Metro Dapper / Rebel Dual ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'Himalayan 450',
        bodyType: 'Adventure Tourer',
        defaultComplexity: 'complex',
        variants: [
          { name: 'Sherpa 450 Base', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' },
          { name: 'Kamet White Tubeless Cross-Spoke', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' }
        ]
      },
      {
        name: 'Interceptor 650',
        bodyType: 'Parallel-Twin Roadster',
        defaultComplexity: 'complex',
        variants: [
          { name: 'Canyon Red / Mark 2 Chrome Twin ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    type: 'bike',
    models: [
      {
        name: 'YZF R15 V4',
        bodyType: 'Super Sport',
        defaultComplexity: 'standard',
        variants: [
          { name: 'R15 V4 Standard Quickshifter', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
          { name: 'R15M Special Edition', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'MT-15 V2',
        bodyType: 'Naked Streetfighter',
        defaultComplexity: 'standard',
        variants: [
          { name: 'MT-15 Deluxe Dual-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'FZ-S FI V4',
        bodyType: 'Commuter Sport',
        defaultComplexity: 'standard',
        variants: [
          { name: 'FZ-S FI Deluxe Single ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
        ]
      }
    ]
  },
  {
    id: 'ktm',
    name: 'KTM',
    type: 'bike',
    models: [
      {
        name: 'Duke 390',
        bodyType: 'Performance Streetfighter',
        defaultComplexity: 'complex',
        variants: [
          { name: 'Duke 390 Gen 3 Cornering ABS & Launch Control', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' }
        ]
      },
      {
        name: 'Duke 200',
        bodyType: 'Naked Sport',
        defaultComplexity: 'standard',
        variants: [
          { name: 'Duke 200 Dual-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
        ]
      },
      {
        name: 'RC 390',
        bodyType: 'Track Supersport',
        defaultComplexity: 'complex',
        variants: [
          { name: 'RC 390 GP Edition with WP Apex Adjustable', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' }
        ]
      }
    ]
  },
  {
    id: 'honda-bike',
    name: 'Honda 2-Wheelers',
    type: 'bike',
    models: [
      {
        name: 'Activa 6G / 125',
        bodyType: 'Commuter Scooter',
        defaultComplexity: 'standard',
        variants: [
          { name: 'Activa 6G Deluxe Smart Key', fuelType: 'Petrol', transmission: 'CVT', complexity: 'standard' },
          { name: 'Activa 125 Disc Smart Key', fuelType: 'Petrol', transmission: 'CVT', complexity: 'standard' }
        ]
      },
      {
        name: 'Hness CB350',
        bodyType: 'Classic Roadster',
        defaultComplexity: 'standard',
        variants: [
          { name: 'DLX Pro Dual-Channel ABS with Bluetooth', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
        ]
      }
    ]
  },
  {
    id: 'ather',
    name: 'Ather Energy',
    type: 'bike',
    models: [
      {
        name: '450X Gen 3',
        bodyType: 'Smart Electric Scooter',
        defaultComplexity: 'complex',
        variants: [
          { name: '450X 3.7 kWh Pro Pack Warp Mode', fuelType: 'Electric', transmission: 'Automatic', complexity: 'complex' },
          { name: '450X 2.9 kWh Core', fuelType: 'Electric', transmission: 'Automatic', complexity: 'complex' }
        ]
      },
      {
        name: 'Rizta',
        bodyType: 'Family Electric Scooter',
        defaultComplexity: 'complex',
        variants: [
          { name: 'Rizta Z 3.7 kWh with SkidControl', fuelType: 'Electric', transmission: 'Automatic', complexity: 'complex' }
        ]
      }
    ]
  }
];

export function getMakesByType(type: VehicleType): CatalogMake[] {
  return INDIAN_VEHICLE_CATALOG.filter(m => m.type === type);
}

export function getModelsByMake(type: VehicleType, makeName: string): CatalogModel[] {
  const make = INDIAN_VEHICLE_CATALOG.find(
    m => m.type === type && (m.name.toLowerCase() === makeName.toLowerCase() || m.id === makeName.toLowerCase())
  );
  return make ? make.models : [];
}

export function getVariantsByModel(type: VehicleType, makeName: string, modelName: string): CatalogVariant[] {
  const models = getModelsByMake(type, makeName);
  const model = models.find(m => m.name.toLowerCase() === modelName.toLowerCase());
  return model ? model.variants : [];
}
