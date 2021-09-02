import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  @Input() theme: string;
  selected;

  @Output() saveChanges: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.setTheme();
  }

  setTheme() {
    if (!this.theme) {
      const defaultTheme = '#6264A7';

      this.theme = defaultTheme;
      this.onSaveChanges(this.theme);
    }

    this.selected = new FormControl(this.theme);
  }


  onSaveChanges(value) {
    this.saveChanges.emit(value);
  }
}
