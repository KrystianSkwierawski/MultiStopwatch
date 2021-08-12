import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { ProjectsDataService } from '../../../shared/services/projects-data/projects-data-service';
import { FavoriteProjectItemDto, FavoriteProjectItemsClient, UpdateOrderIndexProjectItemCommand } from '../../../web-api-client';

@Component({
  selector: 'app-favorite-projects-list',
  templateUrl: './favorite-projects-list.component.html',
  styleUrls: ['./favorite-projects-list.component.scss']
})
export class FavoriteProjectsListComponent implements OnInit, OnDestroy {

  constructor(private _favoriteProjectItemsClient: FavoriteProjectItemsClient,
    private _projectsDataService: ProjectsDataService,
    private _router: Router,
    private _authService: AuthenticationService) { }

  columnsToDisplay: string[] = ['column'];
  @ViewChild(MatTable) favoriteProjectsTable: MatTable<any>;
  favoriteProjects: FavoriteProjectItemDto[];
  favoriteProjectsSub: Subscription;

  hoveredDivId: number = null;

  ngOnInit(): void {
    this.favoriteProjectsSub = this._projectsDataService.favoriteProjects.subscribe(result => {
      this.favoriteProjects = result;
    });

    this.loadFavoriteProjectsAfterAuthenticate();
  }

  loadFavoriteProjectsAfterAuthenticate() {
    this._authService.isAuthenticated.pipe(take(1)).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this._projectsDataService.loadFavoriteProjects();
      }
    });
  }

  updateOrderIndex(event) {
    const previousIndex = this.favoriteProjects.findIndex(project => project === event.item.data);

    moveItemInArray(this.favoriteProjects, previousIndex, event.currentIndex);

    this.favoriteProjectsTable.renderRows();

    this._favoriteProjectItemsClient.updateOrderIndex(<UpdateOrderIndexProjectItemCommand>{
      currentProjects: this.favoriteProjects
    }).subscribe();
  }

  onTouchMove(e: Event) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    this._favoriteProjectItemsClient.likeOrDislike(projectId).subscribe(() => {

      const projectsCompontent = this._router.url.match(/app\/[0-9](?:items=1)?/gm);

      if (projectsCompontent) {
        this._projectsDataService.loadData();
        return;
      }

      this._projectsDataService.loadFavoriteProjects();

    });
  }

  ngOnDestroy(): void {
    this.favoriteProjectsSub.unsubscribe();
  }
}
