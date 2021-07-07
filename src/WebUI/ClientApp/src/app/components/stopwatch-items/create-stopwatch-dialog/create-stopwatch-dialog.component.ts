import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { defaultTime } from '../../../services/timer/Timer';
import { CreateStopwatchItemCommand, StopwatchItemDto, StopwatchItemsClient } from '../../../web-api-client';

@Component({
  selector: 'app-create-stopwatch-dialog',
  templateUrl: './create-stopwatch-dialog.component.html',
  styleUrls: ['./create-stopwatch-dialog.component.scss']
})
export class CreateStopwatchDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private _dialogRef: MatDialogRef<CreateStopwatchDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public projectId: number,
    private _stopwatchItemsClient: StopwatchItemsClient,
   ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(20)]
      }],
      theme: ['', {
        validators: Validators.required
      }],
    });
  }

  onSubmit(stopwatchItem: StopwatchItemDto) {
    stopwatchItem.projectItemId = this.projectId;
    stopwatchItem.time = defaultTime;
    stopwatchItem.isDone = false;

    this._stopwatchItemsClient.create(CreateStopwatchItemCommand.fromJS(stopwatchItem)).subscribe(async () => {
      this.closeDialog("success");
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

  changeSelectedTheme(theme: string) {
    this.form.get('theme').setValue(theme);
  }

  closeDialog(success?): void {
    this._dialogRef.close(success);
  }
}
