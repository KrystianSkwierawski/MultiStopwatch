import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountOverviewDialogComponent } from './account-overview/account-overview-dialog/account-overview-dialog.component';
import { ConfirmDeleteAccountDialogComponent } from './account-overview/confirm-delete-account-dialog/confirm-delete-account-dialog.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { FavoriteProjectsListComponent } from './favorite-project-items/favorite-projects-list/favorite-projects-list.component';
import { PertCalculatorDialogComponent } from './pert-calculator/pert-calculator-dialog/pert-calculator-dialog.component';
import { CreateProjectDialogComponent } from './project-items/create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from './project-items/edit-project-dialog/edit-project-dialog.component';
import { ProjectDetailsComponent } from './project-items/project-details/project-details.component';
import { ProjectsListComponent } from './project-items/projects-list/projects-list.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SplittedTimesListDialogComponent } from './splitted-times/splitted-times-list-dialog/splitted-times-list-dialog.component';
import { CreateStopwatchDialogComponent } from './stopwatch-items/create-stopwatch-dialog/create-stopwatch-dialog.component';
import { EditStopwatchDialogComponent } from './stopwatch-items/edit-stopwatch-dialog/edit-stopwatch-dialog.component';
import { StopwatchesListComponent } from './stopwatch-items/stopwatches-list/stopwatches-list.component';

@NgModule({
  declarations: [
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
    SharedModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationRoutingModule
  ],
})
export class ApplicationModule { }
