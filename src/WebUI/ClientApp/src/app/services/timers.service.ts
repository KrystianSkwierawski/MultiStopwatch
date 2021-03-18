import { Injectable, OnInit } from '@angular/core';
import { StopwatchItemDto } from '../web-api-client';

@Injectable({
  providedIn: 'root'
})
export class TimersService implements OnInit {

  timers = new Map<number, number>();

  constructor() { }

  ngOnInit(): void {

  }

  start(stopwatch: StopwatchItemDto) {
    const timeArray = stopwatch.time.split(":");

    let hours: number = parseInt(timeArray[0]);
    let minutes: number = parseInt(timeArray[1]);
    let seconds: number = parseInt(timeArray[2]);


    stopwatch.isStarted = true;
    const intervalId: number = window.setInterval(() => {
      seconds++;

      if (minutes === 60) {
        minutes = 0;
        seconds = 0;
        hours++;
      }
      else if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      stopwatch.time = this.convertTimeString(hours, minutes, seconds);
    }, 1000);

    this.timers.set(stopwatch.id, intervalId);
  }


  pause(stopwatch: StopwatchItemDto) {
    stopwatch.isStarted = false;
    const intervalId: number = this.timers.get(stopwatch.id);
    window.clearInterval(intervalId);
  }

  convertTimeString(hours: number, minutes: number, seconds: number): string {
    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date.toTimeString().split(' ')[0];
  }
}
