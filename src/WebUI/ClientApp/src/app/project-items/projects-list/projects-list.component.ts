import { Component, OnInit } from '@angular/core';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  constructor() { }

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
  }

}
