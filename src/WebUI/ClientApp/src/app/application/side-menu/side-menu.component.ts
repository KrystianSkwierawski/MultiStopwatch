import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AccountOverviewDialogComponent } from '../account-overview/account-overview-dialog/account-overview-dialog.component';
import { PertCalculatorDialogComponent } from '../pert-calculator/pert-calculator-dialog/pert-calculator-dialog.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  menuIsActivated: boolean;

  constructor(private _dialog: MatDialog, private _authService: AuthenticationService, private _router: Router) { }

  ngAfterViewInit(): void {
    this.toggleContent_disabledScrolling();
    this.toggleDisplayNoneInShowDiagramButtonIfMobileDevice();
  }

  ngOnInit(): void {
    this.menuIsActivated = this.isDesktopDevice();
  }

  logout() {
    this._authService.logout();
  }

  showPertCalculatorDialog() {
    this._dialog.open(PertCalculatorDialogComponent, {
      panelClass: 'pert-calculator-dialog'
    });
  }

  handleToggler(): void {
    this.menuIsActivated = !this.menuIsActivated;

    this.toggleContent_disabledScrolling();

    this.toggleDisplayNoneInShowDiagramButtonIfMobileDevice();
  }

  toggleDisplayNoneInShowDiagramButtonIfMobileDevice() {
    const showDiagramButton: HTMLElement = document.querySelector('.open-chart-dialog-button');

    if (showDiagramButton) {
      this.menuIsActivated && !this.isDesktopDevice() ? showDiagramButton.classList.add('d-none') : showDiagramButton.classList.remove('d-none');
    }
  }


  onOpenAccountOverviewDialog() {
    const dialogRef = this._dialog.open(AccountOverviewDialogComponent, {
      panelClass: 'account-overview-dialog'
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.isDesktopDevice()) {
      this.menuIsActivated = true;
    }

    this.toggleContent_disabledScrolling();
    this.toggleDisplayNoneInShowDiagramButtonIfMobileDevice();
  }

  isDesktopDevice() {
    return window.innerWidth > 768;
  }

  toggleContent_disabledScrolling() {
    const element: HTMLEmbedElement = document.querySelector('.content');
    const className = 'content_disabled-scrolling';

    if (element) {
      if (element.classList.contains(className)) {
        this.disableScrollContentIfMenuIsHiddenOrIsDesktopDevice(element, className);
      } else {
        this.enableScrollContentIfMenuIsActivatedAndIsMobileDevice(element, className);
      }
    }
  }

  disableScrollContentIfMenuIsHiddenOrIsDesktopDevice(element: HTMLElement, className: string) {
    if (this.isDesktopDevice() || (!this.isDesktopDevice() && !this.menuIsActivated)) {
      element.classList.remove(className);
    }
  }

  enableScrollContentIfMenuIsActivatedAndIsMobileDevice(element: HTMLElement, className: string) {
    if (!this.isDesktopDevice() && this.menuIsActivated) {
      element.classList.add(className);
    }
  }

  isStopwatchesPath() {
    return this._router.url.match(/app\/project\/[0-9](?:items=1)?/gm);
  }
}




