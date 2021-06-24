import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.scss']
})
export class AuthorizeViewComponent implements OnInit {
  isAuthenticated;

  constructor() { }

  ngOnInit() {
    //this.authorizeService.isAuthenticated().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    const user = localStorage.getItem("token");

    if (user) {
      this.isAuthenticated = true;
    }
    else {
      this.isAuthenticated = false;

    }
  }
}
