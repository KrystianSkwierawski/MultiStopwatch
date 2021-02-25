import { Component, OnInit } from '@angular/core';
import { ProjectItemDTO } from '../project-items/project-item.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projects: Array<ProjectItemDTO>;
  favoriteProjects: Array<ProjectItemDTO>;

  constructor() {}

  ngOnInit(): void {
    this.loadProjects();
  }

  filterFavoritesProjects() {
    this.favoriteProjects = this.projects.filter(x => x.isFavorite === true);
  }

  loadProjects() {
    //await get projects
    this.projects = [];
    this.filterFavoritesProjects();
  }
}
