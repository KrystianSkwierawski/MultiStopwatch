import { Injectable, OnInit } from '@angular/core';
import { ProjectItemDto, StopwatchItemDto } from '../web-api-client';
import { LocalChangesHubService } from './local-changes-hub.service';

@Injectable({
  providedIn: 'root'
})
export class TimersService implements OnInit {

  totalProjectHours: number;
  totalProjectMinutes: number;
  totalProjectSeconds: number;
  timers = new Map<number, number>();
  project: ProjectItemDto;

  constructor(private localChangesHubService: LocalChangesHubService) { }

  ngOnInit(): void {

  }

  start(stopwatch: StopwatchItemDto) {
    const timeArray = stopwatch.time.split(":");

    let hours: number = parseInt(timeArray[0]);
    let minutes: number = parseInt(timeArray[1]);
    let seconds: number = parseInt(timeArray[2]);

    stopwatch.isStarted = true;
    const intervalId: number = window.setInterval(async () => {
      seconds++;
      this.totalProjectSeconds++;

      if (minutes === 60) {
        minutes = 0;
        seconds = 0;
        hours++;
        this.totalProjectHours++;
      }
      else if (seconds === 60) {
        seconds = 0;
        minutes++;
        this.totalProjectMinutes++;
      }   

      stopwatch.time = this.convertTimeToFormatedString(hours, minutes, seconds);
      this.project.time = this.convertTimeToFormatedString(this.totalProjectMinutes, this.totalProjectMinutes, this.totalProjectSeconds);

      await this.localChangesHubService.storeLocalStopwatchChanges(stopwatch);
      await this.localChangesHubService.storeLocalProjectChanges(this.project);
    }, 1000);

    this.timers.set(stopwatch.id, intervalId);
  }

  pause(stopwatch: StopwatchItemDto) {
    stopwatch.isStarted = false;
    const intervalId: number = this.timers.get(stopwatch.id);
    window.clearInterval(intervalId);
    this.timers.delete(stopwatch.id);
  }

  convertTimeToFormatedString(hours: number, minutes: number, seconds: number): string {
    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date.toTimeString().split(' ')[0];
  }

  clearAllIntervals() {
    if (this.timers) {
      this.timers.forEach((value, key) => {
        window.clearInterval(value);
        this.timers.delete(key);
      });
    }
  }

  initialProjectTime() {
    const timeArray = this.project.time.split(":");

    this.totalProjectHours = parseInt(timeArray[0]);
    this.totalProjectMinutes = parseInt(timeArray[1]);
    this.totalProjectSeconds = parseInt(timeArray[2]);
  }
}
