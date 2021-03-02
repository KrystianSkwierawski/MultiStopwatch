import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StopwatchItemDto } from '../../../web-api-client';

@Component({
  selector: 'app-create-stopwatch-dialog',
  templateUrl: './create-stopwatch-dialog.component.html',
  styleUrls: ['./create-stopwatch-dialog.component.scss']
})
export class CreateStopwatchDialogComponent implements OnInit {

  form: FormGroup

  constructor(public dialogRef: MatDialogRef<CreateStopwatchDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: StopwatchItemDto) { };

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(20)]
      }]
    });
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

  hideDialog(): void {
    this.dialogRef.close();
  }
}
