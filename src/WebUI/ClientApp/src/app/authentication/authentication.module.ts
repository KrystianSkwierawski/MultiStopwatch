import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { SharedModule } from '../shared/shared.module';
import { ConfirmedEmailComponent } from './confirmed-email/confirmed-email.component';
import { ForgotPasswordDialogComponent } from './forgot-password/forgot-password-dialog/forgot-password-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { SocialAuthenticationsComponent } from './social-authentications/social-authentications.component';


@NgModule({
  declarations: [
    ConfirmedEmailComponent,
    ForgotPasswordComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    SocialAuthenticationsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoolSocialLoginButtonsModule,
  ],
  exports: [
    ConfirmedEmailComponent,
    ForgotPasswordComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    SocialAuthenticationsComponent,

  ]
})
export class AuthenticationModule { }
