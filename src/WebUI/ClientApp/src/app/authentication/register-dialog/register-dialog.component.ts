import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
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
  facebookImageUrl;
  errors;

  constructor(private _authService: AuthenticationService,
    private _dialog: MatDialog,
    private _formBulider: FormBuilder,
    public _dialogRef: MatDialogRef<RegisterDialogComponent>,
    private _router: Router,

  ) { }

  ngOnInit(): void {
    this.form = this._formBulider.group({
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
    this._authService.logout();
  }

  onSubmit(form: HTMLFormElement) {
    this._authService.register(form).subscribe(() => {
      this.openLoginDialog();
    },
      errors => this.errors = errors
    );
  }

  async loginWithGoogle() {
    (await this._authService.loginWithGoogle()).subscribe(authResponse => {
      if (authResponse.token) {
        this.closeDialog();
        this._router.navigateByUrl("/projects");
      }
    },
      error => this.errors = error
    );
  }

  async loginWithFacebook() {
    (await this._authService.loginWithFacebook()).subscribe(authResponse => {
      if (authResponse.token) {
        this.closeDialog();
        this._router.navigateByUrl("/projects");
      }
    },
      error => this.errors = error
    );
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  openLoginDialog() {
    this.closeDialog();

    this._dialog.open(LoginDialogComponent, {
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
