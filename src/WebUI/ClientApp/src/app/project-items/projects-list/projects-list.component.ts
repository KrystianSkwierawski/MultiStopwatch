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

  projects: Array<ProjectItemDTO> = [
    { id: 1, title: "messenger", time: "15:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 1, title: "messenger", time: "15:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 1, title: "messenger", time: "15:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 1, title: "messenger", time: "15:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
    { id: 2, title: "quess", time: "20:00", isFavorite: true },
  ];

  ngOnInit(): void {
    //get project
  }


  openDialog(): void {
    this.dialog.open(CreateProjectDialogComponent);
  }
}

