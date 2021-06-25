import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../../authentication/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../../authentication/register-dialog/register-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
  }

  openRegisterDialog() {
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
