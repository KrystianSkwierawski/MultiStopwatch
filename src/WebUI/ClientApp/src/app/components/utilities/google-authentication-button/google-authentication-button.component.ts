import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-authentication-button',
  templateUrl: './google-authentication-button.component.html',
  styleUrls: ['./google-authentication-button.component.scss']
})
export class GoogleAuthenticationButtonComponent implements OnInit {

  @Output() onLoginWithGoogle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.onLoginWithGoogle.emit(null);
  }
}
