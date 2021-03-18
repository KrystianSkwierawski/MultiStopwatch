import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { ProjectItemDto, StopwatchItemDto } from '../web-api-client';
import { TimersService } from './timers.service';

@Injectable({
  providedIn: 'root'
})
export class LocalChangesHubService implements OnInit {

  hub = new signalR.HubConnectionBuilder()
    .withUrl('/localChangesHub')
    .build();

  constructor() { }

  ngOnInit(): void {

    this.hub.start().then(function () {
    }).catch(function (err) {
      return console.error(err.toString());
    });
  }

  async storeLocalStopwatchChanges(stopwatch: StopwatchItemDto) {
    await this.hub.invoke("SaveLocalStopwatchChanges", stopwatch);
  }

 async storeLocalProjectChanges(project: ProjectItemDto) {
    await this.hub.invoke("SaveLocalProjectChanges", project);
  }

  async saveStopwatchesChangesInDb() {
   await this.hub.invoke("SaveStopwatchesChangesInDb");
  }
}
