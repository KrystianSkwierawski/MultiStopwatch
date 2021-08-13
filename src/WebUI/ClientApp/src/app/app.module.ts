import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountOverviewDialogComponent } from './application/account-overview/account-overview-dialog/account-overview-dialog.component';
import { ConfirmDeleteAccountDialogComponent } from './application/account-overview/confirm-delete-account-dialog/confirm-delete-account-dialog.component';
import { ApplicationComponent } from './application/application.component';
import { ChartDialogComponent } from './application/chart-dialog/chart-dialog.component';
import { FavoriteProjectsListComponent } from './application/favorite-project-items/favorite-projects-list/favorite-projects-list.component';
import { PertCalculatorDialogComponent } from './application/pert-calculator/pert-calculator-dialog/pert-calculator-dialog.component';
import { CreateProjectDialogComponent } from './application/project-items/create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from './application/project-items/edit-project-dialog/edit-project-dialog.component';
import { ProjectDetailsComponent } from './application/project-items/project-details/project-details.component';
import { ProjectsListComponent } from './application/project-items/projects-list/projects-list.component';
import { SideMenuComponent } from './application/side-menu/side-menu.component';
import { SplittedTimesListDialogComponent } from './application/splitted-times/splitted-times-list-dialog/splitted-times-list-dialog.component';
import { CreateStopwatchDialogComponent } from './application/stopwatch-items/create-stopwatch-dialog/create-stopwatch-dialog.component';
import { EditStopwatchDialogComponent } from './application/stopwatch-items/edit-stopwatch-dialog/edit-stopwatch-dialog.component';
import { StopwatchesListComponent } from './application/stopwatch-items/stopwatches-list/stopwatches-list.component';
import { AuthorizeInterceptor } from './authentication/authorize.interceptor';
import { ConfirmedEmailComponent } from './authentication/confirmed-email/confirmed-email.component';
import { ForgotPasswordDialogComponent } from './authentication/forgot-password/forgot-password-dialog/forgot-password-dialog.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/forgot-password/reset-password/reset-password.component';
import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './authentication/register-dialog/register-dialog.component';
import { SocialAuthenticationsComponent } from './authentication/social-authentications/social-authentications.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    FavoriteProjectsListComponent,
    ProjectsListComponent,
    CreateProjectDialogComponent,
    CreateStopwatchDialogComponent,
    ProjectDetailsComponent,
    StopwatchesListComponent,
    EditProjectDialogComponent,
    EditStopwatchDialogComponent,
    SplittedTimesListDialogComponent,
    ChartDialogComponent,
    PertCalculatorDialogComponent,
    HomeComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    SocialAuthenticationsComponent,
    ApplicationComponent,
    AccountOverviewDialogComponent,
    ConfirmDeleteAccountDialogComponent,
    ConfirmedEmailComponent,
    ForgotPasswordComponent,
    ForgotPasswordDialogComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    SharedModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    CoolSocialLoginButtonsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1077472699821-km2iel871mij429reoh6uev8dl6k4v3a.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1447804865568403')
          }
        ]
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
