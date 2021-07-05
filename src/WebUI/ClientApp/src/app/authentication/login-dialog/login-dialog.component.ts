import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthenticationService } from '../authentication.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  form: FormGroup;
  error;

  constructor(private _authService: AuthenticationService,
    private _dialog: MatDialog,
    private _formBulider: FormBuilder,
    private _dialogRef: MatDialogRef<LoginDialogComponent>,
    private _router: Router,
    private _socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.form = this._formBulider.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', {
        validators: [Validators.required]
      }],
    });
  }

  logout() {
    this._authService.logout();
  }

  onSubmit(form: HTMLFormElement, rememberMe: boolean) {
    this._authService.login(form, rememberMe).subscribe(authResponse => {
      if (authResponse.token) {
        this.closeDialog();
        this._router.navigateByUrl("/projects");
      }
    },
      error => this.error = error
    );
  }

  loginWithGoogle(): void {
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this._router.navigateByUrl("/projects"));
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  openRegisterDialog() {
    this.closeDialog();

    this._dialog.open(RegisterDialogComponent, {
      panelClass: 'register-dialog'
    });
  }

}
