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
  @Input() options: string[];
  @Output() onKeyUp = new EventEmitter<string>();
  @ViewChild('searchingTitle') searchingTitleInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
 
  }

  keyUp() {
    const searchingTitle = this.searchingTitleInput.nativeElement.value
    this.onKeyUp.emit(searchingTitle);
  }

  cleanInput() {
    this.searchingTitleInput.nativeElement.value = '';
  }
}
