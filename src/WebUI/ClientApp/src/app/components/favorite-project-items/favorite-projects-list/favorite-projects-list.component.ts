import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthorizeService } from '../../../../api-authorization/authorize.service';
import { ProjectsDataService } from '../../../services/projects-data-service';
import { FavoriteProjectItemDto, FavoriteProjectItemsClient, UpdateOrderIndexProjectItemCommand } from '../../../web-api-client';

@Component({
  selector: 'app-favorite-projects-list',
  templateUrl: './favorite-projects-list.component.html',
  styleUrls: ['./favorite-projects-list.component.scss']
})
export class FavoriteProjectsListComponent implements OnInit {

  columnsToDisplay: string[] = ['column'];
  @ViewChild(MatTable) favoriteProjectsTable: MatTable<any>;
  favoriteProjects: FavoriteProjectItemDto[];

  constructor(private favoriteProjectItemsClient: FavoriteProjectItemsClient, private projectsDataService: ProjectsDataService, private authorize: AuthorizeService) { }

  ngOnInit(): void {
    this.projectsDataService.favoriteProjects.subscribe(result => {
      this.favoriteProjects = result;
    });

    this.loadFavoriteProjectsAfterAuthenticate();
  }

  loadFavoriteProjectsAfterAuthenticate() {
    let authorizeSub: Subscription;

    authorizeSub = this.authorize.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.projectsDataService.loadFavoriteProjects();

        if (authorizeSub)
          authorizeSub.unsubscribe();

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
      this.projectsDataService.loadData();
    });
  }
}
