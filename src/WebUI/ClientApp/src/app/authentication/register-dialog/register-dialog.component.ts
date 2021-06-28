import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MustMatch } from '../../validators/must-match';
import { AuthenticationService } from '../authentication.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  form: FormGroup;
  errors;

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
      }]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(form: HTMLFormElement) {
    this.authService.register(form).subscribe(() => {
      this.openLoginDialog();
    },
      errors => this.errors = errors
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


  getErrorMessageFieldPassword(controlName) {
    const field = this.form.get(controlName);

    if (field.hasError('required')) {
      return `The ${controlName} field is required`;
    }

    if (field.hasError('mustMatch')) {
      return field.getError('mustMatch').message;
    }

    return '';
  }
}
