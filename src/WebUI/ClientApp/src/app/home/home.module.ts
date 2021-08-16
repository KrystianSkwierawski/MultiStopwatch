import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthenticationModule
  ]
})
export class HomeModule { }
