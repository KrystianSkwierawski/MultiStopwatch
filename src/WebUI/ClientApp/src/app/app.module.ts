import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteProjectsListComponent } from './components/favorite-project-items/favorite-projects-list/favorite-projects-list.component';
import { CreateProjectDialogComponent } from './components/project-items/create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from './components/project-items/edit-project-dialog/edit-project-dialog.component';
import { EditStopwatchDialogComponent } from './components/stopwatch-items/edit-stopwatch-dialog/edit-stopwatch-dialog.component';
import { ProjectDetailsComponent } from './components/project-items/project-details/project-details.component';
import { ProjectsListComponent } from './components/project-items/projects-list/projects-list.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { CreateStopwatchDialogComponent } from './components/stopwatch-items/create-stopwatch-dialog/create-stopwatch-dialog.component';
import { StopwatchesListComponent } from './components/stopwatch-items/stopwatches-list/stopwatches-list.component';
import { AuthorizeViewComponent } from './components/utilities/authorize-view/authorize-view.component';
import { GenericListComponent } from './components/utilities/generic-list/generic-list.component';
import { SearchItemByTitleComponent } from './components/utilities/search-item-by-title/search-item-by-title.component';
import { MaterialModule } from './material/material.module';
import { PaginatorComponent } from './components/utilities/paginator/paginator.component';
import { ConfirmDeleteDialogComponent } from './components/utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { ThemeSelectorComponent } from './components/utilities/theme-selector/theme-selector.component';
import { SplittedTimesListDialogComponent } from './components/splitted-times/splitted-times-list-dialog/splitted-times-list-dialog.component';
import { ChartDialogComponent } from './components/utilities/chart-dialog/chart-dialog.component';
import { PertCalculatorDialogComponent } from './components/pert-calculator/pert-calculator-dialog/pert-calculator-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthorizeViewComponent,
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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
