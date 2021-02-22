import { Component, OnInit } from '@angular/core';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-project-items-list',
  templateUrl: './project-items-list.component.html',
  styleUrls: ['./project-items-list.component.scss']
})
export class ProjectItemsListComponent implements OnInit {

  constructor() { }

  projectItems: Array<ProjectItemDTO> = [
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
