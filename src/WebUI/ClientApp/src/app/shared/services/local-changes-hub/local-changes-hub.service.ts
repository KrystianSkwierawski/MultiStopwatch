import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ProjectItemDto, StopwatchItemDto } from '../../../web-api-client';

@Injectable({
  providedIn: 'root'
})
export class LocalChangesHubService implements OnInit {

  hub: signalR.HubConnection;

  constructor() { }

  ngOnInit(): void {

  }

  connect() {
    this.hub = new signalR.HubConnectionBuilder()
      .withUrl('/localChangesHub')
      .build();

    this.hub.start().then(function () {
    }).catch(function (err) {
      //return console.error(err.toString());
      return;
    });
  }

  async storeLocalStopwatchChanges(stopwatch: StopwatchItemDto) {
    await this.hub.invoke('SaveLocalStopwatchChanges', stopwatch);
  }

  async storeLocalProjectChanges(project: ProjectItemDto) {
    await this.hub.invoke('SaveLocalProjectChanges', project);
  }

  async saveStopwatchesChangesInDb() {
    await this.hub.invoke('SaveStopwatchesChangesInDb');
  }

  async deleteStopwatchFromLocalChanges(stopwatchId: number) {
    await this.hub.invoke('DeleteLocalStopwatchChangesById', stopwatchId);
  }

  async saveAllChangesInDb() {
    await this.hub.invoke('SaveAllChangesInDb');
  }

  disconnect() {
    this.hub.stop();
  }
}
