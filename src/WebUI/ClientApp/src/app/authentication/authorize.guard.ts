import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const user = localStorage.getItem("token");

    if (user) {
      return;
    }
    else {
      this.router.navigateByUrl("authenticate/login");
    }
  }

  private handleAuthorization(isAuthenticated: boolean, state: RouterStateSnapshot) {
    //if (!isAuthenticated) {
    //  this.router.navigate(ApplicationPaths.LoginPathComponents, {
    //    queryParams: {
    //      [QueryParameterNames.ReturnUrl]: state.url
    //    }
    //  });
    //}
  }
}
