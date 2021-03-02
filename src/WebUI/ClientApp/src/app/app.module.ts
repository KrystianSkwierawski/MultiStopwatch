import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteProjectsListComponent } from './favorite-project-items/favorite-projects-list/favorite-projects-list.component';
import { MaterialModule } from './material/material.module';
import { CreateProjectDialogComponent } from './project-items/create-project-dialog/create-project-dialog.component';
import { ProjectDetailsComponent } from './project-items/project-details/project-details.component';
import { ProjectsListComponent } from './project-items/projects-list/projects-list.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AuthorizeViewComponent } from './utilities/authorize-view/authorize-view.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { SearchItemByTitleComponent } from './utilities/search-item-by-title/search-item-by-title.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizeViewComponent,
    SideMenuComponent,
    GenericListComponent,
    FavoriteProjectsListComponent,
    ProjectsListComponent,
    CreateProjectDialogComponent,
    SearchItemByTitleComponent,
    ProjectDetailsComponent,
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
