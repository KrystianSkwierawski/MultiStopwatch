import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountStatsClient, AccountStatsDto } from '../../../web-api-client';
import { ConfirmDeleteAccountDialogComponent } from '../confirm-delete-account-dialog/confirm-delete-account-dialog.component';

@Component({
  selector: 'app-account-overview-dialog',
  templateUrl: './account-overview-dialog.component.html',
  styleUrls: ['./account-overview-dialog.component.scss']
})
export class AccountOverviewDialogComponent implements OnInit {

  form: FormGroup;
  accountStats: AccountStatsDto;

  constructor(private _accountStatsClient: AccountStatsClient,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<AccountOverviewDialogComponent>) { }
  
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
    });

    this.getAccountStats();
  }

  getAccountStats() {
    this._accountStatsClient.get().subscribe(accountStats => {
      this.accountStats = accountStats;
    });
  }

  onSubmit(value) {

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
