import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteProjectItemsClient, PaginatedListOfProjectItemDto, ProjectItemsClient } from '../../../web-api-client';

@Injectable({
  providedIn: 'root'
})

export class ProjectsDataService {

  private _paginatedListOfProjectItemDtoSource = new BehaviorSubject(new PaginatedListOfProjectItemDto());
  paginatedListOfProjectItemDto = this._paginatedListOfProjectItemDtoSource.asObservable();

  private _favoriteProjectsSource = new BehaviorSubject(null);
  favoriteProjects = this._favoriteProjectsSource.asObservable();

  constructor(private projectItemsClient: ProjectItemsClient, private favoriteProjectItemsClient: FavoriteProjectItemsClient) { }

  loadData() {
    this.loadFavoriteProjects();
    this.loadProjects();
  }

  loadFavoriteProjects() {
    this.favoriteProjectItemsClient.get().subscribe(
      result => {
        this._favoriteProjectsSource.next(result);
      },
      error => console.error(error)
    );
  }

  loadProjects(pageNumber: number = 1, pageSize: number = 50) {
    this.projectItemsClient.getWithPagination(pageNumber, pageSize).subscribe(
      result => {
        this._paginatedListOfProjectItemDtoSource.next(result);
      },
      error => console.error(error)
    );
  }
}
