//=============================================
// Simple Util Function
//=============================================

function roundToNearestMultiple(num: number): number {
  if (num < 100) {
    return Math.round(num / 10) * 10;
  } else {
    return Math.floor(num / 100) * 100;
  }
}

export { roundToNearestMultiple };
