import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProjectsDataService } from '../../../services/projects-data-service';
import { FavoriteProjectItemDto, FavoriteProjectItemsClient, LikeOrDislikeProjectItemCommand } from '../../../web-api-client';

@Component({
  selector: 'app-favorite-projects-list',
  templateUrl: './favorite-projects-list.component.html',
  styleUrls: ['./favorite-projects-list.component.scss']
})
export class FavoriteProjectsListComponent implements OnInit {

  columnsToDisplay: string[] = ['column'];
  @ViewChild(MatTable) favoriteProjectsTable: MatTable<any>;
  favoriteProjects: FavoriteProjectItemDto[];

  constructor(private favoriteProjectItemsClient: FavoriteProjectItemsClient, private projectsDataService: ProjectsDataService) { }

  ngOnInit(): void {
    this.projectsDataService.favoriteProjects.subscribe(result => {
      this.favoriteProjects = result;
    });
  }


  dropped(event) {
    const previousIndex = this.favoriteProjects.findIndex(project => project === event.item.data);
    moveItemInArray(this.favoriteProjects, previousIndex, event.currentIndex);
    this.favoriteProjectsTable.renderRows();

    //zapisz w bazie danych kolejnosc
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
    this.favoriteProjectItemsClient.likeOrDislike(<LikeOrDislikeProjectItemCommand>{ id: projectId }).subscribe(() => {
      this.projectsDataService.loadData();
    });
  }
}
