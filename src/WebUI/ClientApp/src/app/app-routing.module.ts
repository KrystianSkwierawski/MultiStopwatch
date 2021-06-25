import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeGuard } from './authentication/authorize.guard';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailsComponent } from './components/project-items/project-details/project-details.component';
import { ProjectsListComponent } from './components/project-items/projects-list/projects-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsListComponent, canActivate: [AuthorizeGuard] },
  { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [AuthorizeGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
