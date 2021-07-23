import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
=======
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
>>>>>>> master
import { LocalChangesHubService } from '../../../shared/services/local-changes-hub/local-changes-hub.service';
import { defaultTime } from '../../../shared/services/timer/Timer';
import { TimersService } from '../../../shared/services/timer/timers.service';
import { ChartDialogComponent } from '../../../shared/utilities/chart-dialog/chart-dialog.component';
import { ConfirmDeleteDialogComponent } from '../../../shared/utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { SearchItemByTitleComponent } from '../../../shared/utilities/search-item-by-title/search-item-by-title.component';
import { PaginatedListOfStopwatchItemDto, ProjectItemDto, ProjectItemsClient, SplittedTime, Status, StopwatchItemDto, StopwatchItemsClient } from '../../../web-api-client';
import { SplittedTimesListDialogComponent } from '../../splitted-times/splitted-times-list-dialog/splitted-times-list-dialog.component';
import { CreateStopwatchDialogComponent } from '../create-stopwatch-dialog/create-stopwatch-dialog.component';
import { EditStopwatchDialogComponent } from '../edit-stopwatch-dialog/edit-stopwatch-dialog.component';

@Component({
  selector: 'app-stopwatches-list',
  templateUrl: './stopwatches-list.component.html',
  styleUrls: ['./stopwatches-list.component.scss'],

})
export class StopwatchesListComponent implements OnInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;
  @ViewChild('paginator') paginator: MatPaginator;

  paginatedListOfStopwatchItemDto: PaginatedListOfStopwatchItemDto;
  stopwatches: StopwatchItemDto[];
  project: ProjectItemDto;
  projectId: number;
  titlesArray: string[];
<<<<<<< HEAD
  itemsStatus: string = "doing";
=======
  itemsStatus: Status = Status.Doing;

  status = {
    doing: Status.Doing,
    done: Status.Done,
  }
>>>>>>> master

  constructor(private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _stopwatchItemsClient: StopwatchItemsClient,
    private _projectItemsClient: ProjectItemsClient,
    private _timersService: TimersService,
    private _localChangesHubService: LocalChangesHubService,
    ) {
  }

  initProjectId() {
    this.projectId = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
<<<<<<< HEAD
    this._activatedRoute.params.subscribe(params => {
      let status: string = params["itemsStatus"];

      if (!status)
        status = "doing"; //default value

      this.itemsStatus = status;
    });

    this.setProjectId();
=======
    this.initProjectId();
>>>>>>> master

    this.loadProject();
    this.loadStopwatches();
  }

  onOpenCreateStopwatchDialog(): void {
    const dialogRef = this._dialog.open(CreateStopwatchDialogComponent, {
      data: this.projectId
    });

    dialogRef.afterClosed().subscribe(async (success: StopwatchItemDto) => {
      if (success) {
        this.tryCleanSearchStopwatchCompontentInput();

        this._timersService.clearAllIntervals();

        await this._localChangesHubService.saveStopwatchesChangesInDb();

        this.loadStopwatches();
      }
    });
  }

  tryCleanSearchStopwatchCompontentInput() {
    if (this.searchProjectComponent) {
      this.searchProjectComponent.cleanInput();
<<<<<<< HEAD
      this.itemsStatus = "doing";
=======
      this.itemsStatus = Status.Doing;
    }
  }

  getStopwatchesFilteredByStatus(items: StopwatchItemDto[]) {

    if (this.itemsStatus === Status.All) {
      return items;
>>>>>>> master
    }

    return items.filter(x => x.status === this.itemsStatus);
  }

<<<<<<< HEAD
  filterStopwatchesByStatus(status: string) {
    this.itemsStatus = status;

    this.stopwatches = this.paginatedListOfStopwatchItemDto.items.filter(x => x.status === this.itemsStatus);
=======
  filterStopwatchesByStatus(status: Status) {
    this.itemsStatus = status;

    if (!this.paginatedListOfStopwatchItemDto.items)
      return
>>>>>>> master

    this.stopwatches = this.getStopwatchesFilteredByStatus(this.paginatedListOfStopwatchItemDto.items);
  }

  onOpenConfirmDeleteDialog(stopwatch: StopwatchItemDto) {
    const dialogRef = this._dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this._timersService.calcAndUpdateProjectTime(defaultTime, stopwatch.time);
        this._timersService.clearAllIntervals();
        await this._localChangesHubService.saveStopwatchesChangesInDb();
        this.deleteStopwatch(stopwatch);
      }
    });
  }

