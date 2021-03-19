import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  selected;

  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.setDefault("#6264A7");
  }

  setDefault(defaultTheme: string) {
    this.saveChanges(defaultTheme);
    this.selected = new FormControl(defaultTheme);
  }


  saveChanges(value) {
    this.onSaveChanges.emit(value);
  }
}
