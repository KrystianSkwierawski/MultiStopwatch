import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timeFormated } from '../../../validators/timeFormated';
import { StopwatchItemDto } from '../../../web-api-client';

@Component({
  selector: 'app-edit-stopwatch-dialog',
  templateUrl: './edit-stopwatch-dialog.component.html',
  styleUrls: ['./edit-stopwatch-dialog.component.scss']
})
export class EditStopwatchDialogComponent implements OnInit {

  form: FormGroup

  constructor(public dialogRef: MatDialogRef<EditStopwatchDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: StopwatchItemDto) { };

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(20)]
      }],
      time: ['', {
        validators: [Validators.required, timeFormated()]
      }],
      theme: ['', {
        validators: Validators.required
      }],
    });

    if (this.data !== undefined) {
      this.form.patchValue(this.data);
    }
  }

  getErrorMessageFieldTitle() {
    const field = this.form.get('title');

    if (field.hasError('required')) {
      return 'The title field is required';
    }

    if (field.hasError('maxlength')) {
      return 'The maximum title length is 20';
    }

    return '';
  }

  getErrorMessageFieldTime() {
    const field = this.form.get('time');

    if (field.hasError('required')) {
      return 'The time field is required';
    }

    if (field.hasError('timeFormated')) {
      return field.getError('timeFormated').message;
    }
 
    return '';
  }


  changeSelectedTheme(theme: string) {
    this.form.get('theme').setValue(theme);
  }

  hideDialog(): void {
    this.dialogRef.close();
  }
}
