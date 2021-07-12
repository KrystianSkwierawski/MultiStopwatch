import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-item-status-selector',
  templateUrl: './item-status-selector.component.html',
  styleUrls: ['./item-status-selector.component.scss']
})
export class ItemStatusSelectorComponent implements OnInit, OnChanges {

  @Output() onIsDoneStatusChanged = new EventEmitter<boolean>();
  @Input() isDoneStatus;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    //this.isDoneStatus = changes.currentValue?.toString();
  }

  onChange() {
    this.onIsDoneStatusChanged.emit(
      JSON.parse(this.isDoneStatus)
    );
  }
}
