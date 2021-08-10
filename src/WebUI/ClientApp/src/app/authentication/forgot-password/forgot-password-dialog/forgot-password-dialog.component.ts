import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountsClient } from '../../../web-api-client';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _formBulider: FormBuilder,
    private _accountsClient: AccountsClient,
    private _dialogRef: MatDialogRef<ForgotPasswordDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this._formBulider.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
    });
  }

  onSubmit(form: HTMLFormElement) {
    this._accountsClient.sendResetPasswordEmail(form.email).subscribe(() => {
      this.closeDialog();
      alert("Your password has been reset, check your email.");
    },
      error => console.log(error) //TODO: handle error
    );
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
