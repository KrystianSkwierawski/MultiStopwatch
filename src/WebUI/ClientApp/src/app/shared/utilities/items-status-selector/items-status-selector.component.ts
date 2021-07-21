import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Status } from '../../../web-api-client';
import { ItemsStatusService } from '../../services/items-status-selector/items-status-selector.service';

@Component({
  selector: 'app-items-status-selector',
  templateUrl: './items-status-selector.component.html',
  styleUrls: ['./items-status-selector.component.scss']
})
export class ItemsStatusSelectorComponent implements OnInit, OnChanges {

  @Input() status: Status | string;

  constructor(private _servicesService: ItemsStatusService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.status.previousValue !== changes.status.currentValue) {
      const currentValue = changes.status.currentValue;
      this.status = currentValue.toString();
      this._servicesService.setQueryParams(+currentValue);
    }
  }

  onChange(status) {
    this._servicesService.setQueryParams(+status);
  }
}
