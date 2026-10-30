import { VehicleMake, VehicleModel } from '../types/vehicle';
import { InspectionReport } from '../types/report';
import { BookingRecord } from '../types/booking';
import { SpecialistSummary } from '../types/specialist';

export const VEHICLE_MAKES: VehicleMake[] = [
  // Cars
  {
    id: 'maruti',
    name: 'Maruti Suzuki',
    type: 'car',
    popularModels: ['Swift', 'Baleno', 'Brezza', 'Grand Vitara']
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    type: 'car',
    popularModels: ['Creta', 'i20', 'Venue', 'Verna']
  },
  {
    id: 'tata',
    name: 'Tata Motors',
    type: 'car',
    popularModels: ['Nexon', 'Punch', 'Harrier', 'Nexon EV']
  },
  {
    id: 'mahindra',
    name: 'Mahindra',
    type: 'car',
    popularModels: ['XUV700', 'Thar', 'Scorpio-N']
  },
  {
    id: 'kia',
    name: 'Kia',
    type: 'car',
    popularModels: ['Seltos', 'Sonet', 'Carens']
  },
  {
    id: 'honda',
    name: 'Honda',
    type: 'car',
    popularModels: ['City', 'Amaze', 'Elevate']
  },
  {
    id: 'toyota',
    name: 'Toyota',
    type: 'car',
    popularModels: ['Innova Crysta', 'Fortuner', 'Hyryder']
  },
  {
    id: 'bmw',
    name: 'BMW',
    type: 'car',
    popularModels: ['3 Series', 'X1', '5 Series']
  },
  // Bikes
  {
    id: 'royalenfield',
    name: 'Royal Enfield',
    type: 'bike',
    popularModels: ['Classic 350', 'Hunter 350', 'Himalayan 450', 'Meteor 350']
  },
  {
    id: 'yamaha',
    name: 'Yamaha',
    type: 'bike',
    popularModels: ['YZF R15 V4', 'MT-15 V2', 'FZ-S FI']
  },
  {
    id: 'bajaj',
    name: 'Bajaj Auto',
    type: 'bike',
    popularModels: ['Pulsar NS200', 'Pulsar 150', 'Dominar 400']
  },
  {
    id: 'tvs',
    name: 'TVS Motor',
    type: 'bike',
    popularModels: ['Apache RTR 160 4V', 'Raider 125', 'Jupiter 125']
  },
  {
    id: 'honda-bike',
    name: 'Honda 2-Wheelers',
    type: 'bike',
    popularModels: ['Activa 6G', 'Hness CB350', 'Shine 125']
  },
  {
    id: 'ather',
    name: 'Ather Energy',
    type: 'bike',
    popularModels: ['450X Gen 3', 'Rizta']
  },
  {
    id: 'ktm',
    name: 'KTM',
    type: 'bike',
    popularModels: ['Duke 200', 'Duke 390', 'RC 390']
  }
];

