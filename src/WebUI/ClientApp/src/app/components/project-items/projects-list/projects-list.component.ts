import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../../../authentication/authentication.service';

import { ProjectsDataService } from '../../../services/projects-data/projects-data-service';
import { FavoriteProjectItemsClient, PaginatedListOfProjectItemDto, ProjectItemDto, ProjectItemDto2, ProjectItemsClient } from '../../../web-api-client';
import { ChartDialogComponent } from '../../utilities/chart-dialog/chart-dialog.component';
import { ConfirmDeleteDialogComponent } from '../../utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;

  paginatedListOfProjectItemDto: PaginatedListOfProjectItemDto;
  paginatedListOfProjectItemDtoSub: Subscription;

  projects: ProjectItemDto[];
  titlesArray: string[];

  constructor(public dialog: MatDialog,
    private projectItemsClient: ProjectItemsClient,
    private favoriteProjectItemsClient: FavoriteProjectItemsClient,
    private projectsDataService: ProjectsDataService,
    private authorize: AuthenticationService
    ) { }
  
  ngOnInit() {
    this.paginatedListOfProjectItemDtoSub = this.projectsDataService.paginatedListOfProjectItemDto.subscribe(result => {
      this.paginatedListOfProjectItemDto = result;
      this.projects = result.items;
      this.filterTitlesArray();
    });

    this.loadProjectsAfterAuthenticate();
  }

  loadProjectsAfterAuthenticate() {
    this.authorize.token.pipe(take(1)).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.projectsDataService.loadProjects();
      }
    });
  }

  onOpenCreateProjectDialog() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        if (this.searchProjectComponent) {
          this.searchProjectComponent.cleanInput();
        }

        this.projectsDataService.loadProjects();
      }
    });
  }

  onOpenConfirmDeleteDialog(projectId: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }

  onOpenEditProjectDialog(projectItem: ProjectItemDto2) {
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: projectItem
    });

    dialogRef.afterClosed().subscribe(success => {
      if (success) {
        this.projectsDataService.loadData();
      }
    });
  }

  onOpenChartDialog() {
    this.dialog.open(ChartDialogComponent, {
      data: this.paginatedListOfProjectItemDto.items,
      panelClass: 'chart-dialog'
    });
  }

  deleteProject(id) {
    this.projectItemsClient.delete(id).subscribe(() => {
      this.projectsDataService.loadData();
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

  filterProjects(searchingTitle: string) {
    const filteredProjects: ProjectItemDto[] = this.paginatedListOfProjectItemDto.items.filter(x => x.title.includes(searchingTitle));
    this.projects = filteredProjects;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    this.favoriteProjectItemsClient.likeOrDislike(projectId).subscribe(() => {
      this.projectsDataService.loadData();
    });
  }

  updatePagination(event: PageEvent) {
    this.projectsDataService.loadProjects(event.pageIndex + 1, event.pageSize);
  }

  ngOnDestroy(): void {
    this.paginatedListOfProjectItemDtoSub.unsubscribe();
  }
}

