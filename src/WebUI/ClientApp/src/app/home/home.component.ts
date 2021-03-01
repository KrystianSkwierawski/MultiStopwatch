import { Component, OnInit } from '@angular/core';
import { ProjectItemClient, ProjectItemDto, FavoriteProjectItemDto } from '../web-api-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: ProjectItemDto[];
  favoriteProjects: FavoriteProjectItemDto[];

  constructor(private projectItemClient: ProjectItemClient) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectItemClient.get().subscribe(
      result => {
        this.projects = result.projects;
        this.favoriteProjects = result.favoriteProjects;
      },
      error => console.error(error)
    );
  }
}
