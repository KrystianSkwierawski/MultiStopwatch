import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  isActivated: boolean = true;

  @ViewChild(MatTable) favoriteProjectsTable: MatTable<any>;

  projects: Array<any>;

  columnsToDisplay = ['title', 'time', 'dislike-project-button'];

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.projects = [
      { title: "messenger", time: "15:00" },
      { title: "quess", time: "20:00" }
    ];
  }


  handleToggler(): void {
    this.isActivated = !this.isActivated;
  }

  onResize(event): void {
    const isDesktopDevice: boolean = (event.target.innerWidth > 768) ? true : false;

    if (isDesktopDevice) {
      this.isActivated = true;
    }
  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.projects.findIndex(project => project === event.item.data);
    moveItemInArray(this.projects, previousIndex, event.currentIndex);
    this.favoriteProjectsTable.renderRows();
  }

  hoveredDivId: number = null;

  handleDislikeProjectButtonMouseEnter(index: number) {
    this.hoveredDivId = index;
  }

  handleDislikeProjectButtonMouseLeave() {
    this.hoveredDivId = null;
  }
}
