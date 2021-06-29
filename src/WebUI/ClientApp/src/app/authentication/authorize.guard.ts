import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private _router: Router, private _authService: AuthenticationService) {
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.getToken())
      return true;

    this._router.navigate(['/']);
  }
}
