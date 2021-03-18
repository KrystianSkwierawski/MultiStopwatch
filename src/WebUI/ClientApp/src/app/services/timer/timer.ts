export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export function convertTimeToFormatedString(hours: number, minutes: number, seconds: number): string {
  const date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date.toTimeString().split(' ')[0];
}
