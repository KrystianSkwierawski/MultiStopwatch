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
import { FavoriteProjectsListComponent } from './components/favorite-project-items/favorite-projects-list/favorite-projects-list.component';
import { HomeComponent } from './components/home/home.component';
import { PertCalculatorDialogComponent } from './components/pert-calculator/pert-calculator-dialog/pert-calculator-dialog.component';
import { CreateProjectDialogComponent } from './components/project-items/create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from './components/project-items/edit-project-dialog/edit-project-dialog.component';
import { ProjectDetailsComponent } from './components/project-items/project-details/project-details.component';
import { ProjectsListComponent } from './components/project-items/projects-list/projects-list.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SplittedTimesListDialogComponent } from './components/splitted-times/splitted-times-list-dialog/splitted-times-list-dialog.component';
import { CreateStopwatchDialogComponent } from './components/stopwatch-items/create-stopwatch-dialog/create-stopwatch-dialog.component';
import { EditStopwatchDialogComponent } from './components/stopwatch-items/edit-stopwatch-dialog/edit-stopwatch-dialog.component';
import { StopwatchesListComponent } from './components/stopwatch-items/stopwatches-list/stopwatches-list.component';
import { ChartDialogComponent } from './components/utilities/chart-dialog/chart-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { GenericListComponent } from './components/utilities/generic-list/generic-list.component';
import { PaginatorComponent } from './components/utilities/paginator/paginator.component';
import { SearchItemByTitleComponent } from './components/utilities/search-item-by-title/search-item-by-title.component';
import { ThemeSelectorComponent } from './components/utilities/theme-selector/theme-selector.component';
import { MaterialModule } from './material/material.module';
import { ShortenPipe } from './pipes/shorten.pipe';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { SocialAuthenticationsComponent } from './components/utilities/social-authentications/social-authentications.component';


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
