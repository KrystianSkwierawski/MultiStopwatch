import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../authentication/authentication.service';
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
  error;

  constructor(private _accountStatsClient: AccountStatsClient,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AccountOverviewDialogComponent>,
    private _accountsClient: AccountsClient,
    private _authenticationService: AuthenticationService) { }

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
      if (!user) {
        return;
      }

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
    this._authenticationService.updateUser(form.email, form.currentPassword, form.newPassword).subscribe(() => {
      this.closeDialog();
      alert('Successfully updated user data.');
    },
      errors => this.error = errors
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
    this._authenticationService.resendConfirmationEmail().subscribe(() => {
      alert('Confirmation email sended');
    },
      error => this.error = error
    );
  }

  onOpenConfirmDeleteAccountDialog() {
    this._dialog.open(ConfirmDeleteAccountDialogComponent).afterClosed().subscribe(success => {
      if (success) {
        this.closeDialog('success');
      }
    });
  }

  closeDialog(success?: string): void {
    this._dialogRef.close(success);
  }
}
