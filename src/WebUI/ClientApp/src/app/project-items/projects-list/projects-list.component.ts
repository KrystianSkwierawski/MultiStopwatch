import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { ProjectItemDTO } from '../project-item.module';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;

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

    projectItem.time = "00:00";

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

