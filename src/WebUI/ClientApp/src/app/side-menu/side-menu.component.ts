import { Component, ElementRef, OnInit } from '@angular/core';
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
  menuIsActivated: boolean = true;

  projectItems: Array<ProjectItemDTO> = [
    { title: "messenger", time: "15:00", isFavorite: true },
    { title: "quess", time: "20:00", isFavorite: true }
  ];

  favoriteProjectItems: Array<ProjectItemDTO>

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.favoriteProjectItems = this.projectItems.filter(x => x.isFavorite === true);
  }


  handleToggler(): void {
    this.menuIsActivated = !this.menuIsActivated;
  }

  onResize(event): void {
    const isDesktopDevice: boolean = (event.target.innerWidth > 768) ? true : false;

    if (isDesktopDevice) {
      this.menuIsActivated = true;
    }
  }


}
