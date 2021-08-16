import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule } from 'angularx-social-login';
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
import { CoreModule } from './core.module';
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
    ApplicationComponent,
    AccountOverviewDialogComponent,
    ConfirmDeleteAccountDialogComponent,
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
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
