import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { LocalChangesHubService } from '../../../services/local-changes-hub.service';
import { TimersService } from '../../../services/timer/timers.service';
import { CreateStopwatchItemCommand, PaginatedListOfStopwatchItemDto, StopwatchItemDto, StopwatchItemsClient, UpdateStopwatchItemCommand, ProjectItemsClient, ProjectItemDto } from '../../../web-api-client';
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
    private localChangesHubService: LocalChangesHubService) {

    localChangesHubService.ngOnInit();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params.id;
    });

    this.loadProject();
    this.loadStopwatches();
  }

  async addStopwatch(stopwatchItem: StopwatchItemDto) {
    stopwatchItem.projectItemId = this.projectId;
    stopwatchItem.time = "00:00:00";

    this.stopwatchItemsClient.create(CreateStopwatchItemCommand.fromJS(stopwatchItem)).subscribe(async () => {
      this.loadStopwatches();
    });
  }

  openDialogToCreateNewStopwatch(): void {
    const dialogRef = this.dialog.open(CreateStopwatchDialogComponent);

    dialogRef.afterClosed().subscribe(async (result: StopwatchItemDto) => {
      if (result) {
        if (this.searchProjectComponent) {
          this.searchProjectComponent.cleanInput();
        }

        this.timersService.clearAllIntervals();

        await this.localChangesHubService.saveStopwatchesChangesInDb();

        this.addStopwatch(result)
      }
    });
  }

  openDialogToConfirmDeleteStopwatch(stopwatch: StopwatchItemDto, index: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pauseTimer(stopwatch);
        this.timersService.updateProjectTimeAfterDeletingOrResetingAnyStopwatch(stopwatch);

        this.deleteStopwatch(stopwatch, index);
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
  }

  loadStopwatches(pageNumber: number = 1, pageSize: number = 50) {
    this.stopwatchItemsClient.getWithPagination(this.projectId, pageNumber, pageSize).subscribe(result => {
      this.paginatedListOfStopwatchItemDto = result;
      this.stopwatches = result.items;
      this.filterTitlesArray();
    });
  }

  loadProject() {
    this.projectItemsClient.get(this.projectId).subscribe(result => {
      this.project = result;
      this.timersService.project = result;
      this.timersService.initialProjectTime();
    });
  }

  openDialogToEditStopwatch(stopwatchItem: StopwatchItemDto) {
    const dialogRef = this.dialog.open(EditStopwatchDialogComponent, {
      data: stopwatchItem
    });

    dialogRef.afterClosed().subscribe((result: StopwatchItemDto) => {
      if (result) {
        stopwatchItem.title = result.title
        this.localChangesHubService.storeLocalStopwatchChanges(stopwatchItem);
        this.paginatedListOfStopwatchItemDto.items = this.stopwatches;
        this.filterTitlesArray();
      }
    });
  }

  deleteStopwatch(stopwatch: StopwatchItemDto, index: number) {
    this.stopwatchItemsClient.delete(stopwatch.id).subscribe(() => {     
      this.stopwatches.splice(index, 1);
      this.paginatedListOfStopwatchItemDto.items = this.stopwatches;
      this.filterTitlesArray();
    });
  }

  pauseTimer(stopwatch: StopwatchItemDto) {
    this.timersService.pause(stopwatch);
  }

  restartTimer(stopwatch: StopwatchItemDto) {
    this.timersService.restart(stopwatch);
  }

  startTimer(stopwatch: StopwatchItemDto) {
    this.timersService.start(stopwatch);
  }

  async updatePagination(event: PageEvent) {
    this.timersService.clearAllIntervals();

    await this.localChangesHubService.saveStopwatchesChangesInDb();

    this.loadStopwatches(event.pageIndex + 1, event.pageSize);
  }
}
