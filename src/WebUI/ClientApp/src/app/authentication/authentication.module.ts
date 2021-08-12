import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ConfirmDeleteAccountDialogComponent } from "../application/account-overview/confirm-delete-account-dialog/confirm-delete-account-dialog.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { ConfirmedEmailComponent } from "./confirmed-email/confirmed-email.component";
import { ForgotPasswordDialogComponent } from "./forgot-password/forgot-password-dialog/forgot-password-dialog.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./forgot-password/reset-password/reset-password.component";
import { LoginDialogComponent } from "./login-dialog/login-dialog.component";
import { RegisterDialogComponent } from "./register-dialog/register-dialog.component";
import { SocialAuthenticationsComponent } from "./social-authentications/social-authentications.component";


@NgModule({
  declarations: [
    ConfirmDeleteAccountDialogComponent,
    ConfirmedEmailComponent,
    ForgotPasswordComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    SocialAuthenticationsComponent,
  ],
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    ConfirmDeleteAccountDialogComponent,
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
