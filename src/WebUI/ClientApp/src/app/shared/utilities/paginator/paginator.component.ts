import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() totalCount: number;
  @Input() pageSize: number;

  @Output() onUpdatePagination = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  updatePagination(event: PageEvent) {
    this.onUpdatePagination.emit(event);
  }
}
