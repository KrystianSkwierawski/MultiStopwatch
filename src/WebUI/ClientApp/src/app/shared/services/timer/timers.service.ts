import { Injectable, OnInit } from '@angular/core';
import { ProjectItemDto, StopwatchItemDto } from '../../../web-api-client';
import { LocalChangesHubService } from '../local-changes-hub/local-changes-hub.service';
import { defaultTime, Time, timeToHHMMSS } from './Timer';

@Injectable()
export class TimersService implements OnInit {
  project: ProjectItemDto;
  totalProjectHours: number;
  totalProjectMinutes: number;
  totalProjectSeconds: number;
  stopwatchTimes = new Map<number, Time>();
  timerIntervals = new Map<number, number>();

  constructor(private _localChangesHubService: LocalChangesHubService) { }

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
    if (!stopwatch.isStarted) {
      return;
    }

    stopwatch.isStarted = false;

    this.pauseAndRemoveTimerById(stopwatch.id);
  }

  private pauseAndRemoveTimerById(stopwatchId: number) {
    const intervalId: number = this.timerIntervals.get(stopwatchId);
    window.clearInterval(intervalId);
    this.timerIntervals.delete(stopwatchId);
  }

  delete(stopwatchId: number) {
    this.pauseAndRemoveTimerById(stopwatchId);
  }

  restart(stopwatch: StopwatchItemDto) {
    stopwatch.time = defaultTime;
    this.pause(stopwatch);
  }

  async calcAndUpdateProjectTime(currentTimeString: string, previousTimeString?: string) {
    await this.calcTotalProjectTime(currentTimeString, previousTimeString);

    await this.updateProjectViewAndStoreLocalChanges();
  }

  async calcTotalProjectTime(currentTimeString: string, previousTimeString: string) {
    const currentTime: Time = new Time(currentTimeString);
    const previousTime: Time = new Time(previousTimeString);


    this.totalProjectHours += (currentTime.hours - previousTime.hours);
    this.totalProjectMinutes += (currentTime.minutes - previousTime.minutes);
    this.totalProjectSeconds += (currentTime.seconds - previousTime.seconds);
  }

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

    stopwatch.time = timeToHHMMSS(stopwatchTime);

    await this._localChangesHubService.storeLocalStopwatchChanges(stopwatch);
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
    const time: Time = new Time(`${this.totalProjectHours}:${this.totalProjectMinutes}:${this.totalProjectSeconds}`);
    this.project.time = timeToHHMMSS(time);

    await this._localChangesHubService.storeLocalProjectChanges(this.project);
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
