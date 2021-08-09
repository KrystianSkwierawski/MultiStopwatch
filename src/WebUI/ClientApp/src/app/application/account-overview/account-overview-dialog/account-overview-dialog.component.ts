import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MustMatch } from '../../../shared/validators/must-match';
import { AccountsClient, AccountStatsClient, AccountStatsDto, ApplicationUser } from '../../../web-api-client';
import { ConfirmDeleteAccountDialogComponent } from '../confirm-delete-account-dialog/confirm-delete-account-dialog.component';

@Component({
  selector: 'app-account-overview-dialog',
  templateUrl: './account-overview-dialog.component.html',
  styleUrls: ['./account-overview-dialog.component.scss']
})
export class AccountOverviewDialogComponent implements OnInit {

  form: FormGroup;
  accountStats: AccountStatsDto;
  user: ApplicationUser;
  errors: string[];

  constructor(private _accountStatsClient: AccountStatsClient,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AccountOverviewDialogComponent>,
    private _accountsClient: AccountsClient) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      currentPassword: [''],
      newPassword: [''],
      confirmNewPassword: ['']
    }, {
      validator: MustMatch('newPassword', 'confirmNewPassword')
    });

    this.getAccountStats();
    this.getUser();
  }

  getUser() {
    this._accountsClient.get().subscribe(user => {
      if (!user)
        return;

      this.user = user;
      this.form.patchValue(this.user);
    });
  }

  getAccountStats() {
    this._accountStatsClient.get().subscribe(accountStats => {
      this.accountStats = accountStats;
    });
  }

  updateUser(form: HTMLFormElement) {
    this._accountsClient.update(form.email, form.currentPassword, form.newPassword).pipe(catchError(error => {
      const errors: string[] = JSON.parse(error.response);

      if (errors?.length === 0)
        errors.push("An unexpected server error occurred.")

      return throwError(errors);

    })).subscribe(() => {
      this.closeDialog();
      alert("Successfully updated user data.");
    },
      errors => this.errors = errors
    );
  }

  getErrorMessageFieldPassword(controlName) {
    const field = this.form.get(controlName);

    if (field.hasError('required')) {
      return `The ${controlName} field is required`;
    }

    if (field.hasError('mustMatch')) {
      return field.getError('mustMatch').message;
    }

    return '';
  }

  resendConfirmationEmail() {
    this._accountsClient.resendConfirmationEmail().subscribe(() => {
      alert("Confirmation email sended");
    });
  }

  onOpenConfirmDeleteAccountDialog() {
    this._dialog.open(ConfirmDeleteAccountDialogComponent).afterClosed().subscribe(success => {
      if (success)
        this.closeDialog("success");
    });
  }

  closeDialog(success?: string): void {
    this._dialogRef.close(success);
  }
}
