export const defaultTime: string = "00:00:00";

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

export function timeToHHMMSS(time: Time): string {
  const totalSeconds: number = calcTotalSeconds(time);
  return TotalSecondsToHHMMSSTotalSecondsToHHMMSS(totalSeconds);
}

export function calcTotalSeconds(time: Time): number {
  let o_totalSeconds: number = 0;

  o_totalSeconds += time.hours * 3600;
  o_totalSeconds += time.minutes * 60;
  o_totalSeconds += time.seconds;

  return o_totalSeconds;
}

function TotalSecondsToHHMMSSTotalSecondsToHHMMSS(secs) {
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => v < 10 ? "0" + v : v)
    .join(":");
}
