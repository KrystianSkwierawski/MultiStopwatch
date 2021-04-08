import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { FavoriteProjectItemsClient, PaginatedListOfProjectItemDto, ProjectItemsClient } from '../web-api-client';

@Injectable({
  providedIn: 'root'
})

export class ProjectsDataService {

  private paginatedListOfProjectItemDtoSource = new BehaviorSubject(new PaginatedListOfProjectItemDto());
  paginatedListOfProjectItemDto = this.paginatedListOfProjectItemDtoSource.asObservable();


  private favoriteProjectsSource = new BehaviorSubject([]);
  favoriteProjects = this.favoriteProjectsSource.asObservable();


  constructor(private projectItemsClient: ProjectItemsClient, private favoriteProjectItemsClient: FavoriteProjectItemsClient, private authorize: AuthorizeService) {
    this.loadDataAfterAuthenticate();
  }

  loadDataAfterAuthenticate() {
    const timer = setTimeout(() => {
      if (this.authorize.isAuthenticated()) {
        this.loadData();

        clearInterval(timer);
        return;
      }
    }, 3000);
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

  loadProjects(pageNumber: number = 1, pageSize: number = 50) {
    this.projectItemsClient.getWithPagination(pageNumber, pageSize).subscribe(
      result => {
        this.paginatedListOfProjectItemDtoSource.next(result)
      },
      error => console.error(error)
    );
  }
}
