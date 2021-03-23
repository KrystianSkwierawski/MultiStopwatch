import { Injectable, OnInit } from '@angular/core';
import { ProjectItemDto, StopwatchItemDto } from '../../web-api-client';
import { LocalChangesHubService } from '../local-changes-hub.service';
import { defaultTime, Time, totalSecondsToHHMMSS } from './Timer';


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

    const time: Time = new Time(this.project.time);

    this.totalProjectHours = time.hours;
    this.totalProjectMinutes = time.minutes;
    this.totalProjectSeconds = time.seconds;
  }

  pause(stopwatch: StopwatchItemDto) {
    stopwatch.isStarted = false;

    //pause and remove timer
    const intervalId: number = this.timerIntervals.get(stopwatch.id);
    window.clearInterval(intervalId);
    this.timerIntervals.delete(stopwatch.id);

    this.localChangesHubService.storeLocalStopwatchChanges(stopwatch);
  }

  async restart(stopwatch: StopwatchItemDto) {
    stopwatch.time = defaultTime;
    this.pause(stopwatch);
  }

  async calcAndUpdateProjectTime(stopwatches: StopwatchItemDto[]) {
    await this.calcTotalProjectTime(stopwatches);

    await this.updateProjectViewAndStoreLocalChanges();
  }

  async calcTotalProjectTime(stopwatches: StopwatchItemDto[]) {
    this.totalProjectHours = 0;
    this.totalProjectMinutes = 0;
    this.totalProjectSeconds = 0;

    stopwatches.forEach(stopwatch => {
      const time: Time = new Time(stopwatch.time);

      this.totalProjectHours += time.hours;
      this.totalProjectMinutes += time.minutes;
      this.totalProjectSeconds += time.seconds;
    });
  }

  //async updateProjectTimeAfterResetingOrRemovingAnyStopwatch(stopwatchTime: string) {
  //  const time: Time = new Time(stopwatchTime)

  //  this.totalProjectHours -= time.hours;
  //  this.totalProjectMinutes -= time.minutes;
  //  this.totalProjectSeconds -= time.seconds;

  //  this.updateProjectViewAndStoreLocalChanges();
  //}

  //async updateProjectTimeAfterEditingStopwatchTime(previousStopwatchTime: string, currentStopwatchTime: string = defaultTime) {
  //  const time: Time = getDIffTime(previousStopwatchTime, currentStopwatchTime);
  //  this.totalProjectHours += time.hours;
  //  this.totalProjectMinutes += time.minutes;
  //  this.totalProjectSeconds += time.seconds;

  //  this.updateProjectViewAndStoreLocalChanges();
  //}

  start(stopwatch: StopwatchItemDto) {
    const stopwatchTime: Time = new Time(stopwatch.time);

    this.stopwatchTimes.set(stopwatch.id, stopwatchTime);

    stopwatch.isStarted = true;
    const intervalId: number = window.setInterval(async () => {

      this.updateStopwatchTimer(stopwatch);
      this.updateProjectTimer();

    }, 1000);

    this.timerIntervals.set(stopwatch.id, intervalId);
  }

  async updateStopwatchTimer(stopwatch: StopwatchItemDto) {
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

    stopwatch.time = totalSecondsToHHMMSS(stopwatchTime.hours, stopwatchTime.minutes, stopwatchTime.seconds);

    await this.localChangesHubService.storeLocalStopwatchChanges(stopwatch);
  }

  async updateProjectTimer() {
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

    this.updateProjectViewAndStoreLocalChanges();
  }

  async updateProjectViewAndStoreLocalChanges() {
    this.project.time = totalSecondsToHHMMSS(this.totalProjectHours, this.totalProjectMinutes, this.totalProjectSeconds);

    await this.localChangesHubService.storeLocalProjectChanges(this.project);
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
