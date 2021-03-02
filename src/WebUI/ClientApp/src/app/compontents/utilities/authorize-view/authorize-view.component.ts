import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../../../api-authorization/authorize.service';

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.scss']
})
export class AuthorizeViewComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;

  constructor(private authorizeService: AuthorizeService) { }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
  }
}
