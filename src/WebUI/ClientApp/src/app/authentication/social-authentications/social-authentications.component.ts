import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-social-authentications',
  templateUrl: './social-authentications.component.html',
  styleUrls: ['./social-authentications.component.scss']
})
export class SocialAuthenticationsComponent implements OnInit {

  @Output() logIn = new EventEmitter<any>();

  constructor(private _router: Router, private _authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle() {
    (await this._authService.loginWithGoogle()).subscribe(token => {
      if (token) {
        this.logIn.emit(null);
        this._router.navigateByUrl('app?items=1');
      }
    },
      error => this.logIn.emit(error)
    );
  }

  async loginWithFacebook() {
    (await this._authService.loginWithFacebook()).subscribe(token => {
      if (token) {
        this.logIn.emit(null);
        this._router.navigateByUrl('app?items=1');
      }
    },
      error => this.logIn.emit(error)
    );
  }
}
