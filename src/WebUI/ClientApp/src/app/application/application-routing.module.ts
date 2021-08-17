import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from '../authentication/authorize.guard';
import { ApplicationComponent } from './application.component';
import { ProjectDetailsComponent } from './project-items/project-details/project-details.component';
import { ProjectsListComponent } from './project-items/projects-list/projects-list.component';


export const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    canActivate: [AuthorizeGuard],
    children: [
      { path: '', component: ProjectsListComponent },
      { path: 'project/:id', component: ProjectDetailsComponent },
      { path: '**', redirectTo: '' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ApplicationRoutingModule { }
