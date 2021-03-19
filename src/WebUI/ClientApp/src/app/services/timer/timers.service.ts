import { Injectable, OnInit } from '@angular/core';
import { ProjectItemDto, StopwatchItemDto } from '../../web-api-client';
import { LocalChangesHubService } from '../local-changes-hub.service';
import { Time, convertTimeToFormatedString } from './Timer';


@Injectable({
  providedIn: 'root'
})
export class TimersService implements OnInit {
  project: ProjectItemDto;
  totalProjectHours: number;
  totalProjectMinutes: number;
  totalProjectSeconds: number;
  stopwatchTimes = new Map<number, Time>();
  timerIntervals = new Map<number, number>();

  constructor(private localChangesHubService: LocalChangesHubService) { }

  ngOnInit(): void {

  }

  initialProjectTime() {
    this.clearAllIntervals();

    const timeArray = this.project.time.split(":");

    this.totalProjectHours = parseInt(timeArray[0]);
    this.totalProjectMinutes = parseInt(timeArray[1]);
    this.totalProjectSeconds = parseInt(timeArray[2]);
  }

  pause(stopwatch: StopwatchItemDto) {
    stopwatch.isStarted = false;
    const intervalId: number = this.timerIntervals.get(stopwatch.id);
    window.clearInterval(intervalId);
    this.timerIntervals.delete(stopwatch.id);
  }

  start(stopwatch: StopwatchItemDto) {
    const timeArray = stopwatch.time.split(":");

    const stopwatchTime: Time = {
      hours: parseInt(timeArray[0]),
      minutes: parseInt(timeArray[1]),
      seconds: parseInt(timeArray[2])
    }

    this.stopwatchTimes.set(stopwatch.id, stopwatchTime);

    stopwatch.isStarted = true;
    const intervalId: number = window.setInterval(async () => {

      this.updateStopwatchTimer(stopwatch);
      this.updateProjectTimer();   

      await this.localChangesHubService.storeLocalStopwatchChanges(stopwatch);
      await this.localChangesHubService.storeLocalProjectChanges(this.project);
    }, 1000);

    this.timerIntervals.set(stopwatch.id, intervalId);
  }

  updateStopwatchTimer(stopwatch: StopwatchItemDto) {
    const stopwatchTime: Time = this.stopwatchTimes.get(stopwatch.id);

    stopwatchTime.seconds++;

    if (stopwatchTime.seconds === 60) {
      stopwatchTime.seconds = 0;
      stopwatchTime.minutes++;
    }

    if (stopwatchTime.minutes === 60) {
      stopwatchTime.minutes = 0;
      stopwatchTime.seconds = 0;
      stopwatchTime.hours++;
    }

    stopwatch.time = convertTimeToFormatedString(stopwatchTime.hours, stopwatchTime.minutes, stopwatchTime.seconds);
  }

  updateProjectTimer() {
    this.totalProjectSeconds++;

    if (this.totalProjectSeconds === 60) {
      this.totalProjectSeconds = 0;
      this.totalProjectMinutes++;
    }

    if (this.totalProjectMinutes === 60) {
      this.totalProjectMinutes = 0;
      this.totalProjectSeconds = 0;
      this.totalProjectHours++;
    }

    this.project.time = convertTimeToFormatedString(this.totalProjectHours, this.totalProjectMinutes, this.totalProjectSeconds);
  }

  clearAllIntervals() {
    if (this.timerIntervals) {
      this.timerIntervals.forEach((value, key) => {
        window.clearInterval(value);
        this.timerIntervals.delete(key);
      });
    }
  }
}
