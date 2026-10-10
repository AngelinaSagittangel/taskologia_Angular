export function getDeadlineDaysDifference(deadline: string | null): number | null {
  if (!deadline) return null;
  const deadlineDate = new Date(deadline);
  if (isNaN(deadlineDate.getTime())) return null;
  const today = new Date();
  deadlineDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const difference = deadlineDate.getTime() - today.getTime();
  return Math.round(difference / (1000 * 60 * 60 * 24));
}

export function isDeadlineExpired(deadline: string | null): boolean {
  const days = getDeadlineDaysDifference(deadline);
  return days !== null && days < 0;
}
