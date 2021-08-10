import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsClient } from '../../../web-api-client';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  errors;
  token: string;
  email: string;
  form: FormGroup;

  constructor(
    private _formBulider: FormBuilder,
    private _accountsClient: AccountsClient,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.token = this._activatedRoute.snapshot.queryParams["token"];
    this.email = this._activatedRoute.snapshot.queryParams["email"];
    console.log(this.token);
    console.log(this.email);


    this.form = this._formBulider.group({
      password: ['', {
        validators: [Validators.required]
      }],
    });
  }

  onSubmit(form: HTMLFormElement) {
    this._authenticationService.resetPassword(this.email, this.token, form.password).subscribe(() => {
      this._router.navigate(['/']);
    },
      errors => this.errors = errors
    );
  }

}
