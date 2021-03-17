import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { TimersService } from '../../../services/timers.service';
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
    private timersService: TimersService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params.id;
    });

    this.loadProject();
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

  openDialogToConfirmDeleteStopwatch(projectId: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStopwatch(projectId);
      }
    });
  }

  filterTitlesArray() {
    if (this.paginatedListOfStopwatchItemDto.items) {
      this.titlesArray = this.stopwatches.map((e) => { return e.title });
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
    //stopwatch.isStarted = false;
    this.timersService.pause(stopwatch);
  }

  restartTimer(stopwatch: StopwatchItemDto) {
    console.log(stopwatch);
  }

  startTimer(stopwatch: StopwatchItemDto) {
    //stopwatch.isStarted = true;
    this.timersService.start(stopwatch);
  }

  updatePagination(event: PageEvent) {
    this.loadStopwatches(event.pageIndex + 1, event.pageSize);
  }
}
