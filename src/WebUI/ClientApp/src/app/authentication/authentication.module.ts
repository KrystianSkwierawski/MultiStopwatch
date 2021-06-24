import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'authentication/login', component: LoginComponent },
      { path: 'authentication/register', component: RegisterComponent },
    ])
  ],
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent, LoginComponent]
})
export class AuthenticationModule { }
