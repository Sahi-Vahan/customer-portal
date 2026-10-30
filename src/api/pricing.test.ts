import { calculateInspectionPrice } from './mockData.ts';

// Test Suite for SahiVahan Business Rules & Pricing Calculations
function runTests() {
  console.log('=== Running SahiVahan Business Rules Verification Tests ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // Test 1: Standard Car Pricing
  const carStandard = calculateInspectionPrice({
    vehicleType: 'car',
    complexity: 'standard',
    pincode: '560001'
  });
  assert(carStandard.basePrice === 1999, 'Standard Car Base Price is ₹1,999');
  assert(carStandard.complexitySurcharge === 0, 'Standard Car Complexity Surcharge is ₹0');
  assert(carStandard.travelZoneFee === 0, 'Standard Zone Travel Fee is ₹0');
  assert(carStandard.gstAmount === 359.82, '18% GST on ₹1,999 is ₹359.82');
  assert(carStandard.totalPayableAmount === 2358.82, 'Standard Car Total Payable is ₹2,358.82');

  // Test 2: Complex SUV / DCT / Turbo Car Pricing
  const carComplex = calculateInspectionPrice({
    vehicleType: 'car',
    complexity: 'complex',
    pincode: '560102'
  });
  assert(carComplex.complexitySurcharge === 500, 'Complex Vehicle Surcharge is ₹500');
  assert(carComplex.taxableAmount === 2499, 'Taxable Amount is ₹2,499');
  assert(carComplex.gstAmount === 449.82, '18% GST on ₹2,499 is ₹449.82');
  assert(carComplex.totalPayableAmount === 2948.82, 'Complex Car Total Payable is ₹2,948.82');

  // Test 3: Outer Ring Travel Surcharge
  const carOuter = calculateInspectionPrice({
    vehicleType: 'car',
    complexity: 'complex',
    pincode: '560100' // Outer Electronic City pincode
  });
  assert(carOuter.travelZoneFee === 150, 'Outer Ring Pincode (560100) has ₹150 Travel Surcharge');
  assert(carOuter.taxableAmount === 2649, 'Taxable Amount with travel fee is ₹2,649');
  assert(carOuter.totalPayableAmount === 3125.82, 'Total Payable with travel fee is ₹3,125.82');

  // Test 4: Standard Bike Pricing
  const bikeStandard = calculateInspectionPrice({
    vehicleType: 'bike',
    complexity: 'standard',
    pincode: '560034'
  });
  assert(bikeStandard.basePrice === 999, 'Standard Bike Base Price is ₹999');
  assert(bikeStandard.gstAmount === 179.82, '18% GST on ₹999 is ₹179.82');
  assert(bikeStandard.totalPayableAmount === 1178.82, 'Standard Bike Total Payable is ₹1,178.82');

  // Test 5: Luxury Marque Car Pricing
  const luxuryCar = calculateInspectionPrice({
    vehicleType: 'car',
    complexity: 'luxury_or_specialist',
    pincode: '560001'
  });
  assert(luxuryCar.complexitySurcharge === 1500, 'Luxury Marque Complexity Surcharge is ₹1,500');
  assert(luxuryCar.taxableAmount === 3499, 'Taxable Amount is ₹3,499');
  assert(luxuryCar.totalPayableAmount === 4128.82, 'Luxury Car Total Payable is ₹4,128.82');

  console.log(`\n=== Test Results: ${passed} Passed, ${failed} Failed ===`);
  if (failed > 0) throw new Error(`${failed} tests failed`);
}

runTests();
