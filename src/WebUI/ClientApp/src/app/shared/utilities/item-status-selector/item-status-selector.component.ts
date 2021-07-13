import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    if (changes.status.previousValue !== changes.status.currentValue)
      this.setQueryParams();
  }

  onChange() {
    this.setQueryParams();
  }

  setQueryParams() {
    this._router.navigate([], {
      relativeTo: this._route, queryParams: {
        items: this.status
      }
    });
  }
}
