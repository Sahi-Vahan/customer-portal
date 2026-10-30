export interface PincodeInfo {
  city: string;
  state: string;
  area: string;
  zone: 'standard' | 'outer';
  metroSlug: string;
}

// Major metro prefixes and specific postal codes
export const PINCODE_DIRECTORY: Record<string, PincodeInfo> = {
  // Bengaluru
  '560001': { city: 'Bengaluru', state: 'Karnataka', area: 'MG Road / Shivaji Nagar', zone: 'standard', metroSlug: 'bengaluru' },
  '560002': { city: 'Bengaluru', state: 'Karnataka', area: 'City Market / Kalasipalya', zone: 'standard', metroSlug: 'bengaluru' },
  '560034': { city: 'Bengaluru', state: 'Karnataka', area: 'Koramangala 1st-4th Block', zone: 'standard', metroSlug: 'bengaluru' },
  '560038': { city: 'Bengaluru', state: 'Karnataka', area: 'Indiranagar / CMH Road', zone: 'standard', metroSlug: 'bengaluru' },
  '560102': { city: 'Bengaluru', state: 'Karnataka', area: 'HSR Layout Sectors 1-7', zone: 'standard', metroSlug: 'bengaluru' },
  '560066': { city: 'Bengaluru', state: 'Karnataka', area: 'Whitefield / ITPL', zone: 'standard', metroSlug: 'bengaluru' },
  '560100': { city: 'Bengaluru', state: 'Karnataka', area: 'Electronic City Phase 1', zone: 'outer', metroSlug: 'bengaluru' },
  '560068': { city: 'Bengaluru', state: 'Karnataka', area: 'Bommanahalli / Begur', zone: 'outer', metroSlug: 'bengaluru' },
  '560076': { city: 'Bengaluru', state: 'Karnataka', area: 'JP Nagar 1st-6th Phase', zone: 'standard', metroSlug: 'bengaluru' },
  '560095': { city: 'Bengaluru', state: 'Karnataka', area: 'Koramangala 5th-8th Block', zone: 'standard', metroSlug: 'bengaluru' },
  '560024': { city: 'Bengaluru', state: 'Karnataka', area: 'Hebbal / Sahakarnagar', zone: 'standard', metroSlug: 'bengaluru' },

  // Delhi-NCR
  '110001': { city: 'Delhi-NCR', state: 'Delhi', area: 'Connaught Place / Central Delhi', zone: 'standard', metroSlug: 'delhi-ncr' },
  '110016': { city: 'Delhi-NCR', state: 'Delhi', area: 'Hauz Khas / Green Park', zone: 'standard', metroSlug: 'delhi-ncr' },
  '110020': { city: 'Delhi-NCR', state: 'Delhi', area: 'Okhla Industrial Area', zone: 'standard', metroSlug: 'delhi-ncr' },
  '110075': { city: 'Delhi-NCR', state: 'Delhi', area: 'Dwarka Sector 6-12', zone: 'standard', metroSlug: 'delhi-ncr' },
  '122001': { city: 'Delhi-NCR', state: 'Haryana', area: 'Old Gurugram / Sadar Bazaar', zone: 'standard', metroSlug: 'delhi-ncr' },
  '122002': { city: 'Delhi-NCR', state: 'Haryana', area: 'Cyber City / DLF Phase 2', zone: 'standard', metroSlug: 'delhi-ncr' },
  '201301': { city: 'Delhi-NCR', state: 'Uttar Pradesh', area: 'Noida Sector 18 / Atta Market', zone: 'standard', metroSlug: 'delhi-ncr' },
  '201303': { city: 'Delhi-NCR', state: 'Uttar Pradesh', area: 'Noida Expressway / Sector 93', zone: 'outer', metroSlug: 'delhi-ncr' },
  '121001': { city: 'Delhi-NCR', state: 'Haryana', area: 'Faridabad Central', zone: 'outer', metroSlug: 'delhi-ncr' },

  // Mumbai
  '400001': { city: 'Mumbai', state: 'Maharashtra', area: 'Fort / Nariman Point', zone: 'standard', metroSlug: 'mumbai' },
  '400050': { city: 'Mumbai', state: 'Maharashtra', area: 'Bandra West / Pali Hill', zone: 'standard', metroSlug: 'mumbai' },
  '400053': { city: 'Mumbai', state: 'Maharashtra', area: 'Andheri West / Lokhandwala', zone: 'standard', metroSlug: 'mumbai' },
  '400076': { city: 'Mumbai', state: 'Maharashtra', area: 'Powai / Hiranandani', zone: 'standard', metroSlug: 'mumbai' },
  '400092': { city: 'Mumbai', state: 'Maharashtra', area: 'Borivali West / IC Colony', zone: 'standard', metroSlug: 'mumbai' },
  '400703': { city: 'Mumbai', state: 'Maharashtra', area: 'Vashi / Navi Mumbai', zone: 'outer', metroSlug: 'mumbai' },
  '400601': { city: 'Mumbai', state: 'Maharashtra', area: 'Thane West', zone: 'outer', metroSlug: 'mumbai' },

  // Hyderabad
  '500001': { city: 'Hyderabad', state: 'Telangana', area: 'Abids / Koti / Central', zone: 'standard', metroSlug: 'hyderabad' },
  '500081': { city: 'Hyderabad', state: 'Telangana', area: 'Madhapur / Hitec City', zone: 'standard', metroSlug: 'hyderabad' },
  '500032': { city: 'Hyderabad', state: 'Telangana', area: 'Gachibowli / Financial District', zone: 'standard', metroSlug: 'hyderabad' },
  '500034': { city: 'Hyderabad', state: 'Telangana', area: 'Banjara Hills', zone: 'standard', metroSlug: 'hyderabad' },
  '500072': { city: 'Hyderabad', state: 'Telangana', area: 'Kukatpally / KPHB Colony', zone: 'outer', metroSlug: 'hyderabad' },

  // Pune
  '411001': { city: 'Pune', state: 'Maharashtra', area: 'Camp / Pune Station', zone: 'standard', metroSlug: 'pune' },
  '411004': { city: 'Pune', state: 'Maharashtra', area: 'Deccan Gymkhana / FC Road', zone: 'standard', metroSlug: 'pune' },
  '411014': { city: 'Pune', state: 'Maharashtra', area: 'Viman Nagar / Kharadi', zone: 'standard', metroSlug: 'pune' },
  '411057': { city: 'Pune', state: 'Maharashtra', area: 'Hinjawadi Phase 1-3', zone: 'outer', metroSlug: 'pune' },
  '411038': { city: 'Pune', state: 'Maharashtra', area: 'Kothrud / Karve Road', zone: 'standard', metroSlug: 'pune' }
};

