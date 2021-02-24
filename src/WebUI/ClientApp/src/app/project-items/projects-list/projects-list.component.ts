import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { ProjectItemDTO } from '../project-item.module';
import { SearchProjectComponent } from '../search-project/search-project.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @ViewChild(SearchProjectComponent) searchProjectComponent: SearchProjectComponent;

  projects: Array<ProjectItemDTO> = [];
  oryginalProjects: Array<ProjectItemDTO> = [];

  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    //get project
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProject(result);
      }
    });
  }

  addProject(projectItem: ProjectItemDTO) {
    if (this.searchProjectComponent) {
      this.searchProjectComponent.cleanInput();
    }

    //dodaj i zwroc projekt

    //dodaj projekt zwrocony z bazy entity id

    //projectItem.id == result

    this.oryginalProjects.push(projectItem);
    this.projects = this.oryginalProjects;
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  getTitleArray(): string[] {
    return this.oryginalProjects.map((e) => { return e.title });
  }

  filterProjects(searchingTitle: string) {
    const filteredProjects: Array<ProjectItemDTO> = this.oryginalProjects.filter(x => x.title.includes(searchingTitle));
    this.projects = filteredProjects;
  }
}

