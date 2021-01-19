const shouldShave = (
  day: number,
  ageLastShaved: number | null,
  initialAge: number,
  ageInDays: number
): boolean => {
  if (ageInDays / 100 >= 1) {
    if (ageLastShaved === null) return true;
    const shaveOnDay =
      (ageLastShaved - initialAge) * 100 + 8 + ageInDays * 0.01;
    if (day >= shaveOnDay) return true;
  }

  return false;
};

export default shouldShave;
