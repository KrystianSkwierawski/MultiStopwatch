import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './project-items/project-details/project-details.component';
import { ProjectsListComponent } from './project-items/projects-list/projects-list.component';


export const routes: Routes = [
  { path: '', component: ProjectsListComponent },
  { path: 'project/:id', component: ProjectDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
