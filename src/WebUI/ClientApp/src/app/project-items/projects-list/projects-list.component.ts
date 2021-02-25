import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { ProjectItemClient, ProjectItemDto, CreateProjectItemCommand } from '../../web-api-client';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;

  @Output() onLoadProjects = new EventEmitter<void>();
 
  @Input() oryginalProjects: ProjectItemDto[];

  @Input() projects: ProjectItemDto[];

  constructor(public dialog: MatDialog, private projectItemClient: ProjectItemClient) { }

  ngOnInit(): void {
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

    this.projectItemClient.create(<CreateProjectItemCommand>{ title: projectItem.title }).subscribe(() => {
      this.onLoadProjects.emit();
    });
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  getTitleArray(): string[] {
    return this.oryginalProjects.map((e) => { return e.title });
  }

  filterProjects(searchingTitle: string) {
    const filteredProjects: ProjectItemDto[] = this.oryginalProjects.filter(x => x.title.includes(searchingTitle));
    this.projects = filteredProjects;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    //await like or dis like

    //load projects
  }
}

