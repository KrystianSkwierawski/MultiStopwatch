import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { LocalChangesHubService } from '../../../services/local-changes-hub/local-changes-hub.service';
import { TimersService } from '../../../services/timer/timers.service';
import { CreateSplittedTimeCommand, PaginatedListOfStopwatchItemDto, ProjectItemDto, ProjectItemsClient, SplittedTimeDto, SplittedtimesClient, StopwatchItemDto, StopwatchItemsClient } from '../../../web-api-client';
import { SplittedTimesListDialogComponent } from '../../splitted-times/splitted-times-list-dialog/splitted-times-list-dialog.component';
import { ChartDialogComponent } from '../../utilities/chart-dialog/chart-dialog.component';
import { ConfirmDeleteDialogComponent } from '../../utilities/confirm-delete-dialog/confirm-delete-dialog.component';
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


  paginatedListOfStopwatchItemDto: PaginatedListOfStopwatchItemDto;
  stopwatches: StopwatchItemDto[];
  project: ProjectItemDto;
  projectId: number;
  titlesArray: string[];

  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private stopwatchItemsClient: StopwatchItemsClient,
    private projectItemsClient: ProjectItemsClient,
    private timersService: TimersService,
    private localChangesHubService: LocalChangesHubService,
    private splittedtimesClient: SplittedtimesClient) {
  }

  setProjectId() {
    this.projectId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.localChangesHubService.startConnection();

    this.setProjectId();

    this.loadProject();
    this.loadStopwatches();
  }

  onOpenCreateStopwatchDialog(): void {
    const dialogRef = this.dialog.open(CreateStopwatchDialogComponent, {
      data: this.projectId
    });

    dialogRef.afterClosed().subscribe(async (success: StopwatchItemDto) => {
      if (success) {
        if (this.searchProjectComponent) {
          this.searchProjectComponent.cleanInput();
        }

        this.timersService.clearAllIntervals();

        await this.localChangesHubService.saveStopwatchesChangesInDb();

        this.loadStopwatches();
      }
    });
  }

  onOpenConfirmDeleteDialog(stopwatch: StopwatchItemDto) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.timersService.clearAllIntervals();
        await this.localChangesHubService.saveStopwatchesChangesInDb();
        this.deleteStopwatch(stopwatch);
      }
    });
  }

  filterTitlesArray() {
    if (this.paginatedListOfStopwatchItemDto.items) {
      this.titlesArray = this.paginatedListOfStopwatchItemDto.items.map((e) => { return e.title });
    }
  }

  filterStopwatches(searchingTitle: string) {
    const filteredStopwatches: StopwatchItemDto[] = this.paginatedListOfStopwatchItemDto.items.filter(x => x.title.includes(searchingTitle));
    this.stopwatches = filteredStopwatches;
    this.timersService.calcAndUpdateProjectTime(this.paginatedListOfStopwatchItemDto.items);
  }

  loadStopwatches(pageNumber: number = 1, pageSize: number = 50) {
    this.stopwatchItemsClient.getWithPagination(this.projectId, pageNumber, pageSize).subscribe(result => {
      this.paginatedListOfStopwatchItemDto = result;
      this.stopwatches = result.items;
      this.filterTitlesArray();
      this.timersService.calcAndUpdateProjectTime(this.paginatedListOfStopwatchItemDto.items);
    });
  }

  loadProject() {
    this.projectItemsClient.get(this.projectId).subscribe(result => {
      this.project = result;
      this.timersService.project = result;
      this.timersService.initialProjectTime();
    });
  }

  onOpenEditStopwatchDialog(stopwatchItem: StopwatchItemDto) {
    this.pauseTimer(stopwatchItem);

    const dialogRef = this.dialog.open(EditStopwatchDialogComponent, {
      data: stopwatchItem
    });

    dialogRef.afterClosed().subscribe((success: StopwatchItemDto) => {
      if (success) {
        this.paginatedListOfStopwatchItemDto.items = this.stopwatches;
        this.filterTitlesArray();
        this.timersService.calcAndUpdateProjectTime(this.paginatedListOfStopwatchItemDto.items);
      }
    });
  }

  onOpenShowSplittedTimesDialog(stopwatch: StopwatchItemDto) {
    const dialogRef = this.dialog.open(SplittedTimesListDialogComponent, {
      data: stopwatch.splittedTimes,
      panelClass: 'splitted-times-dialog'
    });

    dialogRef.afterClosed().subscribe((result: SplittedTimeDto[]) => {
      if (result) {
        stopwatch.splittedTimes = result;
      }
    });
  }

  deleteStopwatch(stopwatch: StopwatchItemDto) {
    this.stopwatchItemsClient.delete(stopwatch.id).subscribe(() => {
      this.loadStopwatches();
    });
  }

  pauseTimer(stopwatch: StopwatchItemDto) {
    this.timersService.pause(stopwatch);
  }

  restartTimer(stopwatch: StopwatchItemDto) {
    this.timersService.restart(stopwatch);
    this.timersService.calcAndUpdateProjectTime(this.paginatedListOfStopwatchItemDto.items);
  }

  startTimer(stopwatch: StopwatchItemDto) {
    this.timersService.start(stopwatch);
  }

  splitTimer(stopwatch: StopwatchItemDto) {
    this.splittedtimesClient.create(<CreateSplittedTimeCommand>{
      stopwatchItemId: stopwatch.id,
      time: stopwatch.time
    }).subscribe(splittedTime => {
      stopwatch.splittedTimes.push(splittedTime);
    });
  }

  onOpenChartDialog() {
    this.dialog.open(ChartDialogComponent, {
      data: this.paginatedListOfStopwatchItemDto.items,
      panelClass: 'chart-dialog'
    });
  }

  async updatePagination(event: PageEvent) {
    this.timersService.clearAllIntervals();

    await this.localChangesHubService.saveStopwatchesChangesInDb();

    this.loadStopwatches(event.pageIndex + 1, event.pageSize);
  }
}
