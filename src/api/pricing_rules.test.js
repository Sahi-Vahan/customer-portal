// SahiVahan Business Rules Verification Test Suite
function calculateInspectionPrice(params) {
  const basePrice = params.vehicleType === 'car' ? 1999 : 999;
  
  let complexitySurcharge = 0;
  if (params.complexity === 'complex') {
    complexitySurcharge = 500;
  } else if (params.complexity === 'luxury_or_specialist') {
    complexitySurcharge = 1500;
  }

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

function calculateCancellationRefund(status, totalPaid) {
  let feeDeducted = 0;
  let refundAmount = totalPaid;

  if (status === 'awaiting_assignment') {
    feeDeducted = 0;
    refundAmount = totalPaid;
  } else if (status === 'assigned' || status === 'accepted') {
    feeDeducted = 150;
    refundAmount = Math.max(0, totalPaid - feeDeducted);
  } else if (status === 'en_route' || status === 'arrived') {
    feeDeducted = Number((totalPaid * 0.5).toFixed(2));
    refundAmount = Math.max(0, totalPaid - feeDeducted);
  } else if (status === 'inspecting' || status === 'report_submitted' || status === 'completed') {
    feeDeducted = totalPaid;
    refundAmount = 0;
  }
  return { refundAmount, feeDeducted };
}

function runAllTests() {
  console.log('====================================================');
  console.log('  SAHIVAHAN AUTOMATED BUSINESS RULES TEST SUITE     ');
  console.log('====================================================\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName}`);
      failed++;
    }
  }

  // --- Pricing Rule Tests ---
  console.log('--- 1. Vehicle Pricing Engine Tests ---');
  const carStd = calculateInspectionPrice({ vehicleType: 'car', complexity: 'standard', pincode: '560001' });
  assert(carStd.basePrice === 1999, 'Standard Car Base Price is ₹1,999');
  assert(carStd.taxableAmount === 1999, 'Standard Car Taxable is ₹1,999');
  assert(carStd.gstAmount === 359.82, 'Standard Car GST (18%) is ₹359.82');
  assert(carStd.totalPayableAmount === 2358.82, 'Standard Car Total Payable is ₹2,358.82');

  const carCmplx = calculateInspectionPrice({ vehicleType: 'car', complexity: 'complex', pincode: '560102' });
  assert(carCmplx.complexitySurcharge === 500, 'Complex SUV / Turbo / DCT Surcharge is ₹500');
  assert(carCmplx.taxableAmount === 2499, 'Complex Car Taxable is ₹2,499');
  assert(carCmplx.gstAmount === 449.82, 'Complex Car GST (18%) is ₹449.82');
  assert(carCmplx.totalPayableAmount === 2948.82, 'Complex Car Total Payable is ₹2,948.82');

  const bikeStd = calculateInspectionPrice({ vehicleType: 'bike', complexity: 'standard', pincode: '560034' });
  assert(bikeStd.basePrice === 999, 'Standard Bike Base Price is ₹999');
  assert(bikeStd.gstAmount === 179.82, 'Standard Bike GST (18%) is ₹179.82');
  assert(bikeStd.totalPayableAmount === 1178.82, 'Standard Bike Total Payable is ₹1,178.82');

  const carOuter = calculateInspectionPrice({ vehicleType: 'car', complexity: 'complex', pincode: '560100' });
  assert(carOuter.travelZoneFee === 150, 'Outer Metro Zone Pincode adds ₹150 Travel Surcharge');
  assert(carOuter.totalPayableAmount === 3125.82, 'Total Payable with travel fee is ₹3,125.82');

  // --- Cancellation Policy Schedule Tests ---
  console.log('\n--- 2. Stage-Based Cancellation & Refund Policy Tests ---');
  const paid = 2948.82;
  
  const c1 = calculateCancellationRefund('awaiting_assignment', paid);
  assert(c1.feeDeducted === 0 && c1.refundAmount === 2948.82, 'Stage 1 (Before Specialist Assigned): 100% Full Refund (₹0 fee)');

  const c2 = calculateCancellationRefund('assigned', paid);
  assert(c2.feeDeducted === 150 && c2.refundAmount === 2798.82, 'Stage 2 (Assigned): 100% minus ₹150 processing fee');

  const c3 = calculateCancellationRefund('arrived', paid);
  assert(c3.feeDeducted === 1474.41 && c3.refundAmount === 1474.41, 'Stage 3 (Specialist Arrived on Site): 50% call-out fee deduction');

  const c4 = calculateCancellationRefund('inspecting', paid);
  assert(c4.feeDeducted === 2948.82 && c4.refundAmount === 0, 'Stage 4 (Inspection Started): Non-refundable (0% refund)');

  console.log(`\n====================================================`);
  console.log(`  SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`====================================================\n`);

  if (failed > 0) process.exit(1);
}

runAllTests();
