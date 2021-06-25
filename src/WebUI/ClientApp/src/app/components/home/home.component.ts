import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication.service';
import { LoginDialogComponent } from '../../authentication/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../../authentication/register-dialog/register-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated: string;

  constructor(private dialog: MatDialog,
    private route: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.pipe(take(1)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  openRegisterDialog() {
    if (this.isAuthenticated) {
      this.route.navigateByUrl("/projects");
      return;
    }

    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      panelClass: 'register-dialog'
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.openLoginDialog();
      }

    });
  }

  openLoginDialog() {
    if (this.isAuthenticated) {
      this.route.navigateByUrl("/projects");
      return;
    }

    const dialogRef = this.dialog.open(LoginDialogComponent, {
      panelClass: 'login-dialog'

    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.route.navigateByUrl("/projects");
      }
    });
  }
}
