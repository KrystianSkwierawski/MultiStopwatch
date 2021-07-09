import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalChangesHubService } from '../../../shared/services/local-changes-hub/local-changes-hub.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  constructor(private _localChangesHubService: LocalChangesHubService) { }

  ngOnInit(): void {
    this._localChangesHubService.connect();
  }

  ngOnDestroy(): void {
    this._localChangesHubService.disconnect();
  }
}
