import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-status-selector',
  templateUrl: './item-status-selector.component.html',
  styleUrls: ['./item-status-selector.component.scss']
})
export class ItemStatusSelectorComponent implements OnInit, OnChanges {

  @Input() status;

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //const status = changes.statusStatus.currentValue;
    //this.statusStatus = (status === null) ? "null" : status.toString();
  }

  onChange() {
    this._router.navigate([], {
      relativeTo: this._route, queryParams: {
        itemsStatus: this.status
      }
    });
  }
}
