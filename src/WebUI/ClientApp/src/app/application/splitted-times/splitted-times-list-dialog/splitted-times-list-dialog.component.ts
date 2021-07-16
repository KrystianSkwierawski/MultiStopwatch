import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SplittedTime } from '../../../web-api-client';

@Component({
    selector: 'app-splitted-times-list-dialog',
    templateUrl: './splitted-times-list-dialog.component.html',
    styleUrls: ['./splitted-times-list-dialog.component.scss']
})
export class SplittedTimesListDialogComponent implements OnInit {

    displayedColumns: string[] = ['index', 'time', 'delete'];

    dataSource;
    onDelete = new EventEmitter<SplittedTime[]>();

    constructor(
        private _dialogRef: MatDialogRef<SplittedTimesListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SplittedTime[]) { }


    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<SplittedTime>(this.data);
    }

    deleteSplittedTime(index: number) {
        this.data.splice(index, 1);
        this.onDelete.emit(this.data);
        this.dataSource = new MatTableDataSource<SplittedTime>(this.data);
    }
}
