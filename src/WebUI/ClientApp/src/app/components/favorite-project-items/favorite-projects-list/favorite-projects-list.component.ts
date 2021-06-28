import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { ProjectsDataService } from '../../../services/projects-data/projects-data-service';
import { FavoriteProjectItemDto, FavoriteProjectItemsClient, UpdateOrderIndexProjectItemCommand } from '../../../web-api-client';

@Component({
  selector: 'app-favorite-projects-list',
  templateUrl: './favorite-projects-list.component.html',
  styleUrls: ['./favorite-projects-list.component.scss']
})
export class FavoriteProjectsListComponent implements OnInit, OnDestroy {

  columnsToDisplay: string[] = ['column'];
  @ViewChild(MatTable) favoriteProjectsTable: MatTable<any>;
  favoriteProjects: FavoriteProjectItemDto[];
  favoriteProjectsSub: Subscription;

  constructor(private favoriteProjectItemsClient: FavoriteProjectItemsClient,
    private projectsDataService: ProjectsDataService,
    private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.favoriteProjectsSub = this.projectsDataService.favoriteProjects.subscribe(result => {
      this.favoriteProjects = result;
    });

    this.loadFavoriteProjectsAfterAuthenticate();
  }

  loadFavoriteProjectsAfterAuthenticate() {
    this.authService.token.pipe(take(1)).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.projectsDataService.loadFavoriteProjects();
      }
    });
  }

  updateOrderIndex(event) {
    const previousIndex = this.favoriteProjects.findIndex(project => project === event.item.data);

    moveItemInArray(this.favoriteProjects, previousIndex, event.currentIndex);

    this.favoriteProjectsTable.renderRows();

    this.favoriteProjectItemsClient.updateOrderIndex(<UpdateOrderIndexProjectItemCommand>{
      currentProjects: this.favoriteProjects
    }).subscribe();
  }

  onTouchMove(e: Event) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    this.favoriteProjectItemsClient.likeOrDislike(projectId).subscribe(() => {

      const homePath = (this.router.url === '/') ? true : false;

      if (homePath) {
        this.projectsDataService.loadData();
        return;
      }

      this.projectsDataService.loadFavoriteProjects();

    });
  }

  ngOnDestroy(): void {
    this.favoriteProjectsSub.unsubscribe();
  }
}
