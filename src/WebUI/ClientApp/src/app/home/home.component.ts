import { Component, OnInit } from '@angular/core';
import { ProjectItemClient, ProjectItemDto, ProjectsVm } from '../web-api-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects: ProjectItemDto[];
  favoriteProjects: ProjectItemDto[];

  constructor(private projectItemClient: ProjectItemClient) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  filterFavoritesProjects() {
    this.favoriteProjects = this.projects.filter(x => x.isFavorite === true);
  }

  loadProjects() {
    this.projectItemClient.get().subscribe(
      result => {
        this.projects = result.projects
        this.filterFavoritesProjects();
      },
      error => console.error(error)
    );
  }
}
