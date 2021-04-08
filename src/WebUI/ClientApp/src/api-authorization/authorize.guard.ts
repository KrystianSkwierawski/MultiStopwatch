import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from './authorize.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) {
  }

  canActivate(_next: ActivatedRouteSnapshot) {
    return this.authorize.isAuthenticated()
      .pipe(tap(isAuthenticated => this.handleAuthorization(isAuthenticated)));
  }

  private handleAuthorization(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      return false;
    }

    return true;
  }
}





