export class Time {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(timeString: string) {
    const timeArray = timeString.split(":");

    this.hours = parseInt(timeArray[0]),
    this.minutes = parseInt(timeArray[1]),
    this.seconds = parseInt(timeArray[2])
  }
}

export function convertTimeToFormatedString(hours: number, minutes: number, seconds: number): string {
  const date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date.toTimeString().split(' ')[0];
}
