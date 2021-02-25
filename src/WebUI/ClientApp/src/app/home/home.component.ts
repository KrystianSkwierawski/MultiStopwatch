import { Component, OnInit } from '@angular/core';
import { ProjectItemDto, ProjectItemClient } from '../web-api-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: Array<ProjectItemDto>;
  favoriteProjects: Array<ProjectItemDto>;

  constructor(private projectItemClient: ProjectItemClient) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  filterFavoritesProjects() {
    this.favoriteProjects = this.projects.filter(x => x.isFavorite === true);
  }

  loadProjects() {
    this.projectItemClient.get().then(result => this.projects = result.projects);
    this.filterFavoritesProjects();
  }
}
