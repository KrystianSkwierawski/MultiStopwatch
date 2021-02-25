import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { ProjectItemDto } from '../../web-api-client';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;

  projects: Array<ProjectItemDto> = [];
  @Input() oryginalProjects: Array<ProjectItemDto> = [];

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    this.oryginalProjects = this.projects;
  }

  openDialog(): void {
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

    //await add

    //load projects
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  getTitleArray(): string[] {
    return this.oryginalProjects.map((e) => { return e.title });
  }

  filterProjects(searchingTitle: string) {
    const filteredProjects: Array<ProjectItemDto> = this.oryginalProjects.filter(x => x.title.includes(searchingTitle));
    this.projects = filteredProjects;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    //await like or dis like

    //load projects
  }
}

