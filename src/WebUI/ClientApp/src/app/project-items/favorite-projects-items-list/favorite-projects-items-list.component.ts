import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-favorite-projects-items-list',
  templateUrl: './favorite-projects-items-list.component.html',
  styleUrls: ['./favorite-projects-items-list.component.scss']
})
export class FavoriteProjectsItemsListComponent implements OnInit {

  columnsToDisplay = ['column'];

  @ViewChild(MatTable) favoriteProjectItemsTable: MatTable<any>;

  @Input() favoriteProjectItems;

  constructor() { }

  ngOnInit(): void {
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
