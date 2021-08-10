import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountsClient } from '../../../web-api-client';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _accountsClient: AccountsClient, private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openResetPasswordDialog() {
    const dialogRef = this._dialog.open(ForgotPasswordDialogComponent);

    dialogRef.afterClosed().subscribe((email: string) => {
      if (email)
        this.resetPassword(email);
    });
  }

  private resetPassword(email: string) {
    this._accountsClient.resetPassword(email).subscribe(() => {
      alert("Your password has been reset, check your email.");
    },
      error => console.log(error)
    );
  }
}
