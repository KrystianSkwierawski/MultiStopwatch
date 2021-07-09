import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizeInterceptor } from './authentication/authorize.interceptor';
import { LoginDialogComponent } from './authentication/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './authentication/register-dialog/register-dialog.component';
import { FavoriteProjectsListComponent } from './application/favorite-project-items/favorite-projects-list/favorite-projects-list.component';
import { HomeComponent } from './home/home.component';
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
import { ChartDialogComponent } from './shared/utilities/chart-dialog/chart-dialog.component';
import { ConfirmDeleteDialogComponent } from './shared/utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { GenericListComponent } from './shared/utilities/generic-list/generic-list.component';
import { PaginatorComponent } from './shared/utilities/paginator/paginator.component';
import { SearchItemByTitleComponent } from './shared/utilities/search-item-by-title/search-item-by-title.component';
import { ThemeSelectorComponent } from './shared/utilities/theme-selector/theme-selector.component';
import { MaterialModule } from './shared/material/material.module';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { SocialAuthenticationsComponent } from './authentication/social-authentications/social-authentications.component';
import { ApplicationComponent } from './application/application.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    GenericListComponent,
    FavoriteProjectsListComponent,
    ProjectsListComponent,
    CreateProjectDialogComponent,
    CreateStopwatchDialogComponent,
    SearchItemByTitleComponent,
    ProjectDetailsComponent,
    StopwatchesListComponent,
    EditProjectDialogComponent,
    EditStopwatchDialogComponent,
    PaginatorComponent,
    ConfirmDeleteDialogComponent,
    ThemeSelectorComponent,
    SplittedTimesListDialogComponent,
    ChartDialogComponent,
    PertCalculatorDialogComponent,
    ShortenPipe,
    HomeComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    SocialAuthenticationsComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
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
