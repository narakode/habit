export function getPercent(done, target) {
  if (done >= target) {
    return 100;
  }

  return Math.floor((done / target) * 100);
}
