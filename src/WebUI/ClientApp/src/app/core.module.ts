import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthorizeInterceptor } from './authentication/authorize.interceptor';


@NgModule({
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('1077472699821-km2iel871mij429reoh6uev8dl6k4v3a.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1447804865568403')
          }
        ]
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ]
})
export class CoreModule { }
