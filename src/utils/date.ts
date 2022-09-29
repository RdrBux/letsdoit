export function formatHour(hour: number) {
  if (hour <= 12) {
    return `${hour}:00 AM`;
  }

  if (hour > 12) {
    return `${hour}:00 PM`;
  }
}
