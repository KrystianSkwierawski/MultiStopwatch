import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountsClient } from '../../../web-api-client';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(
    private _formBulider: FormBuilder,
    private _accountsClient: AccountsClient,
    private _dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.form = this._formBulider.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
    });
  }

  onSubmit(form: HTMLFormElement) {
    this._authenticationService.sendResetPasswordEmail(form.email).subscribe(() => {
      this.closeDialog();
      alert('Your password has been reset, check your email.');
    },
      error => this.error = error
    );
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
