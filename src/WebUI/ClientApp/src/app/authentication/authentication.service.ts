import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountsClient } from '../web-api-client';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Subject<any> = new Subject();

  constructor(private route: Router, private accountsClient: AccountsClient) { }

  register(user) {
    this.accountsClient.register(user).subscribe(
      () => {
        this.route.navigateByUrl("authentication/login");
      },
      error => console.log(error)
    );
  }

  login(user) {
    this.accountsClient.login(user).subscribe(
      (authResponse) => {
        this.user.next(authResponse.token);
        localStorage.setItem("token", authResponse.token);
        this.route.navigateByUrl("/projects");
      },
      error => console.log(error)
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.user.next(null);
    this.route.navigateByUrl("");
  }

}