<<<<<<< HEAD
  toggleDoneStopwatch(stopwatch: StopwatchItemDto) {
    stopwatch.status = (stopwatch.status === "doing") ? "done" : "doing";

    this._stopwatchItemsClient.update(UpdateStopwatchItemCommand.fromJS(stopwatch)).subscribe(() => {

      this._timersService.delete(stopwatch.id);
      this.stopwatches = this.stopwatches.filter(x => x.id !== stopwatch.id);
    });
=======
  async toggleDoneStopwatch(stopwatch: StopwatchItemDto) {
    stopwatch.status = (stopwatch.status === Status.Doing) ? Status.Done : Status.Doing;

    await this._localChangesHubService.storeLocalStopwatchChanges(stopwatch);

    if (this.itemsStatus !== Status.All)
      this.stopwatches = this.stopwatches.filter(x => x.id !== stopwatch.id);
>>>>>>> master
  }

  filterTitlesArray() {
    if (this.paginatedListOfStopwatchItemDto.items) {
      this.titlesArray = this.paginatedListOfStopwatchItemDto.items.map((e) => { return e.title });
    }
  }

<<<<<<< HEAD
  filterStopwatches(searchingTitle: string) {
    this.itemsStatus = null;
=======
  filterStopwatchesByTitle(title: string) {
    this.itemsStatus = Status.All;
>>>>>>> master

    const filteredStopwatches: StopwatchItemDto[] = this.paginatedListOfStopwatchItemDto.items.filter(x => x.title.includes(title));
    this.stopwatches = filteredStopwatches;
<<<<<<< HEAD

    this._timersService.calcAndUpdateProjectTime(this.stopwatches.filter(x => x.status === this.itemsStatus));
=======
>>>>>>> master
  }

  loadStopwatches(pageNumber: number = 1, pageSize: number = 50) {
    this._stopwatchItemsClient.getWithPagination(this.projectId, pageNumber, pageSize).subscribe(result => {
      this.paginatedListOfStopwatchItemDto = result;

<<<<<<< HEAD
      this.stopwatches = result.items.filter(x => x.status === this.itemsStatus);
=======
      this.stopwatches = this.getStopwatchesFilteredByStatus(result.items);
>>>>>>> master

      this.filterTitlesArray();

      if (this.paginator)
        this.paginator.pageIndex = 0;
    });
  }

  loadProject() {
    this._projectItemsClient.get(this.projectId).subscribe(result => {
      if (!result)
        return;

      this.project = result;
      this._timersService.project = result;
      this._timersService.initialProjectTime();
    });
  }

  onOpenEditStopwatchDialog(stopwatchItem: StopwatchItemDto) {
    this.pauseTimer(stopwatchItem);
    const previousTime: string = stopwatchItem.time;

    const dialogRef = this._dialog.open(EditStopwatchDialogComponent, {
      data: stopwatchItem
    });

    dialogRef.afterClosed().subscribe(async (stopwatch: StopwatchItemDto) => {
      if (stopwatch) {
        await this._localChangesHubService.storeLocalStopwatchChanges(stopwatch);
        this._timersService.calcAndUpdateProjectTime(stopwatch.time, previousTime);
      }
    });
  }

  onOpenShowSplittedTimesDialog(stopwatch: StopwatchItemDto) {
    const dialogRef = this._dialog.open(SplittedTimesListDialogComponent, {
      data: stopwatch.splittedTimes,
      panelClass: 'splitted-times-dialog'
    });

    const onDeleteSub = dialogRef.componentInstance.onDelete.subscribe(splittedTimes => {
      stopwatch.splittedTimes = splittedTimes;
      this._localChangesHubService.storeLocalStopwatchChanges(stopwatch);
    });

    dialogRef.afterClosed().subscribe(() => {
      onDeleteSub.unsubscribe();
    });
  }

  deleteStopwatch(stopwatch: StopwatchItemDto) {
    this._stopwatchItemsClient.delete(stopwatch.id).subscribe(() => {
      this.loadStopwatches();
      this._timersService.delete(stopwatch.id);
    });
  }

  pauseTimer(stopwatch: StopwatchItemDto) {
    this._timersService.pause(stopwatch);
  }

  restartTimer(stopwatch: StopwatchItemDto) {
    this._timersService.calcAndUpdateProjectTime(defaultTime, stopwatch.time);
    this._timersService.restart(stopwatch);
  }

  startTimer(stopwatch: StopwatchItemDto) {
    this._timersService.start(stopwatch);
  }

  async splitTimer(stopwatch: StopwatchItemDto) {
    stopwatch.splittedTimes.push(new SplittedTime({
      time: stopwatch.time
    }));

    await this._localChangesHubService.storeLocalStopwatchChanges(stopwatch);
  }

  onOpenChartDialog() {
    this._dialog.open(ChartDialogComponent, {
      data: this.paginatedListOfStopwatchItemDto.items,
      panelClass: 'chart-dialog'
    });
  }

  async updatePagination(event: PageEvent) {
    this._timersService.clearAllIntervals();

    await this._localChangesHubService.saveStopwatchesChangesInDb();

    this.loadStopwatches(event.pageIndex + 1, event.pageSize);
  }
}
