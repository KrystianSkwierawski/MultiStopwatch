import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { AccountsClient } from '../../../web-api-client';

@Component({
  selector: 'app-confirm-delete-account-dialog',
  templateUrl: './confirm-delete-account-dialog.component.html',
  styleUrls: ['./confirm-delete-account-dialog.component.scss']
})
export class ConfirmDeleteAccountDialogComponent implements OnInit {

  errors;

  constructor(private _accountsClient: AccountsClient,
    private _authService: AuthenticationService,
    private _dialogRef: MatDialogRef<ConfirmDeleteAccountDialogComponent>) { }
  
  ngOnInit(): void {
  }

  onDeleteAccount(password: string) {
    this._accountsClient.delete(password).pipe(catchError(error => {
      const errors: string[] = JSON.parse(error.response);

      if (errors?.length === 0)
        errors.push("An unexpected server error occurred.");

      return throwError(error);

    })).subscribe(() => {

      this._authService.logout();
      this.closeDialog("success");
    },
      error => this.errors = error
    );
  }

  closeDialog(success?: string): void {
    this._dialogRef.close(success);
  }
   
}
