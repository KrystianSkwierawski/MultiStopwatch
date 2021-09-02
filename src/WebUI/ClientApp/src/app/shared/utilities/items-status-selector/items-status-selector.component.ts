import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Status } from '../../../web-api-client';

@Component({
  selector: 'app-items-status-selector',
  templateUrl: './items-status-selector.component.html',
  styleUrls: ['./items-status-selector.component.scss'],
})
export class ItemsStatusSelectorComponent implements OnInit, OnChanges {

  @Input() status: Status | string;
  @Output() statusChanged = new EventEmitter<Status>();

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.status.previousValue !== changes.status.currentValue) {
      this.status = changes.status.currentValue.toString();
    }
  }

  onChange(status: string) {
    this.statusChanged.emit(+status);
  }
}
