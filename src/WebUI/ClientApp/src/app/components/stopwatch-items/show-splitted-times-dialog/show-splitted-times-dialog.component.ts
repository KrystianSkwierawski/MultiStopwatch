import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SplittedTimeDto, SplittedtimesClient } from '../../../web-api-client';

@Component({
  selector: 'app-show-splitted-times-dialog',
  templateUrl: './show-splitted-times-dialog.component.html',
  styleUrls: ['./show-splitted-times-dialog.component.scss']
})
export class ShowSplittedTimesDialogComponent implements OnInit {

  displayedColumns: string[] = ['index', 'time', 'delete'];

  dataSource;

  constructor(
    public dialogRef: MatDialogRef<ShowSplittedTimesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SplittedTimeDto[],
    private splittedtimesClient: SplittedtimesClient) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SplittedTimeDto>(this.data);
  }

  deleteSplittedTime(id: number) {
    this.splittedtimesClient.delete(id).subscribe(() => {
      this.data = this.data.filter(x => x.id !== id);
      this.dataSource = new MatTableDataSource<SplittedTimeDto>(this.data); 
    },
      error => console.error(error)
    );
  }
}