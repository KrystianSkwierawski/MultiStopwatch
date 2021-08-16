import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmedEmailComponent } from './confirmed-email/confirmed-email.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';

export const routes: Routes = [
  { path: 'confirmed-email', component: ConfirmedEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule { }
