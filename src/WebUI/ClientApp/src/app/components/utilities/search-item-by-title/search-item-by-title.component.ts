import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-item-by-title',
  templateUrl: './search-item-by-title.component.html',
  styleUrls: ['./search-item-by-title.component.scss']
})
export class SearchItemByTitleComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  @Input() options: string[];
  @Output() onKeyUp = new EventEmitter<string>();
  @ViewChild('searchingTitle') searchingTitleInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  keyUp() {
    const searchingTitle = this.searchingTitleInput.nativeElement.value
    this.onKeyUp.emit(searchingTitle);
  }

  cleanInput() {
    this.searchingTitleInput.nativeElement.value = '';
  }
}
