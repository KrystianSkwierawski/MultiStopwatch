import { AfterViewInit, Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SplittedTimeDto } from '../../../web-api-client';

@Component({
  selector: 'app-show-splitted-times-dialog',
  templateUrl: './show-splitted-times-dialog.component.html',
  styleUrls: ['./show-splitted-times-dialog.component.scss']
})
export class ShowSplittedTimesDialogComponent implements OnInit {

  displayedColumns: string[] = ['index', 'time', 'delete'];

  dataSource;

  constructor(public dialogRef: MatDialogRef<ShowSplittedTimesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SplittedTimeDto[]) { }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SplittedTimeDto>(this.data);
  }

  hideDialog(): void {
    this.dialogRef.close();
  }
}