export const VEHICLE_MODELS: VehicleModel[] = [
  // Hyundai Creta
  {
    id: 'hyundai-creta',
    name: 'Creta',
    type: 'car',
    makeId: 'hyundai',
    bodyType: 'Mid-size SUV',
    yearsSupported: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    variants: [
      { id: 'creta-e', name: '1.5 Petrol E', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 'creta-ex', name: '1.5 Petrol EX', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 'creta-sx-ivt', name: '1.5 Petrol SX IVT', fuelType: 'Petrol', transmission: 'CVT', complexity: 'complex' },
      { id: 'creta-sxo-turbo', name: '1.5 Turbo Petrol SX(O) DCT', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' },
      { id: 'creta-crdi-at', name: '1.5 CRDi Diesel SX(O) AT', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
    ]
  },
  // Maruti Swift
  {
    id: 'maruti-swift',
    name: 'Swift',
    type: 'car',
    makeId: 'maruti',
    bodyType: 'Hatchback',
    yearsSupported: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    variants: [
      { id: 'swift-lxi', name: '1.2 DualJet LXi', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 'swift-vxi', name: '1.2 DualJet VXi', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 'swift-zxi-amt', name: '1.2 DualJet ZXi+ AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' },
      { id: 'swift-cng', name: '1.2 VXi CNG', fuelType: 'CNG', transmission: 'Manual', complexity: 'standard' }
    ]
  },
  // Tata Nexon
  {
    id: 'tata-nexon',
    name: 'Nexon',
    type: 'car',
    makeId: 'tata',
    bodyType: 'Compact SUV',
    yearsSupported: [2019, 2020, 2021, 2022, 2023, 2024],
    variants: [
      { id: 'nexon-pure', name: '1.2 Turbo Pure', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 'nexon-creative-amt', name: '1.2 Creative AMT', fuelType: 'Petrol', transmission: 'AMT', complexity: 'standard' },
      { id: 'nexon-fearless-dct', name: '1.2 Fearless+ DCA (DCT)', fuelType: 'Petrol', transmission: 'DCT/DSG', complexity: 'complex' },
      { id: 'nexon-ev-longrange', name: 'EV Long Range Empowered+', fuelType: 'Electric', transmission: 'Automatic', complexity: 'complex' }
    ]
  },
  // Mahindra XUV700
  {
    id: 'mahindra-xuv700',
    name: 'XUV700',
    type: 'car',
    makeId: 'mahindra',
    bodyType: 'Full-size SUV',
    yearsSupported: [2021, 2022, 2023, 2024],
    variants: [
      { id: 'xuv700-ax5-petrol', name: '2.0 Turbo AX5 Petrol MT', fuelType: 'Petrol', transmission: 'Manual', complexity: 'complex' },
      { id: 'xuv700-ax7l-diesel-at', name: '2.2 mHawk AX7L Luxury AT AWD', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'complex' }
    ]
  },
  // BMW 3 Series
  {
    id: 'bmw-3series',
    name: '3 Series',
    type: 'car',
    makeId: 'bmw',
    bodyType: 'Luxury Sedan',
    yearsSupported: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    variants: [
      { id: 'bmw-330i-msport', name: '330i M Sport Steptronic', fuelType: 'Petrol', transmission: 'Automatic', complexity: 'luxury_or_specialist' },
      { id: 'bmw-320d-lux', name: '320d Luxury Line', fuelType: 'Diesel', transmission: 'Automatic', complexity: 'luxury_or_specialist' }
    ]
  },
  // Royal Enfield Classic 350
  {
    id: 're-classic350',
    name: 'Classic 350',
    type: 'bike',
    makeId: 'royalenfield',
    bodyType: 'Modern Classic Cruiser',
    yearsSupported: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    variants: [
      { id: 're-c350-halcyon', name: 'Halcyon Series Single-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 're-c350-signals', name: 'Signals Dual-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 're-c350-dark', name: 'Dark Stealth Black Dual-Channel ABS', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
    ]
  },
  // Yamaha R15
  {
    id: 'yamaha-r15',
    name: 'YZF R15 V4',
    type: 'bike',
    makeId: 'yamaha',
    bodyType: 'Super Sport',
    yearsSupported: [2019, 2020, 2021, 2022, 2023, 2024],
    variants: [
      { id: 'r15-v4-std', name: 'R15 V4 Standard Dual-Channel ABS with Quickshifter', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' },
      { id: 'r15-m', name: 'R15M Special Edition', fuelType: 'Petrol', transmission: 'Manual', complexity: 'standard' }
    ]
  },
  // Ather 450X
  {
    id: 'ather-450x',
    name: '450X Gen 3',
    type: 'bike',
    makeId: 'ather',
    bodyType: 'Smart Electric Scooter',
    yearsSupported: [2021, 2022, 2023, 2024],
    variants: [
      { id: 'ather-450x-3-7', name: '450X 3.7 kWh Pro Pack', fuelType: 'Electric', transmission: 'Automatic', complexity: 'complex' }
    ]
  }
];

export const SERVICE_CITIES = [
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    activeSpecialistsCount: 38,
    inspectionCenters: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Electronic City', 'Hebbal', 'JP Nagar'],
    supportedPincodes: ['560001', '560002', '560034', '560037', '560068', '560100', '560102', '560103', '560076', '560095'],
    travelFeeStandardPincodes: ['560001', '560034', '560102'],
    travelFeeOuterPincodes: ['560100', '560068'] // +₹150
  },
  {
    slug: 'delhi-ncr',
    name: 'Delhi-NCR',
    state: 'Delhi / Haryana / UP',
    activeSpecialistsCount: 45,
    inspectionCenters: ['Connaught Place', 'South Extension', 'Dwarka', 'Gurugram Sector 29', 'Noida Sector 62', 'Faridabad'],
    supportedPincodes: ['110001', '110016', '110020', '122001', '122002', '201301', '201303', '121001'],
    travelFeeStandardPincodes: ['110001', '110016', '122001'],
    travelFeeOuterPincodes: ['201303', '121001']
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    activeSpecialistsCount: 42,
    inspectionCenters: ['Bandra West', 'Andheri East', 'Powai', 'Navi Mumbai Vashi', 'Thane West'],
    supportedPincodes: ['400001', '400050', '400053', '400076', '400092', '400703', '400601'],
    travelFeeStandardPincodes: ['400050', '400053', '400076'],
    travelFeeOuterPincodes: ['400703', '400601']
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    activeSpecialistsCount: 31,
    inspectionCenters: ['Madhapur (Hitec City)', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Kukatpally', 'Secunderabad'],
    supportedPincodes: ['500001', '500032', '500034', '500081', '500084', '500072'],
    travelFeeStandardPincodes: ['500081', '500032', '500034'],
    travelFeeOuterPincodes: ['500072']
  },
  {
    slug: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    activeSpecialistsCount: 26,
    inspectionCenters: ['Kothrud', 'Viman Nagar', 'Baner', 'Hinjewadi IT Park', 'Wakdewadi', 'Hadapsar'],
    supportedPincodes: ['411001', '411014', '411028', '411038', '411045', '411057'],
    travelFeeStandardPincodes: ['411001', '411045', '411014'],
    travelFeeOuterPincodes: ['411057']
  }
];

export const TIME_SLOTS = [
  { id: 'slot-1', window: '09:00 AM - 11:00 AM', label: 'Morning Slot' },
  { id: 'slot-2', window: '11:30 AM - 01:30 PM', label: 'Midday Slot' },
  { id: 'slot-3', window: '02:30 PM - 04:30 PM', label: 'Afternoon Slot' },
  { id: 'slot-4', window: '05:00 PM - 07:00 PM', label: 'Evening Slot' },
  { id: 'slot-5', window: '07:30 PM - 10:00 PM', label: 'Late Evening / Night Slot' },
];

export const MOCK_SPECIALISTS: SpecialistSummary[] = [
  {
    id: 'sp-101',
    fullName: 'Rajesh Verma',
    badgeNumber: 'SV-SPEC-704',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 4.94,
    inspectionsCompleted: 482,
    yearsExperience: 14,
    certifications: ['Bosch Master Technician', 'ASE Certified Automotive Diagnostician', 'EV Battery Specialist'],
    vehicleSpecialties: ['German Marques', 'Turbo Petrols & DCTs', 'Hybrid & EV Systems'],
    phoneMasked: '+91 9845X XXXXX'
  },
  {
    id: 'sp-102',
    fullName: 'Arun Sundaram',
    badgeNumber: 'SV-SPEC-512',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 4.91,
    inspectionsCompleted: 340,
    yearsExperience: 11,
    certifications: ['Automotive Guild Member', 'Chassis & Alignment Specialist'],
    vehicleSpecialties: ['Royal Enfield & Cruisers', 'High-Revving Super Sports', 'Japanese Cars'],
    phoneMasked: '+91 9711X XXXXX'
  }
];

// Sample Report: 2021 Hyundai Creta SX(O) Turbo
export const SAMPLE_CAR_REPORT: InspectionReport = {
  id: 'RPT-2026-9042',
  bookingId: 'SV-2026-8901',
  version: 1,
  submittedAt: '2026-10-14T11:45:00Z',
  specialistId: 'sp-101',
  specialistName: 'Rajesh Verma (Lead Senior Inspector)',
  vehicleHealthScore: 84,
  recommendation: 'Fair Deal with Minor Repairs',
  executiveSummary: 'Overall structurally sound and accident-free vehicle. Chassis rails, pillars, and engine bay aprons show original OEM spot welds and zero deformation. Front brake pads are worn down to 2.5mm and require prompt replacement. Slight coolant weeping noted around the thermostat housing elbow. OBD-II diagnostics detected an intermittent secondary O2 sensor advisory code (P0141) which has cleared. Interior is pristine; road test confirmed crisp dual-clutch gear shifts and steady highway tracking.',
  odometerReadingKm: 34820,
  paintDepthAverageMicrons: 118,
  obdScanResult: {
    dtcCodesFound: ['P0141 (Intermittent O2 Sensor Heater Circuit - Bank 1 Sensor 2)'],
    batteryVoltage: 12.4,
    ecuStatus: 'Health OK - No current active check engine DTCs',
    airbagSystemStatus: 'Dual Stage & Curtain Airbags Normal (No deployment history)',
    absStatus: 'ABS/ESC Wheel Speed Sensors Operating Normally'
  },
  roadTestNotes: 'Acceleration is progressive through all 7 DCT gears. No clutch shudder during stop-and-go creep test. Steering returns to center cleanly with zero pull. Slight brake shudder felt at high-speed deceleration due to front disc rotor lip wear.',
  disclaimer: 'This inspection report reflects observations made during an on-site, non-invasive physical and electronic diagnostic examination at the time of appointment. SahiVahan does not provide an express warranty or guarantee against hidden defects, altered internal engine wear, or unobservable latent component failures.',
  pdfDownloadUrl: '#',
  reportVerificationHash: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  indicativeTotalRepairCost: {
    min: 14500,
    max: 18500
  },
  categories: [
    {
      id: 'cat-chassis',
      name: 'Chassis & Structure (Accident Check)',
      iconName: 'ShieldCheck',
      totalPoints: 24,
      goodCount: 24,
      averageCount: 0,
      poorCount: 0,
      criticalCount: 0,
      notInspectedCount: 0,
      items: [
        { id: 'cs-1', category: 'Chassis & Structure', title: 'Front Radiator Core Support & Crossmember', severity: 'good', observation: 'Original factory spot welds intact; no signs of pulling or re-welding.' },
        { id: 'cs-2', category: 'Chassis & Structure', title: 'A, B & C Pillars & Roof Frame', severity: 'good', observation: 'OEM weatherstrips inspected; spot welds uniform; zero signs of cut/weld rollover.' },
        { id: 'cs-3', category: 'Chassis & Structure', title: 'Rear Boot Floor & Spare Wheel Well', severity: 'good', observation: 'Factory seam sealer undisturbed; zero ripple marks or hammer work.' },
        { id: 'cs-4', category: 'Chassis & Structure', title: 'Aprons & Suspension Strut Towers', severity: 'good', observation: 'Original sealant bead intact with correct factory primer.' }
      ]
    },
    {
      id: 'cat-engine',
      name: 'Engine, Turbo & Cooling System',
      iconName: 'Cpu',
      totalPoints: 32,
      goodCount: 28,
      averageCount: 3,
      poorCount: 1,
      criticalCount: 0,
      notInspectedCount: 0,
      items: [
        { id: 'eng-1', category: 'Engine & Turbo', title: 'Cold Start, Idling & Vibration', severity: 'good', observation: 'Engine started cleanly within half a crank; idle settles smoothly at 750 RPM.' },
        { id: 'eng-2', category: 'Engine & Turbo', title: 'Turbocharger Boost & Intercooler Hoses', severity: 'good', observation: 'Intercooler plumbing intact with zero oil pooling.' },
        {
          id: 'eng-3',
          category: 'Engine & Turbo',
          title: 'Cooling System & Thermostat Housing',
          severity: 'poor',
          observation: 'Minor dried pink coolant crust noted at thermostat housing flange seam. Hose clamp requires replacement.',
          indicativeRepairCost: { partsMin: 3200, partsMax: 4500, laborMin: 1200, laborMax: 1600, urgency: 'medium' }
        },
        { id: 'eng-4', category: 'Engine & Turbo', title: 'Engine Oil & Dipstick Condition', severity: 'good', observation: 'Oil level at full mark, golden amber coloration, no milky emulsification.' }
      ]
    },
    {
      id: 'cat-brakes',
      name: 'Brakes, Tyres & Suspension',
      iconName: 'Disc',
      totalPoints: 28,
      goodCount: 22,
      averageCount: 4,
      poorCount: 2,
      criticalCount: 0,
      notInspectedCount: 0,
      items: [
        {
          id: 'brk-1',
          category: 'Brakes & Suspension',
          title: 'Front Brake Pads & Rotors',
          severity: 'poor',
          observation: 'Front brake pads worn to ~2.5mm remaining (near wear indicator limit). Rotors show mild lip.',
          indicativeRepairCost: { partsMin: 6500, partsMax: 8000, laborMin: 1500, laborMax: 2000, urgency: 'immediate' }
        },
        { id: 'brk-2', category: 'Brakes & Suspension', title: 'Rear Brake Pads / Drums', severity: 'average', observation: 'Approx 50% friction material remaining; serviceable for another 12,000 km.' },
        { id: 'brk-3', category: 'Brakes & Suspension', title: 'Tyres Tread Depth & Manufacturing Date', severity: 'good', observation: 'All 4 tyres are JK UX Royale (DOT 4220) with 5.2mm average tread remaining.' }
      ]
    },
    {
      id: 'cat-exterior',
      name: 'Exterior Bodywork & Paint Depth',
      iconName: 'Car',
      totalPoints: 36,
      goodCount: 30,
      averageCount: 5,
      poorCount: 1,
      criticalCount: 0,
      notInspectedCount: 0,
      items: [
        { id: 'ext-1', category: 'Exterior', title: 'Paint Depth Gauge Inspection', severity: 'average', observation: 'Left rear passenger door readings 180-220 microns (indicates quality exterior clearcoat blend); all other panels factory 105-125 microns.' },
        { id: 'ext-2', category: 'Exterior', title: 'Front Bumper & Grille', severity: 'average', observation: 'Minor 4cm scratch touch-up on bottom left chin spoiler.' },
        { id: 'ext-3', category: 'Exterior', title: 'Windshield & Glass Integrity', severity: 'good', observation: 'All Saint-Gobain factory branded glass with matching 2021 date codes.' }
      ]
    },
    {
      id: 'cat-electricals',
      name: 'Electricals, Air Conditioning & OBD-II',
      iconName: 'Zap',
      totalPoints: 30,
      goodCount: 28,
      averageCount: 2,
      poorCount: 0,
      criticalCount: 0,
      notInspectedCount: 0,
      items: [
        { id: 'elec-1', category: 'Electricals', title: 'Automatic Climate Control Cooling', severity: 'good', observation: 'Cabin vent temperature achieved 8.5°C within 4 minutes on 34°C ambient day.' },
        { id: 'elec-2', category: 'Electricals', title: 'OBD-II Fault Scan & Readiness Monitors', severity: 'average', observation: 'Stored history code P0141 present in ECU freeze-frame log; current active monitor status is ready.' }
      ]
    }
  ]
};

// Seed Bookings
export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'SV-2026-8901',
    createdAt: '2026-10-14T08:30:00Z',
    updatedAt: '2026-10-14T11:45:00Z',
    status: 'completed',
    paymentStatus: 'captured',
    paymentId: 'pay_Nz9K38djf91',
    paymentMethod: 'UPI (Google Pay)',
    customer: {
      fullName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@example.com'
    },
    vehicle: {
      type: 'car',
      make: 'Hyundai',
      model: 'Creta',
      variant: '1.5 Turbo Petrol SX(O) DCT',
      manufacturingYear: 2021,
      fuelType: 'Petrol',
      transmission: 'DCT/DSG',
      registrationNumber: 'KA 03 MX 4921',
      complexity: 'complex'
    },
    location: {
      city: 'Bengaluru',
      area: 'HSR Layout Sector 2',
      addressLine: '#412, 14th Main, 5th Cross, HSR Sector 2',
      landmark: 'Near BDA Complex',
      pincode: '560102',
      sellerContact: {
        name: 'Vikas Mehta',
        phone: '+91 98220 11223',
        sellerRelationship: 'owner',
        sellerPermissionConfirmed: true
      },
      accessNotes: 'Car parked in basement visitor slot #B4. Security will allow entry with booking reference.'
    },
    appointment: {
      date: '2026-10-14',
      slotWindow: '09:00 AM - 11:00 AM',
      slotId: 'slot-1'
    },
    pricing: {
      policyVersion: 'v1.0-2026',
      effectiveDate: '2026-10-01',
      vehicleType: 'car',
      complexity: 'complex',
      pincode: '560102',
      city: 'Bengaluru',
      breakdown: {
        basePrice: 1999,
        complexitySurcharge: 500,
        travelZoneFee: 0,
        taxableAmount: 2499,
        gstRatePercent: 18,
        gstAmount: 449.82,
        discountAmount: 0,
        totalPayableAmount: 2948.82,
        currency: 'INR'
      },
      inclusions: [
        'Comprehensive 200+ Point Mechanical, Structural & Electronic Diagnostic Check',
        'Specialist-grade OBD-II live sensor scanning & DTC code analysis',
        'Digital Ultrasonic Paint Depth Gauge test across all steel/aluminum panels',
        '30-minute structured road test (acceleration, braking, steering pull, transmission)',
        '40+ High-definition timestamped inspection photographs',
        'Itemized indicative repair cost estimate breakdown with non-binding disclaimer',
        'Tamper-evident cryptographically signed PDF Report'
      ],
      exclusions: [
        'No invasive engine disassembly or cylinder head removal',
        'No dynamic road tests over posted speed limits or on unsafe roads',
        'No legal or title guarantees on hypothecation/pending challans (buyer must verify Vahan portal)'
      ],
      cancellationSchedule: [
        { stage: 'Before Specialist Assigned', description: 'Immediate 100% full refund', refundPercent: 100, feeAmount: 0 },
        { stage: 'Specialist Assigned (> 12h before slot)', description: 'Full refund minus ₹150 processing fee', refundPercent: 95, feeAmount: 150 },
        { stage: 'Specialist Assigned (< 12h before slot)', description: '80% refund (₹300 reservation retainer)', refundPercent: 80, feeAmount: 300 },
        { stage: 'Specialist En Route or Arrived', description: '50% refund (covers call-out travel allowance)', refundPercent: 50, feeAmount: 1474.41 },
        { stage: 'Inspection Started', description: 'Non-refundable once checklist begins', refundPercent: 0, feeAmount: 2948.82 }
      ]
    },
    specialist: MOCK_SPECIALISTS[0],
    visitEvidence: {
      specialistPhotoWithVehicleUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      numberPlatePhotoUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
      odometerPhotoUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80',
      arrivedAt: '2026-10-14T09:05:00Z',
      latitude: 12.9121,
      longitude: 77.6446
    },
    report: SAMPLE_CAR_REPORT
  },
  {
    id: 'SV-2026-8902',
    createdAt: '2026-10-15T07:15:00Z',
    updatedAt: '2026-10-15T09:10:00Z',
    status: 'inspecting',
    paymentStatus: 'captured',
    paymentId: 'pay_Oa1P49ckg02',
    paymentMethod: 'Credit Card (HDFC Visa)',
    customer: {
      fullName: 'Ananya Deshmukh',
      phone: '+91 99887 76655',
      email: 'ananya.d@example.com'
    },
    vehicle: {
      type: 'car',
      make: 'Tata Motors',
      model: 'Nexon',
      variant: '1.2 Fearless+ DCA (DCT)',
      manufacturingYear: 2023,
      fuelType: 'Petrol',
      transmission: 'DCT/DSG',
      registrationNumber: 'KA 05 NV 1809',
      complexity: 'complex'
    },
    location: {
      city: 'Bengaluru',
      area: 'Indiranagar 100ft Road',
      addressLine: 'Villa #18, Defence Colony, Indiranagar',
      pincode: '560038',
      sellerContact: {
        name: 'Pradeep Rao',
        phone: '+91 94480 33445',
        sellerRelationship: 'owner',
        sellerPermissionConfirmed: true
      }
    },
    appointment: {
      date: '2026-10-15',
      slotWindow: '09:00 AM - 11:00 AM',
      slotId: 'slot-1'
    },
    pricing: {
      policyVersion: 'v1.0-2026',
      effectiveDate: '2026-10-01',
      vehicleType: 'car',
      complexity: 'complex',
      pincode: '560038',
      city: 'Bengaluru',
      breakdown: {
        basePrice: 1999,
        complexitySurcharge: 500,
        travelZoneFee: 0,
        taxableAmount: 2499,
        gstRatePercent: 18,
        gstAmount: 449.82,
        discountAmount: 0,
        totalPayableAmount: 2948.82,
        currency: 'INR'
      },
      inclusions: [
        'Comprehensive 200+ Point Inspection',
        'OBD-II scanning & DTC code analysis',
        'Paint Depth Gauge test',
        'Structured road test',
        '40+ HD Photos',
        'Indicative repair estimate'
      ],
      exclusions: ['No invasive engine dismantling'],
      cancellationSchedule: [
        { stage: 'Before Specialist Assigned', description: 'Immediate 100% full refund', refundPercent: 100, feeAmount: 0 },
        { stage: 'Specialist Assigned (> 12h before slot)', description: 'Full refund minus ₹150 processing fee', refundPercent: 95, feeAmount: 150 },
        { stage: 'Specialist Assigned (< 12h before slot)', description: '80% refund (₹300 reservation retainer)', refundPercent: 80, feeAmount: 300 },
        { stage: 'Specialist En Route or Arrived', description: '50% refund (covers call-out travel allowance)', refundPercent: 50, feeAmount: 1474.41 },
        { stage: 'Inspection Started', description: 'Non-refundable once checklist begins', refundPercent: 0, feeAmount: 2948.82 }
      ]
    },
    specialist: MOCK_SPECIALISTS[0],
    visitEvidence: {
      specialistPhotoWithVehicleUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      numberPlatePhotoUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
      odometerPhotoUrl: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80',
      arrivedAt: '2026-10-15T09:02:00Z',
      latitude: 12.9716,
      longitude: 77.6412
    }
  },
  {
    id: 'SV-2026-8903',
    createdAt: '2026-10-15T12:00:00Z',
    updatedAt: '2026-10-15T12:05:00Z',
    status: 'awaiting_assignment',
    paymentStatus: 'captured',
    paymentId: 'pay_Pb2Q50dkh13',
    paymentMethod: 'UPI (PhonePe)',
    customer: {
      fullName: 'Vikramaditya Iyer',
      phone: '+91 97401 23456',
      email: 'vikram.iyer@example.com'
    },
    vehicle: {
      type: 'bike',
      make: 'Royal Enfield',
      model: 'Classic 350',
      variant: 'Dark Stealth Black Dual-Channel ABS',
      manufacturingYear: 2022,
      fuelType: 'Petrol',
      transmission: 'Manual',
      registrationNumber: 'KA 01 EK 9102',
      complexity: 'standard'
    },
    location: {
      city: 'Bengaluru',
      area: 'Koramangala 4th Block',
      addressLine: '#88, 80 Feet Road, 4th Block Koramangala',
      pincode: '560034',
      sellerContact: {
        name: 'Suresh Kumar',
        phone: '+91 98860 99887',
        sellerRelationship: 'owner',
        sellerPermissionConfirmed: true
      }
    },
    appointment: {
      date: '2026-10-16',
      slotWindow: '11:30 AM - 01:30 PM',
      slotId: 'slot-2'
    },
    pricing: {
      policyVersion: 'v1.0-2026',
      effectiveDate: '2026-10-01',
      vehicleType: 'bike',
      complexity: 'standard',
      pincode: '560034',
      city: 'Bengaluru',
      breakdown: {
        basePrice: 999,
        complexitySurcharge: 0,
        travelZoneFee: 0,
        taxableAmount: 999,
        gstRatePercent: 18,
        gstAmount: 179.82,
        discountAmount: 0,
        totalPayableAmount: 1178.82,
        currency: 'INR'
      },
      inclusions: [
        'Comprehensive 120+ Point Motorcycle Diagnostic Check',
        'Chassis alignment & fork stem straightness verification',
        'Engine compression check & clutch drag test',
        'Brake rotor runout & chain-sprocket health test',
        '25+ HD timestamped photos and indicative repair estimate'
      ],
      exclusions: ['No internal engine block stripping'],
      cancellationSchedule: [
        { stage: 'Before Specialist Assigned', description: 'Immediate 100% full refund', refundPercent: 100, feeAmount: 0 },
        { stage: 'Specialist Assigned (> 12h before slot)', description: 'Full refund minus ₹150 processing fee', refundPercent: 87, feeAmount: 150 },
        { stage: 'Specialist Assigned (< 12h before slot)', description: '80% refund (₹300 reservation retainer)', refundPercent: 74, feeAmount: 300 },
        { stage: 'Specialist En Route or Arrived', description: '50% refund (covers call-out travel allowance)', refundPercent: 50, feeAmount: 589.41 },
        { stage: 'Inspection Started', description: 'Non-refundable once checklist begins', refundPercent: 0, feeAmount: 1178.82 }
      ]
    }
  }
];

// Helper to calculate pricing dynamically
export function calculateInspectionPrice(params: {
  vehicleType: 'car' | 'bike';
  complexity: 'standard' | 'complex' | 'luxury_or_specialist';
  pincode: string;
}) {
  const basePrice = params.vehicleType === 'car' ? 1999 : 999;
  
  let complexitySurcharge = 0;
  if (params.complexity === 'complex') {
    complexitySurcharge = 500;
  } else if (params.complexity === 'luxury_or_specialist') {
    complexitySurcharge = 1500;
  }

  // Determine travel fee based on outer pincode lists
  let travelZoneFee = 0;
  const isOuterZone = ['560100', '560068', '201303', '121001', '400703', '400601', '500072', '411057'].includes(params.pincode.trim());
  if (isOuterZone) {
    travelZoneFee = 150;
  }

  const taxableAmount = basePrice + complexitySurcharge + travelZoneFee;
  const gstRatePercent = 18;
  const gstAmount = Number(((taxableAmount * gstRatePercent) / 100).toFixed(2));
  const discountAmount = 0;
  const totalPayableAmount = Number((taxableAmount + gstAmount - discountAmount).toFixed(2));

  return {
    basePrice,
    complexitySurcharge,
    travelZoneFee,
    taxableAmount,
    gstRatePercent,
    gstAmount,
    discountAmount,
    totalPayableAmount,
    currency: 'INR'
  };
}
