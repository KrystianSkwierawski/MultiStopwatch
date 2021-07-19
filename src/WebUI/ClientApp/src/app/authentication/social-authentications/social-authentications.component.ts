import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-social-authentications',
  templateUrl: './social-authentications.component.html',
  styleUrls: ['./social-authentications.component.scss']
})
export class SocialAuthenticationsComponent implements OnInit {

  @Output() onLoggedIn = new EventEmitter();

  constructor(private _router: Router, private _authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle() {
    (await this._authService.loginWithGoogle()).subscribe(authResponse => {
      if (authResponse.token) {
        this.onLoggedIn.emit(null);
        this._router.navigateByUrl("app?items=1");
      }
    },
      error => this.onLoggedIn.emit(error)
    );
  }

  async loginWithFacebook() {
    (await this._authService.loginWithFacebook()).subscribe(authResponse => {
      if (authResponse.token) {
        this.onLoggedIn.emit(null);
        this._router.navigateByUrl("app?items=1");
      }
    },
      error => this.onLoggedIn.emit(error)
    );
  }
}
