import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountsClient } from '../web-api-client';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private route: Router, private accountsClient: AccountsClient) { }

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
        this.token.next(authResponse.token);
        localStorage.setItem("token", authResponse.token);
      }
      ));
  }

  logout() {
    localStorage.removeItem("token");
    this.token.next(null);
    this.route.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
