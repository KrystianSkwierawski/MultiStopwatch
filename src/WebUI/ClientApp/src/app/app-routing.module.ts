import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { ProjectDetailsComponent } from './application/project-items/project-details/project-details.component';
import { ProjectsListComponent } from './application/project-items/projects-list/projects-list.component';
import { AuthorizeGuard } from './authentication/authorize.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => import("./home/home.module").then(m => m.HomeModule) },
  {
    path: 'app', component: ApplicationComponent, canActivate: [AuthorizeGuard], children: [
      { path: '', component: ProjectsListComponent, canActivate: [AuthorizeGuard] },
      { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [AuthorizeGuard] },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
