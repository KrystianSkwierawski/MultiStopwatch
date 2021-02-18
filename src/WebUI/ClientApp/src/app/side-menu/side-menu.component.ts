import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProjectItemDTO } from '../project-items/project-item.module';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class SideMenuComponent implements OnInit {
  isActivated: boolean = true;

  @ViewChild(MatTable) favoriteProjectItemsTable: MatTable<any>;

  projectItems: Array<ProjectItemDTO> = [
    { title: "messenger", time: "15:00", isFavorite: true },
    { title: "quess", time: "20:00", isFavorite: true }
  ];

  favoriteProjectItems: Array<ProjectItemDTO>

  columnsToDisplay = ['title', 'time', 'dislike-project-button'];

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.favoriteProjectItems = this.projectItems.filter(x => x.isFavorite === true);
  }


  handleToggler(): void {
    this.isActivated = !this.isActivated;
  }

  onResize(event): void {
    const isDesktopDevice: boolean = (event.target.innerWidth > 768) ? true : false;

    if (isDesktopDevice) {
      this.isActivated = true;
      console.log(event.target.innerWidth);
    }
    console.log(event.target.innerWidth);
  }

  dropped(event: CdkDragDrop<any[]>) {
    const previousIndex = this.projectItems.findIndex(project => project === event.item.data);
    moveItemInArray(this.projectItems, previousIndex, event.currentIndex);
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
