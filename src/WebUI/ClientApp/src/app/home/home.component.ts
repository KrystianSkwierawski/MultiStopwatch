import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoginDialogComponent } from '../authentication/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../authentication/register-dialog/register-dialog.component';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  isAuthenticated: boolean;
  scrollRef = 0;

  constructor(private _dialog: MatDialog,
    private _router: Router,
    private _authService: AuthenticationService
  ) { }
   
  ngOnInit(): void {
    this._authService.isAuthenticated.pipe(take(1)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngAfterViewInit(): void {
    AOS.init({ offset: 350 });
  }

  openRegisterDialog() {
    if (this.isAuthenticated) {
      this._router.navigateByUrl("app");
      return;
    }

    this._dialog.open(RegisterDialogComponent, {
      panelClass: 'register-dialog'
    });
  }

  openLoginDialog() {
    if (this.isAuthenticated) {
      this._router.navigateByUrl("app");
      return;
    }

    this._dialog.open(LoginDialogComponent, {
      panelClass: 'login-dialog'
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollRef <= 5 ? this.scrollRef++ : AOS.refresh();
  }
}
