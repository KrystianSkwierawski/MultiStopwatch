import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteProjectItemsClient, ProjectItemDto, ProjectItemsClient } from '../web-api-client';

@Injectable({
  providedIn: 'root'
})

export class ProjectsDataService implements OnInit {

  private projectsSource = new BehaviorSubject([]);
  projects = this.projectsSource.asObservable();


  private favoriteProjectsSource = new BehaviorSubject([]);
  favoriteProjects = this.favoriteProjectsSource.asObservable();


  constructor(private projectItemsClient: ProjectItemsClient, private favoriteProjectItemsClient: FavoriteProjectItemsClient) {
    this.loadData();
  }

  ngOnInit(): void {

  }

  loadData() {
    this.loadFavoriteProjects();
    this.loadProjects();
  }

  loadFavoriteProjects() {
    this.favoriteProjectItemsClient.get().subscribe(
      result => {
        this.favoriteProjectsSource.next(result);
      },
      error => console.error(error)
    );
  }

  loadProjects() {
    this.projectItemsClient.get().subscribe(
      result => {
        this.projectsSource.next(result);
      },
      error => console.error(error)
    );
  }
}
