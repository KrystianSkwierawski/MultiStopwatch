import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-status-selector',
  templateUrl: './item-status-selector.component.html',
  styleUrls: ['./item-status-selector.component.scss']
})
export class ItemStatusSelectorComponent implements OnInit {

  @Output() onItemsStatusChanged = new EventEmitter<string>();
  itemsStatus = "doing";

  constructor() { }
   
  ngOnInit(): void {
  }

  onChange() {
    this.onItemsStatusChanged.emit(this.itemsStatus);
  }
}
