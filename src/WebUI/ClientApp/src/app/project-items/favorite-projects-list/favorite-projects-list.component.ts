import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProjectItemDto } from '../../web-api-client';

@Component({
  selector: 'app-favorite-projects-list',
  templateUrl: './favorite-projects-list.component.html',
  styleUrls: ['./favorite-projects-list.component.scss']
})
export class FavoriteProjectsListComponent implements OnInit {

  columnsToDisplay = ['column'];

  @ViewChild(MatTable) favoriteProjectsTable: MatTable<any>;

  @Input() favoriteProjects: ProjectItemDto[];

  constructor() { }

  ngOnInit(): void {
  }


  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.favoriteProjects.findIndex(project => project === event.item.data);
    moveItemInArray(this.favoriteProjects, previousIndex, event.currentIndex);
    this.favoriteProjectsTable.renderRows();

    //zapisz w bazie danych kolejnosc
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  activeLinkWhenDislikeProjectButtonIsNotHovered(index: number, elementId: number): string {
    return (this.hoveredDivId === index) ? 'javascript:void(0);' : `project/${elementId}`;
  }
}
