import { Component, OnInit } from '@angular/core';
import { AccountStatsClient, AccountStatsDto } from '../../web-api-client';

@Component({
  selector: 'app-account-overview-dialog',
  templateUrl: './account-overview-dialog.component.html',
  styleUrls: ['./account-overview-dialog.component.scss']
})
export class AccountOverviewDialogComponent implements OnInit {

  accountStats: AccountStatsDto;

  constructor(private _accountStatsClient: AccountStatsClient) { }

  ngOnInit(): void {
    this.getAccountStats();
  }

  getAccountStats() {
    this._accountStatsClient.get().subscribe(accountStats => {
      this.accountStats = accountStats;
    });
  }
}
