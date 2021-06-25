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
    this.accountsClient.register(user).subscribe(
      () => {
        this.route.navigateByUrl("/");
      },
      error => console.log(error)
    );
  }

  login(user) {
    this.accountsClient.login(user).subscribe(
      (authResponse) => {
        this.isAuthenticated.next(authResponse.token);
        localStorage.setItem("token", authResponse.token);
        this.route.navigateByUrl("/projects");
      },
      error => console.log(error)
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated.next(null);
    this.route.navigateByUrl("/");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
