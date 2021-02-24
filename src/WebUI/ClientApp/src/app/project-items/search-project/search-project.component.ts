import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.scss']
})
export class SearchProjectComponent implements OnInit {
  myControl = new FormControl();
 
  filteredOptions: Observable<string[]>;

  @Input() options: string[];

  @Output() onKeyUp = new EventEmitter<string>();

  @ViewChild('searcingTitle') searchingTitleInput: ElementRef;

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

  currentSearchingTitle: string;

  keyUp() {
    const searchingTitle = this.searchingTitleInput.nativeElement.value
    this.onKeyUp.emit(searchingTitle);
  }

  cleanInput() {
    this.searchingTitleInput.nativeElement.value = '';
  }
}
