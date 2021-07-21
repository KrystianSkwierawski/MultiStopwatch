import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { ProjectsDataService } from '../../../shared/services/projects-data/projects-data-service';
import { ChartDialogComponent } from '../../../shared/utilities/chart-dialog/chart-dialog.component';
import { ConfirmDeleteDialogComponent } from '../../../shared/utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { SearchItemByTitleComponent } from '../../../shared/utilities/search-item-by-title/search-item-by-title.component';
import { Status, FavoriteProjectItemsClient, PaginatedListOfProjectItemDto, ProjectItemDto, ProjectItemDto2, ProjectItemsClient, UpdateProjectItemCommand } from '../../../web-api-client';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';



@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;
  @ViewChild('paginator') paginator: MatPaginator;
        
  paginatedListOfProjectItemDto: PaginatedListOfProjectItemDto;
  paginatedListOfProjectItemDtoSub: Subscription;

  projects: ProjectItemDto2[];
  titlesArray: string[];

  status = {
    doing: Status.Doing,
    done: Status.Done,
  }

  itemsStatus: Status;

  constructor(private _dialog: MatDialog,
    private _projectItemsClient: ProjectItemsClient,
    private _favoriteProjectItemsClient: FavoriteProjectItemsClient,
    private _projectsDataService: ProjectsDataService,
    private _authService: AuthenticationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initItemsStatus();

    this._router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        let status: Status = +event.snapshot.queryParams["items"];

        if (isNaN(status))
          status = Status.Doing;

        if (status === this.itemsStatus)
          return;

        this.itemsStatus = status;

        this.filterProjectsByStatus();
      }
    });

    this.paginatedListOfProjectItemDtoSub = this._projectsDataService.paginatedListOfProjectItemDto.subscribe(result => {
      if (!result.items)
        return;

      this.paginatedListOfProjectItemDto = result;
      this.projects = this.getProjectsFilteredByStatus(result.items);
      this.filterTitlesArray();
      this.paginator.pageIndex = 0;
    });

    this.loadProjectsAfterAuthenticate();
  }

  initItemsStatus() {
    let status: Status = +this._activatedRoute.snapshot.queryParams['items'];

    if (isNaN(status))
      status = Status.Doing;

    this.itemsStatus = status;
  }

  loadProjectsAfterAuthenticate() {
    this._authService.isAuthenticated.pipe(take(1)).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this._projectsDataService.loadProjects();
      }
    });
  }

  onOpenCreateProjectDialog() {
    const dialogRef = this._dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.tryCleanSearchProjectCompontentInput();

        this._projectsDataService.loadProjects();
      }
    });
  }

  tryCleanSearchProjectCompontentInput() {
    if (this.searchProjectComponent) {
      this.searchProjectComponent.cleanInput();
      this.itemsStatus = Status.Doing;
    }
  }

  onOpenConfirmDeleteDialog(projectId: number) {
    const dialogRef = this._dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }

  onOpenEditProjectDialog(projectItem: ProjectItemDto2) {
    const dialogRef = this._dialog.open(EditProjectDialogComponent, {
      data: projectItem
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this._projectsDataService.loadData();
      }
    });
  }

  toggleDoneProject(project: ProjectItemDto2) {
    project.status = (project.status === Status.Doing) ? Status.Done : Status.Doing;

    this._projectItemsClient.update(UpdateProjectItemCommand.fromJS(project)).subscribe(() => {

      if (this.itemsStatus !== Status.All)
        this.projects = this.projects.filter(x => x.id !== project.id);
    });
  }

  onOpenChartDialog() {
    this._dialog.open(ChartDialogComponent, {
      data: this.paginatedListOfProjectItemDto.items,
      panelClass: 'chart-dialog'
    });
  }

  deleteProject(id) {
    this._projectItemsClient.delete(id).subscribe(() => {
      this._projectsDataService.loadData();
    });
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  filterTitlesArray() {
    if (this.paginatedListOfProjectItemDto.items) {
      this.titlesArray = this.paginatedListOfProjectItemDto.items.map((e) => { return e.title });
    }
  }

  filterProjectsByTitle(title: string) {
    this.itemsStatus = Status.All;

    const filteredProjects: ProjectItemDto2[] = this.paginatedListOfProjectItemDto.items.filter(x => x.title.includes(title));
    this.projects = filteredProjects;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    this._favoriteProjectItemsClient.likeOrDislike(projectId).subscribe(() => {
      this._projectsDataService.loadData();
    });
  }

  filterProjectsByStatus() {
    if (!this.paginatedListOfProjectItemDto.items)
      return

    this.projects = this.getProjectsFilteredByStatus(this.paginatedListOfProjectItemDto.items);
  }

  getProjectsFilteredByStatus(items: ProjectItemDto2[]) {

    if (this.itemsStatus === Status.All) {
      return items;
    }

    return items.filter(x => x.status === this.itemsStatus);
  }

  updatePagination(event: PageEvent) {
    this._projectsDataService.loadProjects(event.pageIndex + 1, event.pageSize);
  }

  ngOnDestroy(): void {
    this.paginatedListOfProjectItemDtoSub.unsubscribe();
  }
}

