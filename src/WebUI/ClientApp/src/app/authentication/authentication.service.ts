import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountsClient } from '../web-api-client';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private _token: string;
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router, private _accountsClient: AccountsClient) { }

  ngOnInit(): void {
    this.token = this.getTokenFromLocalStorage();
  }

  register(user) {
    return this._accountsClient.register(user).pipe(
      catchError(errorResponse => {
        const errors = JSON.parse(errorResponse.response).errors;

        if (!errors)
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
        this._token = authResponse.token;

        if (rememberMe)
          localStorage.setItem("token", authResponse.token);
      }
      ));
  }

  logout() {
    localStorage.removeItem("token");
    this.token = null;
    this._router.navigate(['/']);
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem("token");
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
    this.isAuthenticated.next(!!token);
  }
}
