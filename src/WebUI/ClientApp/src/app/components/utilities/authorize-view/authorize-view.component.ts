import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../../../api-authorization/authorize.service';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.scss']
})
export class AuthorizeViewComponent implements OnInit {
  isAuthenticated;

  constructor(private authorizeService: AuthorizeService) { }

  ngOnInit() {
    this.authorizeService.isAuthenticated().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }
}
