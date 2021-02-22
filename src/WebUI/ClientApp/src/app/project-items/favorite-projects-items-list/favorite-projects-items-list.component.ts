import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-favorite-projects-items-list',
  templateUrl: './favorite-projects-items-list.component.html',
  styleUrls: ['./favorite-projects-items-list.component.scss']
})
export class FavoriteProjectsItemsListComponent implements OnInit {

  columnsToDisplay = ['column'];

  @ViewChild(MatTable) favoriteProjectItemsTable: MatTable<any>;

  favoriteProjectItems: Array<ProjectItemDTO> = [
    { id: 1, title: "messenger", time: "15:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true }
  ];

  constructor() { }

  ngOnInit(): void {
    this.favoriteProjectItems = this.favoriteProjectItems.filter(x => x.isFavorite === true);
  }


  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.favoriteProjectItems.findIndex(project => project === event.item.data);
    moveItemInArray(this.favoriteProjectItems, previousIndex, event.currentIndex);
    this.favoriteProjectItemsTable.renderRows();

    //zapisz w bazie danych kolejnosc
  }

  hoveredDivId: number = null;

  handleDislikeProjectButtonMouseEnter(index: number) {
    this.hoveredDivId = index;
  }

  handleDislikeProjectButtonMouseLeave() {
    this.hoveredDivId = null;
  }
}
