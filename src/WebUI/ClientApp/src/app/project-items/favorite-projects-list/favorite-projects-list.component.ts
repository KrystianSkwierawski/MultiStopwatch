import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-favorite-projects-list',
  templateUrl: './favorite-projects-list.component.html',
  styleUrls: ['./favorite-projects-list.component.scss']
})
export class FavoriteProjectsListComponent implements OnInit {

  columnsToDisplay = ['column'];

  @ViewChild(MatTable) favoriteProjectsTable: MatTable<any>;

  favoriteProjects: Array<ProjectItemDTO> = [
    { id: 1, title: "messenger", time: "15:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true }
  ];

  constructor() { }

  ngOnInit(): void {
    this.favoriteProjects = this.favoriteProjects.filter(x => x.isFavorite === true);
  }


  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.favoriteProjects.findIndex(project => project === event.item.data);
    moveItemInArray(this.favoriteProjects, previousIndex, event.currentIndex);
    this.favoriteProjectsTable.renderRows();

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
