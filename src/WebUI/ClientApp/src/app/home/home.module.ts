import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    AuthenticationModule,
    HomeRoutingModule,
  ],
})
export class HomeModule { }
