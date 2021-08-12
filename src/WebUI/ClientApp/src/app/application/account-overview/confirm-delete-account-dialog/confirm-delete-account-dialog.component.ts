import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../authentication/authentication.service';

@Component({
  selector: 'app-confirm-delete-account-dialog',
  templateUrl: './confirm-delete-account-dialog.component.html',
  styleUrls: ['./confirm-delete-account-dialog.component.scss']
})
export class ConfirmDeleteAccountDialogComponent implements OnInit {

  error;

  constructor(
    private _authenticationService: AuthenticationService,
    private _authService: AuthenticationService,
    private _dialogRef: MatDialogRef<ConfirmDeleteAccountDialogComponent>) { }

  ngOnInit(): void {
  }

  onDeleteAccount(password: string) {
    this._authenticationService.deleteUser(password).subscribe(() => {
      this._authService.logout();
      this.closeDialog("success");
    },
      errors => this.error = errors
    );
  }

  closeDialog(success?: string): void {
    this._dialogRef.close(success);
  }

}
