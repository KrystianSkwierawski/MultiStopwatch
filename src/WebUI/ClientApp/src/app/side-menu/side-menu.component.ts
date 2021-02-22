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



  favoriteProjectItems: Array<ProjectItemDTO>

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
    
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
