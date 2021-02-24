import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  projects: Array<ProjectItemDTO> = [];

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
    //dodaj i zwroc projekt

    //dodaj projekt zwrocony z bazy zeby miec id
    this.projects.push(projectItem);
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }
}

