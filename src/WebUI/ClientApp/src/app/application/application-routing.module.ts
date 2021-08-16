import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from '../authentication/authorize.guard';
import { ConfirmedEmailComponent } from '../authentication/confirmed-email/confirmed-email.component';
import { ResetPasswordComponent } from '../authentication/forgot-password/reset-password/reset-password.component';
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
