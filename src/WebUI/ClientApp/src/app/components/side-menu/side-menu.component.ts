import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  menuIsActivated: boolean = true;

  constructor(public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.toggleContent_disabledScrolling();
  }

  ngOnInit(): void {

  }


  handleToggler(): void {
    this.menuIsActivated = !this.menuIsActivated;

    this.toggleContent_disabledScrolling();
  }

  onResize(): void {
    if (this.isDesktopDevice()) {
      this.menuIsActivated = true;
    }

    this.toggleContent_disabledScrolling();
  }

  isDesktopDevice() {
    return (window.innerWidth > 768) ? true : false;;
  }

  toggleContent_disabledScrolling() {
    const element: HTMLEmbedElement = document.querySelector(".content");
    const className: string = "content_disabled-scrolling";

    // disable scroll if menu is hidden or is desktop device
    if (element.classList.contains(className) && (this.isDesktopDevice() || (!this.isDesktopDevice() && !this.menuIsActivated))) {

      element.classList.remove(className);
    }
    // enable scroll if menu is activated and it is mobile device
    else if (!element.classList.contains(className) && (!this.isDesktopDevice() && this.menuIsActivated)) {
      element.classList.add(className);
    }
  }
}


