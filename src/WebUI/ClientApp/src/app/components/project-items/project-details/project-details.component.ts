import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalChangesHubService } from '../../../services/local-changes-hub/local-changes-hub.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  constructor(private localChangesHubService: LocalChangesHubService) { }

  ngOnDestroy(): void {
    this.localChangesHubService.disconnect();
  }

  ngOnInit(): void {
  }

}