export function lookupPincode(pincode: string): PincodeInfo | null {
  const clean = pincode.trim();
  if (clean.length !== 6) return null;

  if (PINCODE_DIRECTORY[clean]) {
    return PINCODE_DIRECTORY[clean];
  }

  // Fallback by region prefix
  const prefix2 = clean.substring(0, 2);
  const prefix3 = clean.substring(0, 3);

  if (prefix2 === '56') {
    return { city: 'Bengaluru', state: 'Karnataka', area: 'Bengaluru Urban', zone: 'standard', metroSlug: 'bengaluru' };
  }
  if (prefix2 === '11') {
    return { city: 'Delhi-NCR', state: 'Delhi', area: 'Delhi Metro Region', zone: 'standard', metroSlug: 'delhi-ncr' };
  }
  if (prefix2 === '12' || prefix2 === '20') {
    return { city: 'Delhi-NCR', state: prefix2 === '12' ? 'Haryana' : 'Uttar Pradesh', area: 'NCR Zone', zone: 'standard', metroSlug: 'delhi-ncr' };
  }
  if (prefix2 === '40') {
    return { city: 'Mumbai', state: 'Maharashtra', area: 'Mumbai Metropolitan', zone: 'standard', metroSlug: 'mumbai' };
  }
  if (prefix2 === '50') {
    return { city: 'Hyderabad', state: 'Telangana', area: 'Hyderabad Urban', zone: 'standard', metroSlug: 'hyderabad' };
  }
  if (prefix2 === '41') {
    return { city: 'Pune', state: 'Maharashtra', area: 'Pune Metro Region', zone: 'standard', metroSlug: 'pune' };
  }
  if (prefix2 === '60') {
    return { city: 'Chennai', state: 'Tamil Nadu', area: 'Chennai Metro', zone: 'standard', metroSlug: 'bengaluru' };
  }

  return {
    city: 'Other City',
    state: 'India',
    area: 'Domestic Zone',
    zone: 'standard',
    metroSlug: 'bengaluru'
  };
}
