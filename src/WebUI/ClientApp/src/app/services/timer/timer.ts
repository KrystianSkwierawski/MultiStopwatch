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

export function totalSecondsToHHMMSS(hours: number, minutes: number, seconds: number): string {
  let totalSeconds: number = 0;

  totalSeconds += hours * 3600;
  totalSeconds += minutes * 60;
  totalSeconds += seconds;

  return toHHMMSS(totalSeconds);
}

function toHHMMSS(secs) {
  var sec_num = parseInt(secs, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours, minutes, seconds]
    .map(v => v < 10 ? "0" + v : v)
    .join(":")
}
