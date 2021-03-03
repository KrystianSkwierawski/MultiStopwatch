import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateStopwatchItemCommand, StopwatchItemDto, StopwatchItemsClient } from '../../../web-api-client';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { CreateStopwatchDialogComponent } from '../create-stopwatch-dialog/create-stopwatch-dialog.component';

@Component({
  selector: 'app-stopwatches-list',
  templateUrl: './stopwatches-list.component.html',
  styleUrls: ['./stopwatches-list.component.scss']
})
export class StopwatchesListComponent implements OnInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;

  oryginalStopwatches: StopwatchItemDto[];
  stopwatches: StopwatchItemDto[];
  projectId: number;
  titlesArray: string[];

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private stopwatchItemsClient: StopwatchItemsClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params.id;  
    });

    this.loadStopwatches();
  }

  addStopwatch(stopwatchItem: StopwatchItemDto) {
    if (this.searchProjectComponent) {
      this.searchProjectComponent.cleanInput();
    }

    this.stopwatchItemsClient.create(<CreateStopwatchItemCommand>{
      title: stopwatchItem.title,
      projectId: this.projectId
    }).subscribe(() => {
      this.loadStopwatches();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateStopwatchDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addStopwatch(result)
      }
    });
  }

  filterTitlesArray() {
    this.titlesArray = this.stopwatches.map((e) => { return e.title });
  }

  filterStopwatches(searchingTitle: string) {
    const filteredStopwatches: StopwatchItemDto[] = this.oryginalStopwatches.filter(x => x.title.includes(searchingTitle));
    this.stopwatches = filteredStopwatches;
  }

  loadStopwatches() {
    this.stopwatchItemsClient.get(this.projectId).subscribe(result => {
      this.stopwatches = result;
      this.oryginalStopwatches = result;
      this.filterTitlesArray();
    });
  }

  pauseTimer(stopwatch: StopwatchItemDto) {
    stopwatch.isStarted = false;
  }

  restartTimer(stopwatch: StopwatchItemDto) {
    console.log(stopwatch);
  }

  startTimer(stopwatch: StopwatchItemDto) {
    stopwatch.isStarted = true;
  }
}
