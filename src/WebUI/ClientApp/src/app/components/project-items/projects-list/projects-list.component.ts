import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProjectsDataService } from '../../../services/projects-data-service';
import { CreateProjectItemCommand, FavoriteProjectItemsClient, ProjectItemDto, ProjectItemsClient, UpdateProjectItemCommand, PaginatedListOfProjectItemDto, ProjectItemDto2 } from '../../../web-api-client';
import { ConfirmDeleteDialogComponent } from '../../utilities/confirm-delete-dialog/confirm-delete-dialog.component';
import { ChartDialogComponent } from '../../utilities/chart-dialog/chart-dialog.component';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, AfterViewInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;

  paginatedListOfProjectItemDto: PaginatedListOfProjectItemDto;
  projects: ProjectItemDto[];
  titlesArray: string[];

  constructor(public dialog: MatDialog,
    private projectItemsClient: ProjectItemsClient,
    private favoriteProjectItemsClient: FavoriteProjectItemsClient,
    private projectsDataService: ProjectsDataService) { }


  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    this.projectsDataService.paginatedListOfProjectItemDto.subscribe(result => {
      this.paginatedListOfProjectItemDto = result;
      this.projects = result.items;
      this.filterTitlesArray();
    });
  }

  openCreateProjectDialog() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.searchProjectComponent) {
          this.searchProjectComponent.cleanInput();
        }

        this.addProject(result);
      }
    });
  }

  openConfirmDeleteDialog(projectId: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }

  addProject(projectItem: ProjectItemDto) {
    this.projectItemsClient.create(CreateProjectItemCommand.fromJS(projectItem)).subscribe(() => {
      this.projectsDataService.loadProjects();
    });
  }

  openEditProjectDialog(projectItem: ProjectItemDto2) {

    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: projectItem
    });

    dialogRef.afterClosed().subscribe((result: ProjectItemDto2) => {
      if (result) {
        projectItem.title = result.title;
        projectItem.theme = result.theme;
        this.updateProject(projectItem);
      }
    });
  }

  openChartDialog() {
    this.dialog.open(ChartDialogComponent, {
      data: this.paginatedListOfProjectItemDto.items,
      panelClass: 'chart-dialog'
    })
  }

  updateProject(projectItem: ProjectItemDto) {
    this.projectItemsClient.update(UpdateProjectItemCommand.fromJS(projectItem)).subscribe(() => {
      this.projectsDataService.loadData();
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
}

