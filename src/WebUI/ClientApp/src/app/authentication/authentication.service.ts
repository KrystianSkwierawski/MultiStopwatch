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

  constructor(private route: Router, private accountsClient: AccountsClient) { }

  ngOnInit(): void {
    const token = this.getTokenFromLocalStorage();

    this.setToken(token);
    this.isAuthenticated.next(!!token);
  }

  register(user) {
    return this.accountsClient.register(user).pipe(
      catchError(errorResponse => {
        const errors = JSON.parse(errorResponse.response).errors;

        if (!errors)
          errors.push("An unexpected server error occurred.");

        return throwError(errors);
      })
    );
  }

  login(user, rememberMe: boolean) {
    return this.accountsClient.login(user).pipe(catchError(authResponse => {
      let error = JSON.parse(authResponse.response).errorMessage;

      if (!error)
        error = "An unexpected server error occurred.";


      return throwError(error);
    }),
      tap(authResponse => {
        this.setToken(authResponse.token);
        this.isAuthenticated.next(true);

        if (rememberMe)
          localStorage.setItem("token", authResponse.token);
      }
      ));
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated.next(false);
    this.setToken(null);
    this.route.navigate(['/']);
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem("token");
  }

  getToken(): string {
    return this._token;
  }

  setToken(token: string) {
    this._token = token;
  }
}
