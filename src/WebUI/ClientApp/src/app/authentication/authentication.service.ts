import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountsClient } from '../web-api-client';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private _token: string;
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router,
    private _accountsClient: AccountsClient,
    private _socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.setToken(this.getTokenFromLocalStorage());
  }

  register(user) {
    return this._accountsClient.register(user).pipe(
      catchError(errorResponse => {
        return this.handleError(errorResponse);
      })
    );
  }

  login(user, rememberMe: boolean) {
    return this._accountsClient.login(user).pipe(catchError(errorResponse => {
      return this.handleError(errorResponse);
    }),
      tap(token => {
        this.setToken(token);

        if (rememberMe)
          localStorage.setItem("token", token);
      }
      ));
  }

  deleteUser(password: string) {
    return this._accountsClient.delete(password).pipe(catchError(errorResponse => {
      return this.handleError(errorResponse);
    }));
  }

  updateUser(email: string, currentPassword: string, newPassword: string) {
    return this._accountsClient.update(email, currentPassword, newPassword).pipe(catchError(errorResponse => {
      return this.handleError(errorResponse);
    }));
  }

  resetPassword(email: string, token: string, password: string) {
    return this._accountsClient.resetPassword(email, token, password).pipe(catchError(errorResponse => {
      return this.handleError(errorResponse);
    }));
  }

  sendResetPasswordEmail(email: string) {
    return this._accountsClient.sendResetPasswordEmail(email).pipe(catchError(errorResponse => {
      return this.handleError(errorResponse);
    }));
  }

  async loginWithGoogle() {
    const user = await this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    if (!user)
      return;

    return this._accountsClient.googleAuthenticate(user.idToken).pipe(tap(token => {
      this.setToken(token);
    }));
  }


  async loginWithFacebook() {
    const user = await this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

    if (!user)
      return;

    return this._accountsClient.facebookAuthenticate(user.email, user.name, user.id, user.authToken).pipe(tap(token => {
      this.setToken(token);
    }));
  }

  logout() {
    localStorage.removeItem("token");
    this.setToken(null);
    this._router.navigate(['/']);
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem("token");
  }

  getToken(): string {
    return this._token;
  }

  setToken(token: string) {
    this._token = token;
    this.isAuthenticated.next(!!token);
  }

  handleError(errorResponse) {
    let error: string | string[];

    try {
      error = JSON.parse(errorResponse.response);
    } catch (e) {
      error = errorResponse.response;
    }

    if (!error)
      error = "An unexpected server error occurred.";

    return throwError(error);
  }

}
