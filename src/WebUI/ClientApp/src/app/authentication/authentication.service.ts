import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountsClient } from '../web-api-client';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private route: Router, private accountsClient: AccountsClient) { }

  register(user) {
    return this.accountsClient.register(user);
  }

  login(user) {
    return this.accountsClient.login(user).pipe(tap(authResponse => {
      this.isAuthenticated.next(authResponse.token);
      localStorage.setItem("token", authResponse.token);
    }));
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated.next(null);
    this.route.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
