import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsDataService } from '../../../services/projects-data-service';
import { CreateProjectItemCommand, FavoriteProjectItemsClient, LikeOrDislikeProjectItemCommand, ProjectItemDto, ProjectItemsClient, UpdateProjectItemCommand } from '../../../web-api-client';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;
  oryginalProjects: ProjectItemDto[];
  projects: ProjectItemDto[];
  titlesArray: string[];

  constructor(public dialog: MatDialog,
    private projectItemsClient: ProjectItemsClient,
    private favoriteProjectItemsClient: FavoriteProjectItemsClient,
    private projectsDataService: ProjectsDataService) { }

  ngOnInit() {
    this.projectsDataService.projects.subscribe(result => {
      this.projects = result;
      this.oryginalProjects = result;
      this.filterTitlesArray();
    });
  }

  openDialogToCreateNewProject() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProject(result);
      }
    });
  }

  addProject(projectItem: ProjectItemDto) {
    if (this.searchProjectComponent) {
      this.searchProjectComponent.cleanInput();
    }

    this.projectItemsClient.create(<CreateProjectItemCommand>{ title: projectItem.title }).subscribe(() => {
      this.projectsDataService.loadProjects();
    });
  }

  openDialogToEditProject(projectItem: ProjectItemDto) {

    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: projectItem
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProject(projectItem.id, result);
      }
    });
  }

  updateProject(projectId, projectItem: ProjectItemDto) {
    this.projectItemsClient.update(<UpdateProjectItemCommand>{ id: projectId, title: projectItem.title }).subscribe(() => {
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
    this.titlesArray = this.oryginalProjects.map((e) => { return e.title });
  }

  filterProjects(searchingTitle: string) {
    const filteredProjects: ProjectItemDto[] = this.oryginalProjects.filter(x => x.title.includes(searchingTitle));
    this.projects = filteredProjects;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    this.favoriteProjectItemsClient.likeOrDislike(<LikeOrDislikeProjectItemCommand>{ id: projectId }).subscribe(() => {
      this.projectsDataService.loadData();
    });
  }
}

