import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SplittedTimeDto, SplittedtimesClient } from '../../../web-api-client';

@Component({
  selector: 'app-splitted-times-list-dialog',
  templateUrl: './splitted-times-list-dialog.component.html',
  styleUrls: ['./splitted-times-list-dialog.component.scss']
})
export class SplittedTimesListDialogComponent implements OnInit {

  displayedColumns: string[] = ['index', 'time', 'delete'];

  dataSource;

  constructor(
    private _dialogRef: MatDialogRef<SplittedTimesListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SplittedTimeDto[],
    private _splittedtimesClient: SplittedtimesClient) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SplittedTimeDto>(this.data);
  }

  deleteSplittedTime(id: number) {
    this._splittedtimesClient.delete(id).subscribe(() => {
      this.data = this.data.filter(x => x.id !== id);
      this.dataSource = new MatTableDataSource<SplittedTimeDto>(this.data); 
    },
      error => console.error(error)
    );
  }
}
