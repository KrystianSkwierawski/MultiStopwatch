import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MultiStopwatch';

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.ngOnInit();
  }
}
