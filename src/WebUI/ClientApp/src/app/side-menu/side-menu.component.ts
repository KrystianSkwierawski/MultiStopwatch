import { Component, Input, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('sideMenu')
  sideMenu;

  constructor() { }

  ngOnInit(): void {

  }


  handleToggler(): void {
    this.isActivated = !this.isActivated;
    this.sideMenu.toggle();
  }

  onResize(event): void {
    const isDesktopDevice: boolean = (event.target.innerWidth > 768) ? true : false;

    if (isDesktopDevice) {
      this.isActivated = true;
      this.sideMenu.open();
    }
  }
}
