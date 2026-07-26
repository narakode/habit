export function getPercent(done, target) {
  if (done >= target) {
    return 100;
  }

  return (done / target) * 100;
}
