import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { AuthorizeViewComponent } from './utilities/authorize-view/authorize-view.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { FavoriteProjectsListComponent } from './project-items/favorite-projects-list/favorite-projects-list.component';
import { ProjectsListComponent } from './project-items/projects-list/projects-list.component';
import { CreateProjectDialogComponent } from './project-items/create-project-dialog/create-project-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AuthorizeViewComponent,
    SideMenuComponent,
    GenericListComponent,
    FavoriteProjectsListComponent,
    ProjectsListComponent,
    CreateProjectDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
