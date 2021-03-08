import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateStopwatchItemCommand, StopwatchItemDto, StopwatchItemsClient, UpdateStopwatchItemCommand } from '../../../web-api-client';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { CreateStopwatchDialogComponent } from '../create-stopwatch-dialog/create-stopwatch-dialog.component';
import { EditStopwatchDialogComponent } from '../edit-stopwatch-dialog/edit-stopwatch-dialog.component';

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

  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private stopwatchItemsClient: StopwatchItemsClient) { }

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

  openDialogToCreateNewStopwatch(): void {
    const dialogRef = this.dialog.open(CreateStopwatchDialogComponent);

    dialogRef.afterClosed().subscribe((result: StopwatchItemDto) => {
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

  openDialogToEditStopwatch(stopwatchItem: StopwatchItemDto) {
    const dialogRef = this.dialog.open(EditStopwatchDialogComponent, {
      data: stopwatchItem
    });

    dialogRef.afterClosed().subscribe((result: StopwatchItemDto) => {
      if (result) {
        result.id = stopwatchItem.id;
        this.updateStopwatch(result);
      }
    });
  }

  updateStopwatch(stopwatchItem: StopwatchItemDto) {
    this.stopwatchItemsClient.update(UpdateStopwatchItemCommand.fromJS(stopwatchItem)).subscribe(() => {
      this.loadStopwatches();
    });
  }

  deleteStopwatch(id: number) {
    this.stopwatchItemsClient.delete(id).subscribe(() => {
      this.loadStopwatches();
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
