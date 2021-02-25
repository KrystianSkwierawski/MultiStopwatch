import { Component, OnInit } from '@angular/core';
import { ProjectItemClient, ProjectItemDto, ProjectsVm } from '../web-api-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  vm: ProjectsVm;

  projects: ProjectItemDto[];
  favoriteProjects: ProjectItemDto[];

  constructor(private projectItemClient: ProjectItemClient) {
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  filterFavoritesProjects() {
    this.favoriteProjects = this.projects.filter(x => x.isFavorite === true);
  }

  loadProjects() {
    this.projectItemClient.get().subscribe(
      result => {
        this.vm = result;

        if (this.vm.projects.length) {
          this.projects = this.vm.projects;
          this.filterFavoritesProjects();         
        } 
      },
      error => console.error(error)
    );
  }
}
