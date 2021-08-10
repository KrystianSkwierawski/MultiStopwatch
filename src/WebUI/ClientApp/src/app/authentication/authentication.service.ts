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
      catchError(error => {
        const errors: string[] = JSON.parse(error.response);

        if (errors?.length === 0)
          errors.push("An unexpected server error occurred.");

        return throwError(errors);
      })
    );
  }

  login(user, rememberMe: boolean) {
    return this._accountsClient.login(user).pipe(catchError(authResponse => {
      let error = JSON.parse(authResponse.response).errorMessage;

      if (!error)
        error = "An unexpected server error occurred.";

      return throwError(error);
    }),
      tap(authResponse => {
        this.setToken(authResponse.token);

        if (rememberMe)
          localStorage.setItem("token", authResponse.token);
      }
      ));
  }

  deleteUser(password: string) {
    return this._accountsClient.delete(password).pipe(catchError(error => {
      const errors: string[] = JSON.parse(error.response);

      if (errors?.length === 0)
        errors.push("An unexpected server error occurred.");

      return throwError(error);

    }));
  }

  updateUser(email: string, currentPassword: string, newPassword: string) {
    return this._accountsClient.update(email, currentPassword, newPassword).pipe(catchError(error => {
      const errors: string[] = JSON.parse(error.response);

      if (errors?.length === 0)
        errors.push("An unexpected server error occurred.")

      return throwError(errors);
    }));
  }

  resetPassword(email: string, token: string, password: string) {
    return this._accountsClient.resetPassword(email, token, password).pipe(catchError(error => {
      const errors: string[] = JSON.parse(error.response);

      if (errors?.length === 0)
        errors.push("An unexpected server error occurred.")

      return throwError(errors);
    }));
  }

  sendResetPasswordEmail(email: string) {
    return this._accountsClient.sendResetPasswordEmail(email).pipe(catchError(errorResponse => {
      let error = errorResponse.response;

      if (!error)
        error = "An unexpected server error occurred.";

      return throwError(error);
    }));
  }

  async loginWithGoogle() {
    const user = await this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    if (!user)
      return;

    return this._accountsClient.googleAuthenticate(user.idToken).pipe(tap(authResponse => {
      this.setToken(authResponse.token);
    }));
  }


  async loginWithFacebook() {
    const user = await this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);

    if (!user)
      return;

    return this._accountsClient.facebookAuthenticate(user.email, user.name, user.id, user.authToken).pipe(tap(authResponse => {
      this.setToken(authResponse.token);
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
}
