import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthenticationService,
    private dialog: MatDialog,
    private formBulider: FormBuilder,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.form = this.formBulider.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
      confirmPassword: ['', {
        validators: [Validators.required]
      }],
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(form: HTMLFormElement) {
    this.authService.register(form).subscribe(() => {
      this.openLoginDialog();
    },
      error => console.log(error)
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openLoginDialog() {
    this.closeDialog();

    this.dialog.open(LoginDialogComponent, {
      panelClass: 'login-dialog'
    });
  }
}
